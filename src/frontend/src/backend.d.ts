import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
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
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export type ProjectStatus = "active" | "inProgress" | "completed";
export interface Project {
    id: bigint;
    title: string;
    description: string;
    status: ProjectStatus;
    tags: Array<string>;
    link: string;
    displayOrder: bigint;
    createdAt: bigint;
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    claimFirstAdmin(): Promise<boolean>;
    createArticle(title: string, description: string, content: Array<string>, articleType: ArticleType, author: string, displayOrder: bigint): Promise<bigint>;
    deleteArticle(id: bigint): Promise<void>;
    getArticle(id: bigint): Promise<Article>;
    getArticles(): Promise<Array<Article>>;
    getArticlesByType(articleType: ArticleType): Promise<Array<Article>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    getLogoUrl(): Promise<string>;
    isAdminClaimed(): Promise<boolean>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    setLogoUrl(url: string): Promise<void>;
    updateArticle(id: bigint, title: string, description: string, content: Array<string>, articleType: ArticleType, author: string, displayOrder: bigint): Promise<void>;
    createProject(title: string, description: string, status: ProjectStatus, tags: Array<string>, link: string, displayOrder: bigint): Promise<bigint>;
    updateProject(id: bigint, title: string, description: string, status: ProjectStatus, tags: Array<string>, link: string, displayOrder: bigint): Promise<void>;
    deleteProject(id: bigint): Promise<void>;
    getProjects(): Promise<Array<Project>>;
}
