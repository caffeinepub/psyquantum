import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Runtime "mo:core/Runtime";
import Array "mo:core/Array";
import Time "mo:core/Time";
import Order "mo:core/Order";
import Text "mo:core/Text";
import Principal "mo:core/Principal";
import Iter "mo:core/Iter";

import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

//@formatter:off

actor {
  // ─────────────── Security ────────────────────────
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // Stable admin principal - survives upgrades and is the source of truth
  stable var _adminPrincipal : ?Principal = null;

  // Restore admin role into accessControlState after upgrade
  system func postupgrade() {
    // Restore siteText
    for ((k, v) in siteTextData.vals()) {
      siteTexts.add(k, v);
    };
    // Restore admin role from stable principal
    switch (_adminPrincipal) {
      case (?admin) {
        accessControlState.userRoles.add(admin, #admin);
        accessControlState.adminAssigned := true;
      };
      case null {};
    };
  };

  public query func isAdminClaimed() : async Bool {
    _adminPrincipal != null;
  };

  public shared ({ caller }) func claimFirstAdmin() : async Bool {
    // If already claimed by the same caller, treat as success (idempotent)
    switch (_adminPrincipal) {
      case (?existing) {
        if (existing == caller) {
          accessControlState.userRoles.add(caller, #admin);
          accessControlState.adminAssigned := true;
          return true;
        };
        return false;
      };
      case null {};
    };
    if (caller.isAnonymous()) { return false };
    _adminPrincipal := ?caller;
    accessControlState.userRoles.add(caller, #admin);
    accessControlState.adminAssigned := true;
    true;
  };

  // Emergency admin reset using a hardcoded secret — lets you re-claim admin when the stored
  // principal no longer matches your current Internet Identity session.
  let RESET_SECRET : Text = "psyquantum-reset-2026";

  public shared ({ caller }) func forceResetAdmin(secret : Text) : async Bool {
    if (caller.isAnonymous()) { return false };
    if (secret != RESET_SECRET) { return false };
    _adminPrincipal := null;
    accessControlState.adminAssigned := false;
    true;
  };

  public type UserProfile = {
    name : Text;
  };

  let userProfiles = Map.empty<Principal, UserProfile>();

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    userProfiles.add(caller, profile);
  };

  // ─────────────── Logo ─────────────────────────────
  stable var logoUrl : Text = "/assets/uploads/WhatsApp-Image-2026-03-14-at-11.02.13-PM-4.jpeg";

  public query func getLogoUrl() : async Text {
    logoUrl;
  };

  public shared ({ caller }) func setLogoUrl(url : Text) : async () {
    if (not isAdminPrincipal(caller)) {
      Runtime.trap("Unauthorized only admins can change logo");
    };
    logoUrl := url;
  };

  func isAdminPrincipal(caller : Principal) : Bool {
    switch (_adminPrincipal) {
      case (?admin) { caller == admin };
      case null { false };
    };
  };

  // ─────────────── Creator Image ───────────────────
  stable var creatorImageUrl : Text = "";

  public query func getCreatorImageUrl() : async Text {
    creatorImageUrl;
  };

  public shared ({ caller }) func setCreatorImageUrl(url : Text) : async () {
    if (not isAdminPrincipal(caller)) {
      Runtime.trap("Unauthorized only admins can change creator image");
    };
    creatorImageUrl := url;
  };

  // ─────────────── Site Text ───────────────────────
  stable var siteTextData : [(Text, Text)] = [];
  let siteTexts = Map.empty<Text, Text>();

  system func preupgrade() {
    siteTextData := siteTexts.entries().toArray();
  };

  public query func getSiteText(key : Text) : async Text {
    switch (siteTexts.get(key)) {
      case (?v) { v };
      case null { "" };
    };
  };

  public query func getAllSiteTexts() : async [(Text, Text)] {
    siteTexts.entries().toArray();
  };

  public shared ({ caller }) func setSiteText(key : Text, value : Text) : async () {
    if (not isAdminPrincipal(caller)) {
      Runtime.trap("Unauthorized only admins can change site text");
    };
    siteTexts.add(key, value);
  };

  // ─────────────── Articles ────────────────────────
  public type ArticleType = {
    #concept;
    #explained;
  };

  public type Article = {
    id : Nat;
    title : Text;
    description : Text;
    content : [Text];
    articleType : ArticleType;
    author : Text;
    createdAt : Int;
    displayOrder : Nat;
  };

  module Article {
    public func compareByDisplayOrder(a1 : Article, a2 : Article) : Order.Order {
      Nat.compare(a1.displayOrder, a2.displayOrder);
    };
  };

  let articles = Map.empty<Nat, Article>();
  var nextId = 1;
  var initialized = false;

  func seedArticles() {
    if (initialized) {
      return;
    };
    initialized := true;
    type SeedData = (Text, Text, ArticleType);

    let seedData = [
      ("Concept 1", "Short desc 1", #concept : ArticleType),
      ("Concept 2", "Short desc 2", #concept : ArticleType),
      ("Concept 3", "Short desc 3", #concept : ArticleType),
      ("Concept 4", "Short desc 4", #concept : ArticleType),
      ("Concept 5", "Short desc 5", #concept : ArticleType),
      ("Explained 1", "Short desc 6", #explained : ArticleType),
      ("Explained 2", "Short desc 7", #explained : ArticleType),
      ("Explained 3", "Short desc 8", #explained : ArticleType),
      ("Explained 4", "Short desc 9", #explained : ArticleType),
    ];

    for (entry in seedData.values()) {
      let article : Article = {
        id = nextId;
        title = entry.0;
        description = entry.1;
        content = ["Placeholder content"];
        articleType = entry.2;
        author = "Admin";
        createdAt = Time.now();
        displayOrder = nextId;
      };
      articles.add(nextId, article);
      nextId += 1;
    };
  };

  seedArticles();

  public shared ({ caller }) func createArticle(
    title : Text,
    description : Text,
    content : [Text],
    articleType : ArticleType,
    author : Text,
    displayOrder : Nat,
  ) : async Nat {
    if (not isAdminPrincipal(caller)) {
      Runtime.trap("Unauthorized only admins can create articles");
    };
    let article : Article = {
      id = nextId;
      title;
      description;
      content;
      articleType;
      author;
      createdAt = Time.now();
      displayOrder;
    };
    articles.add(nextId, article);
    nextId += 1;
    article.id;
  };

  public shared ({ caller }) func updateArticle(
    id : Nat,
    title : Text,
    description : Text,
    content : [Text],
    articleType : ArticleType,
    author : Text,
    displayOrder : Nat,
  ) : async () {
    if (not isAdminPrincipal(caller)) {
      Runtime.trap("Unauthorized only admins can update articles");
    };
    switch (articles.get(id)) {
      case (null) { Runtime.trap("Article does not exist") };
      case (?existing) {
        articles.add(id, {
          existing with
          title;
          description;
          content;
          articleType;
          author;
          displayOrder;
        });
      };
    };
  };

  public shared ({ caller }) func deleteArticle(id : Nat) : async () {
    if (not isAdminPrincipal(caller)) {
      Runtime.trap("Unauthorized only admins can delete articles");
    };
    if (not articles.containsKey(id)) {
      Runtime.trap("Article does not exist");
    };
    articles.remove(id);
  };

  public query func getArticle(id : Nat) : async Article {
    switch (articles.get(id)) {
      case (null) { Runtime.trap("Article does not exist") };
      case (?article) { article };
    };
  };

  public query func getArticles() : async [Article] {
    articles.values().toArray().sort(Article.compareByDisplayOrder);
  };

  public query func getArticlesByType(articleType : ArticleType) : async [Article] {
    articles.values().toArray().filter(
      func(a) { a.articleType == articleType }
    ).sort(Article.compareByDisplayOrder);
  };

  // ─────────────── Projects ────────────────────────
  public type ProjectStatus = {
    #active;
    #inProgress;
    #completed;
  };

  public type Project = {
    id : Nat;
    title : Text;
    description : Text;
    status : ProjectStatus;
    tags : [Text];
    link : Text;
    displayOrder : Nat;
    createdAt : Int;
  };

  module Project {
    public func compareByDisplayOrder(p1 : Project, p2 : Project) : Order.Order {
      Nat.compare(p1.displayOrder, p2.displayOrder);
    };
  };

  let projects = Map.empty<Nat, Project>();
  var nextProjectId = 1;

  public shared ({ caller }) func createProject(
    title : Text,
    description : Text,
    status : ProjectStatus,
    tags : [Text],
    link : Text,
    displayOrder : Nat,
  ) : async Nat {
    if (not isAdminPrincipal(caller)) {
      Runtime.trap("Unauthorized only admins can create projects");
    };
    let project : Project = {
      id = nextProjectId;
      title;
      description;
      status;
      tags;
      link;
      displayOrder;
      createdAt = Time.now();
    };
    projects.add(nextProjectId, project);
    nextProjectId += 1;
    project.id;
  };

  public shared ({ caller }) func updateProject(
    id : Nat,
    title : Text,
    description : Text,
    status : ProjectStatus,
    tags : [Text],
    link : Text,
    displayOrder : Nat,
  ) : async () {
    if (not isAdminPrincipal(caller)) {
      Runtime.trap("Unauthorized only admins can update projects");
    };
    switch (projects.get(id)) {
      case (null) { Runtime.trap("Project does not exist") };
      case (?existing) {
        projects.add(id, {
          existing with
          title;
          description;
          status;
          tags;
          link;
          displayOrder;
        });
      };
    };
  };

  public shared ({ caller }) func deleteProject(id : Nat) : async () {
    if (not isAdminPrincipal(caller)) {
      Runtime.trap("Unauthorized only admins can delete projects");
    };
    if (not projects.containsKey(id)) {
      Runtime.trap("Project does not exist");
    };
    projects.remove(id);
  };

  public query func getProjects() : async [Project] {
    projects.values().toArray().sort(Project.compareByDisplayOrder);
  };
};
