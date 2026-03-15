import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Project {
    id: bigint;
    status: ProjectStatus;
    title: string;
    displayOrder: bigint;
    link: string;
    createdAt: bigint;
    tags: Array<string>;
    description: string;
}
export interface UserProfile {
    name: string;
}
export interface Article {
    id: bigint;
    title: string;
    content: Array<string>;
    articleType: ArticleType;
    displayOrder: bigint;
    createdAt: bigint;
    description: string;
    author: string;
}
export enum ArticleType {
    concept = "concept",
    explained = "explained"
}
export enum ProjectStatus {
    active = "active",
    completed = "completed",
    inProgress = "inProgress"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    checkAdminPassword(secret: string): Promise<boolean>;
    isCallerAdmin(): Promise<boolean>;
    isAdminClaimed(): Promise<boolean>;
    claimFirstAdmin(): Promise<boolean>;
    forceResetAdmin(secret: string): Promise<boolean>;
    createArticle(secret: string, title: string, description: string, content: Array<string>, articleType: ArticleType, author: string, displayOrder: bigint): Promise<bigint>;
    createProject(secret: string, title: string, description: string, status: ProjectStatus, tags: Array<string>, link: string, displayOrder: bigint): Promise<bigint>;
    deleteArticle(secret: string, id: bigint): Promise<void>;
    deleteProject(secret: string, id: bigint): Promise<void>;
    getArticle(id: bigint): Promise<Article>;
    getArticles(): Promise<Array<Article>>;
    getArticlesByType(articleType: ArticleType): Promise<Array<Article>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCreatorImageUrl(): Promise<string>;
    getLogoUrl(): Promise<string>;
    getProjects(): Promise<Array<Project>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    setCreatorImageUrl(secret: string, url: string): Promise<void>;
    setLogoUrl(secret: string, url: string): Promise<void>;
    getAllSiteTexts(): Promise<Array<[string, string]>>;
    getSiteText(key: string): Promise<string>;
    setSiteText(secret: string, key: string, value: string): Promise<void>;
    updateArticle(secret: string, id: bigint, title: string, description: string, content: Array<string>, articleType: ArticleType, author: string, displayOrder: bigint): Promise<void>;
    updateProject(secret: string, id: bigint, title: string, description: string, status: ProjectStatus, tags: Array<string>, link: string, displayOrder: bigint): Promise<void>;
}
