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

actor {
  // Initialize the user system state
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // Returns true if the admin role has been claimed by anyone
  public query func isAdminClaimed() : async Bool {
    accessControlState.adminAssigned;
  };

  // Allows the first logged-in user to claim admin. Fails if admin is already claimed.
  public shared ({ caller }) func claimFirstAdmin() : async Bool {
    if (accessControlState.adminAssigned) {
      return false;
    };
    if (caller.isAnonymous()) {
      return false;
    };
    accessControlState.userRoles.add(caller, #admin);
    accessControlState.adminAssigned := true;
    true;
  };

  public type UserProfile = {
    name : Text;
  };

  let userProfiles = Map.empty<Principal, UserProfile>();

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

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
      ("Concept 1", "Short desc 1", #concept),
      ("Concept 2", "Short desc 2", #concept),
      ("Concept 3", "Short desc 3", #concept),
      ("Concept 4", "Short desc 4", #concept),
      ("Concept 5", "Short desc 5", #concept),
      ("Explained 1", "Short desc 6", #explained),
      ("Explained 2", "Short desc 7", #explained),
      ("Explained 3", "Short desc 8", #explained),
      ("Explained 4", "Short desc 9", #explained),
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
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
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
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };

    switch (articles.get(id)) {
      case (null) { Runtime.trap("Article does not exist") };
      case (?existing) {
        let updated : Article = {
          existing with
          title;
          description;
          content;
          articleType;
          author;
          displayOrder;
        };
        articles.add(id, updated);
      };
    };
  };

  public shared ({ caller }) func deleteArticle(id : Nat) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
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
      func(article) { article.articleType == articleType }
    ).sort(Article.compareByDisplayOrder);
  };
};
