import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Runtime "mo:core/Runtime";
import Array "mo:core/Array";
import Time "mo:core/Time";
import Order "mo:core/Order";
import Text "mo:core/Text";
import Principal "mo:core/Principal";
import Iter "mo:core/Iter";
import AccessControl "authorization/access-control";

//@formatter:off

actor {
  // ─── Upgrade compatibility stubs (keep old stable variables) ───────────────
  let RESET_SECRET : Text = "psyquantum-reset-2026"; // was stable in prev version
  stable var _adminPrincipal : ?Principal = null;     // was stable in prev version
  stable var initialized : Bool = true;               // was stable in prev version (kept for upgrade compat)
  let accessControlState = AccessControl.initState(); // was stable in prev version

  // ─────────────── Admin Auth (password-based, no Internet Identity needed) ───
  let ADMIN_SECRET : Text = "PsyQ@Adm!n#2026$Secure";

  func checkSecret(secret : Text) : Bool {
    secret == ADMIN_SECRET;
  };

  // Verify admin password — frontend calls this to check before entering panel
  public query func checkAdminPassword(secret : Text) : async Bool {
    checkSecret(secret);
  };

  // Legacy stubs kept for backward compat (always return false/no-op)
  public query func isCallerAdmin() : async Bool { false };
  public query func isAdminClaimed() : async Bool { true };
  public shared func claimFirstAdmin() : async Bool { false };
  public shared func forceResetAdmin(_secret : Text) : async Bool { false };

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

  public shared func setLogoUrl(secret : Text, url : Text) : async () {
    if (not checkSecret(secret)) {
      Runtime.trap("Wrong password");
    };
    logoUrl := url;
  };

  // ─────────────── Creator Image ───────────────────
  stable var creatorImageUrl : Text = "";

  public query func getCreatorImageUrl() : async Text {
    creatorImageUrl;
  };

  public shared func setCreatorImageUrl(secret : Text, url : Text) : async () {
    if (not checkSecret(secret)) {
      Runtime.trap("Wrong password");
    };
    creatorImageUrl := url;
  };

  // ─────────────── Site Text ───────────────────────
  stable var siteTextData : [(Text, Text)] = [];
  let siteTexts = Map.empty<Text, Text>();

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

  // Stable storage for articles
  stable var articlesData : [Article] = [];
  stable var nextId : Nat = 1;

  let articles = Map.empty<Nat, Article>();

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

  // Stable storage for projects
  stable var projectsData : [Project] = [];
  stable var nextProjectId : Nat = 1;

  let projects = Map.empty<Nat, Project>();

  // ─────────────── Upgrade hooks ────────────────────
  system func preupgrade() {
    siteTextData := siteTexts.entries().toArray();
    articlesData := articles.values().toArray();
    projectsData := projects.values().toArray();
  };

  system func postupgrade() {
    for ((k, v) in siteTextData.vals()) {
      siteTexts.add(k, v);
    };
    for (article in articlesData.vals()) {
      articles.add(article.id, article);
      if (article.id >= nextId) {
        nextId := article.id + 1;
      };
    };
    for (project in projectsData.vals()) {
      projects.add(project.id, project);
      if (project.id >= nextProjectId) {
        nextProjectId := project.id + 1;
      };
    };
  };

  // ─────────────── Site Text API ────────────────────
  public query func getSiteText(key : Text) : async Text {
    switch (siteTexts.get(key)) {
      case (?v) { v };
      case null { "" };
    };
  };

  public query func getAllSiteTexts() : async [(Text, Text)] {
    siteTexts.entries().toArray();
  };

  public shared func setSiteText(secret : Text, key : Text, value : Text) : async () {
    if (not checkSecret(secret)) {
      Runtime.trap("Wrong password");
    };
    siteTexts.add(key, value);
  };

  // ─────────────── Articles API ────────────────────
  public shared func createArticle(
    secret : Text,
    title : Text,
    description : Text,
    content : [Text],
    articleType : ArticleType,
    author : Text,
    displayOrder : Nat,
  ) : async Nat {
    if (not checkSecret(secret)) {
      Runtime.trap("Wrong password");
    };
    let id = nextId;
    let article : Article = {
      id;
      title;
      description;
      content;
      articleType;
      author;
      createdAt = Time.now();
      displayOrder;
    };
    articles.add(id, article);
    nextId := id + 1;
    id;
  };

  public shared func updateArticle(
    secret : Text,
    id : Nat,
    title : Text,
    description : Text,
    content : [Text],
    articleType : ArticleType,
    author : Text,
    displayOrder : Nat,
  ) : async () {
    if (not checkSecret(secret)) {
      Runtime.trap("Wrong password");
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

  public shared func deleteArticle(secret : Text, id : Nat) : async () {
    if (not checkSecret(secret)) {
      Runtime.trap("Wrong password");
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

  // ─────────────── Projects API ────────────────────
  public shared func createProject(
    secret : Text,
    title : Text,
    description : Text,
    status : ProjectStatus,
    tags : [Text],
    link : Text,
    displayOrder : Nat,
  ) : async Nat {
    if (not checkSecret(secret)) {
      Runtime.trap("Wrong password");
    };
    let id = nextProjectId;
    let project : Project = {
      id;
      title;
      description;
      status;
      tags;
      link;
      displayOrder;
      createdAt = Time.now();
    };
    projects.add(id, project);
    nextProjectId := id + 1;
    id;
  };

  public shared func updateProject(
    secret : Text,
    id : Nat,
    title : Text,
    description : Text,
    status : ProjectStatus,
    tags : [Text],
    link : Text,
    displayOrder : Nat,
  ) : async () {
    if (not checkSecret(secret)) {
      Runtime.trap("Wrong password");
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

  public shared func deleteProject(secret : Text, id : Nat) : async () {
    if (not checkSecret(secret)) {
      Runtime.trap("Wrong password");
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
