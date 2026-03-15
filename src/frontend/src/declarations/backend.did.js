/* eslint-disable */

// @ts-nocheck

import { IDL } from '@icp-sdk/core/candid';

export const UserRole = IDL.Variant({
  'admin' : IDL.Null,
  'user' : IDL.Null,
  'guest' : IDL.Null,
});
export const ArticleType = IDL.Variant({
  'concept' : IDL.Null,
  'explained' : IDL.Null,
});
export const ProjectStatus = IDL.Variant({
  'active' : IDL.Null,
  'completed' : IDL.Null,
  'inProgress' : IDL.Null,
});
export const Article = IDL.Record({
  'id' : IDL.Nat,
  'title' : IDL.Text,
  'content' : IDL.Vec(IDL.Text),
  'articleType' : ArticleType,
  'displayOrder' : IDL.Nat,
  'createdAt' : IDL.Int,
  'description' : IDL.Text,
  'author' : IDL.Text,
});
export const UserProfile = IDL.Record({ 'name' : IDL.Text });
export const Project = IDL.Record({
  'id' : IDL.Nat,
  'status' : ProjectStatus,
  'title' : IDL.Text,
  'displayOrder' : IDL.Nat,
  'link' : IDL.Text,
  'createdAt' : IDL.Int,
  'tags' : IDL.Vec(IDL.Text),
  'description' : IDL.Text,
});

export const idlService = IDL.Service({
  'checkAdminPassword' : IDL.Func([IDL.Text], [IDL.Bool], ['query']),
  'isCallerAdmin' : IDL.Func([], [IDL.Bool], ['query']),
  'isAdminClaimed' : IDL.Func([], [IDL.Bool], ['query']),
  'claimFirstAdmin' : IDL.Func([], [IDL.Bool], []),
  'forceResetAdmin' : IDL.Func([IDL.Text], [IDL.Bool], []),
  'createArticle' : IDL.Func(
      [IDL.Text, IDL.Text, IDL.Text, IDL.Vec(IDL.Text), ArticleType, IDL.Text, IDL.Nat],
      [IDL.Nat],
      [],
    ),
  'createProject' : IDL.Func(
      [IDL.Text, IDL.Text, IDL.Text, ProjectStatus, IDL.Vec(IDL.Text), IDL.Text, IDL.Nat],
      [IDL.Nat],
      [],
    ),
  'deleteArticle' : IDL.Func([IDL.Text, IDL.Nat], [], []),
  'deleteProject' : IDL.Func([IDL.Text, IDL.Nat], [], []),
  'getArticle' : IDL.Func([IDL.Nat], [Article], ['query']),
  'getArticles' : IDL.Func([], [IDL.Vec(Article)], ['query']),
  'getArticlesByType' : IDL.Func([ArticleType], [IDL.Vec(Article)], ['query']),
  'getCallerUserProfile' : IDL.Func([], [IDL.Opt(UserProfile)], ['query']),
  'getCreatorImageUrl' : IDL.Func([], [IDL.Text], ['query']),
  'getLogoUrl' : IDL.Func([], [IDL.Text], ['query']),
  'getProjects' : IDL.Func([], [IDL.Vec(Project)], ['query']),
  'getUserProfile' : IDL.Func(
      [IDL.Principal],
      [IDL.Opt(UserProfile)],
      ['query'],
    ),
  'saveCallerUserProfile' : IDL.Func([UserProfile], [], []),
  'setCreatorImageUrl' : IDL.Func([IDL.Text, IDL.Text], [], []),
  'setLogoUrl' : IDL.Func([IDL.Text, IDL.Text], [], []),
  'getSiteText' : IDL.Func([IDL.Text], [IDL.Text], ['query']),
  'getAllSiteTexts' : IDL.Func([], [IDL.Vec(IDL.Tuple(IDL.Text, IDL.Text))], ['query']),
  'setSiteText' : IDL.Func([IDL.Text, IDL.Text, IDL.Text], [], []),
  'updateArticle' : IDL.Func(
      [
        IDL.Text,
        IDL.Nat,
        IDL.Text,
        IDL.Text,
        IDL.Vec(IDL.Text),
        ArticleType,
        IDL.Text,
        IDL.Nat,
      ],
      [],
      [],
    ),
  'updateProject' : IDL.Func(
      [
        IDL.Text,
        IDL.Nat,
        IDL.Text,
        IDL.Text,
        ProjectStatus,
        IDL.Vec(IDL.Text),
        IDL.Text,
        IDL.Nat,
      ],
      [],
      [],
    ),
});

