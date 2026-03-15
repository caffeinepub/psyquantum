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
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createArticle(title: string, description: string, content: Array<string>, articleType: ArticleType, author: string, displayOrder: bigint): Promise<bigint>;
    createProject(title: string, description: string, status: ProjectStatus, tags: Array<string>, link: string, displayOrder: bigint): Promise<bigint>;
    deleteArticle(id: bigint): Promise<void>;
    deleteProject(id: bigint): Promise<void>;
    getArticle(id: bigint): Promise<Article>;
    getArticles(): Promise<Array<Article>>;
    getArticlesByType(articleType: ArticleType): Promise<Array<Article>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getCreatorImageUrl(): Promise<string>;
    getLogoUrl(): Promise<string>;
    getProjects(): Promise<Array<Project>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    isAdminClaimed(): Promise<boolean>;
    claimFirstAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    setCreatorImageUrl(url: string): Promise<void>;
    setLogoUrl(url: string): Promise<void>;
    updateArticle(id: bigint, title: string, description: string, content: Array<string>, articleType: ArticleType, author: string, displayOrder: bigint): Promise<void>;
    updateProject(id: bigint, title: string, description: string, status: ProjectStatus, tags: Array<string>, link: string, displayOrder: bigint): Promise<void>;
}
