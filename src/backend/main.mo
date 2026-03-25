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
  let accessControlState = AccessControl.initState(); // was stable in prev version

  // ─────────────── Admin Auth (password-based, no Internet Identity needed) ───
  let ADMIN_SECRET : Text = "psq-internal-api-k76-2026";
  // User-facing password (only used by checkAdminPassword for frontend login)
  let USER_PASSWORD : Text = "PsyQ@Adm!n#2026$Secure";

  func checkSecret(secret : Text) : Bool {
    secret == ADMIN_SECRET;
  };

  // Verify admin password — frontend calls this to check before entering panel
  public query func checkAdminPassword(secret : Text) : async Bool {
    secret == USER_PASSWORD;
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

  // Stable storage for articles — survives upgrades and redeployments
  stable var articleStableData : [Article] = [];
  stable var nextId : Nat = 1;
  stable var initialized : Bool = false;

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

  // Stable storage for projects — survives upgrades and redeployments
  stable var projectStableData : [Project] = [];
  stable var nextProjectId : Nat = 1;

  let projects = Map.empty<Nat, Project>();

  // ─────────────── Upgrade Hooks ───────────────────
  system func preupgrade() {
    // Save site texts
    siteTextData := siteTexts.entries().toArray();
    // Save articles
    articleStableData := articles.values().toArray();
    // Save projects
    projectStableData := projects.values().toArray();
  };

  system func postupgrade() {
    // Restore site texts
    for ((k, v) in siteTextData.vals()) {
      siteTexts.add(k, v);
    };
    // Restore articles
    for (article in articleStableData.vals()) {
      articles.add(article.id, article);
    };
    // Restore projects
    for (project in projectStableData.vals()) {
      projects.add(project.id, project);
    };
  };

  // Seed stub articles only on very first ever initialization
  // (initialized is stable so this runs exactly once after first deployment)
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
      ("Concept 6", "Short desc 6", #concept : ArticleType),
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