export const idlInitArgs = [];

export const idlFactory = ({ IDL }) => {
  const UserRole = IDL.Variant({
    'admin' : IDL.Null,
    'user' : IDL.Null,
    'guest' : IDL.Null,
  });
  const ArticleType = IDL.Variant({
    'concept' : IDL.Null,
    'explained' : IDL.Null,
  });
  const ProjectStatus = IDL.Variant({
    'active' : IDL.Null,
    'completed' : IDL.Null,
    'inProgress' : IDL.Null,
  });
  const Article = IDL.Record({
    'id' : IDL.Nat,
    'title' : IDL.Text,
    'content' : IDL.Vec(IDL.Text),
    'articleType' : ArticleType,
    'displayOrder' : IDL.Nat,
    'createdAt' : IDL.Int,
    'description' : IDL.Text,
    'author' : IDL.Text,
  });
  const UserProfile = IDL.Record({ 'name' : IDL.Text });
  const Project = IDL.Record({
    'id' : IDL.Nat,
    'status' : ProjectStatus,
    'title' : IDL.Text,
    'displayOrder' : IDL.Nat,
    'link' : IDL.Text,
    'createdAt' : IDL.Int,
    'tags' : IDL.Vec(IDL.Text),
    'description' : IDL.Text,
  });

  return IDL.Service({
    'checkAdminPassword' : IDL.Func([IDL.Text], [IDL.Bool], ['query']),
    'isCallerAdmin' : IDL.Func([], [IDL.Bool], ['query']),
    'isAdminClaimed' : IDL.Func([], [IDL.Bool], ['query']),
    'claimFirstAdmin' : IDL.Func([], [IDL.Bool], []),
    'forceResetAdmin' : IDL.Func([IDL.Text], [IDL.Bool], []),
    'createArticle' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Text, IDL.Vec(IDL.Text), ArticleType, IDL.Text, IDL.Nat],
        [IDL.Nat],
        [],
      ),
    'createProject' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Text, ProjectStatus, IDL.Vec(IDL.Text), IDL.Text, IDL.Nat],
        [IDL.Nat],
        [],
      ),
    'deleteArticle' : IDL.Func([IDL.Text, IDL.Nat], [], []),
    'deleteProject' : IDL.Func([IDL.Text, IDL.Nat], [], []),
    'getArticle' : IDL.Func([IDL.Nat], [Article], ['query']),
    'getArticles' : IDL.Func([], [IDL.Vec(Article)], ['query']),
    'getArticlesByType' : IDL.Func(
        [ArticleType],
        [IDL.Vec(Article)],
        ['query'],
      ),
    'getCallerUserProfile' : IDL.Func([], [IDL.Opt(UserProfile)], ['query']),
    'getCreatorImageUrl' : IDL.Func([], [IDL.Text], ['query']),
    'getLogoUrl' : IDL.Func([], [IDL.Text], ['query']),
    'getProjects' : IDL.Func([], [IDL.Vec(Project)], ['query']),
    'getUserProfile' : IDL.Func(
        [IDL.Principal],
        [IDL.Opt(UserProfile)],
        ['query'],
      ),
    'saveCallerUserProfile' : IDL.Func([UserProfile], [], []),
    'setCreatorImageUrl' : IDL.Func([IDL.Text, IDL.Text], [], []),
    'setLogoUrl' : IDL.Func([IDL.Text, IDL.Text], [], []),
    'getSiteText' : IDL.Func([IDL.Text], [IDL.Text], ['query']),
    'getAllSiteTexts' : IDL.Func([], [IDL.Vec(IDL.Tuple(IDL.Text, IDL.Text))], ['query']),
    'setSiteText' : IDL.Func([IDL.Text, IDL.Text, IDL.Text], [], []),
    'updateArticle' : IDL.Func(
        [
          IDL.Text,
          IDL.Nat,
          IDL.Text,
          IDL.Text,
          IDL.Vec(IDL.Text),
          ArticleType,
          IDL.Text,
          IDL.Nat,
        ],
        [],
        [],
      ),
    'updateProject' : IDL.Func(
        [
          IDL.Text,
          IDL.Nat,
          IDL.Text,
          IDL.Text,
          ProjectStatus,
          IDL.Vec(IDL.Text),
          IDL.Text,
          IDL.Nat,
        ],
        [],
        [],
      ),
  });
};

export const init = ({ IDL }) => { return []; };
