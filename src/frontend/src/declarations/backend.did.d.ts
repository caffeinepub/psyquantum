/* eslint-disable */

// @ts-nocheck

import type { ActorMethod } from '@icp-sdk/core/agent';
import type { IDL } from '@icp-sdk/core/candid';
import type { Principal } from '@icp-sdk/core/principal';

export interface Article {
  'id' : bigint,
  'title' : string,
  'content' : Array<string>,
  'articleType' : ArticleType,
  'displayOrder' : bigint,
  'createdAt' : bigint,
  'description' : string,
  'author' : string,
}
export type ArticleType = { 'concept' : null } |
  { 'explained' : null };
export interface Project {
  'id' : bigint,
  'status' : ProjectStatus,
  'title' : string,
  'displayOrder' : bigint,
  'link' : string,
  'createdAt' : bigint,
  'tags' : Array<string>,
  'description' : string,
}
export type ProjectStatus = { 'active' : null } |
  { 'completed' : null } |
  { 'inProgress' : null };
export interface UserProfile { 'name' : string }
export type UserRole = { 'admin' : null } |
  { 'user' : null } |
  { 'guest' : null };
export interface _SERVICE {
  'checkAdminPassword' : ActorMethod<[string], boolean>,
  'isCallerAdmin' : ActorMethod<[], boolean>,
  'isAdminClaimed' : ActorMethod<[], boolean>,
  'claimFirstAdmin' : ActorMethod<[], boolean>,
  'forceResetAdmin' : ActorMethod<[string], boolean>,
  'createArticle' : ActorMethod<
    [string, string, string, Array<string>, ArticleType, string, bigint],
    bigint
  >,
  'createProject' : ActorMethod<
    [string, string, string, ProjectStatus, Array<string>, string, bigint],
    bigint
  >,
  'deleteArticle' : ActorMethod<[string, bigint], undefined>,
  'deleteProject' : ActorMethod<[string, bigint], undefined>,
  'getArticle' : ActorMethod<[bigint], Article>,
  'getArticles' : ActorMethod<[], Array<Article>>,
  'getArticlesByType' : ActorMethod<[ArticleType], Array<Article>>,
  'getCallerUserProfile' : ActorMethod<[], [] | [UserProfile]>,
  'getCreatorImageUrl' : ActorMethod<[], string>,
  'getLogoUrl' : ActorMethod<[], string>,
  'getProjects' : ActorMethod<[], Array<Project>>,
  'getUserProfile' : ActorMethod<[Principal], [] | [UserProfile]>,
  'saveCallerUserProfile' : ActorMethod<[UserProfile], undefined>,
  'setCreatorImageUrl' : ActorMethod<[string, string], undefined>,
  'setLogoUrl' : ActorMethod<[string, string], undefined>,
  'getSiteText' : ActorMethod<[string], string>,
  'getAllSiteTexts' : ActorMethod<[], Array<[string, string]>>,
  'setSiteText' : ActorMethod<[string, string, string], undefined>,
  'updateArticle' : ActorMethod<
    [string, bigint, string, string, Array<string>, ArticleType, string, bigint],
    undefined
  >,
  'updateProject' : ActorMethod<
    [string, bigint, string, string, ProjectStatus, Array<string>, string, bigint],
    undefined
  >,
}
export declare const idlService: IDL.ServiceClass;
export declare const idlInitArgs: IDL.Type[];
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
