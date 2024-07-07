import type { MicroCMSRelation, MicroCMSImage } from "./microcms-schema";
import type { Page } from "./page";
import type { Post } from "./post";
import type { Group } from "./group";

export type Config = {
  /**
   * サイト名
   */
  title: string;
  /**
   * サイトの説明文
   */
  description: string;
  /**
   * ナビゲーションバー
   */
  navbarLinks?: ConfigCustomFieldNavLink;
  /**
   * 入会ボタン
   */
  join?: (
    | ConfigCustomFieldExternalLink
    | ConfigCustomFieldPageLink
    | ConfigCustomFieldPostLink
  )[];
  /**
   * フッターリンク
   */
  footerLinks?: (
    | ConfigCustomFieldPageLink
    | ConfigCustomFieldPostLink
    | ConfigCustomFieldExternalLink
  )[];
  /**
   * トップページ設定
   */
  top?: ConfigCustomFieldTop;
  /**
   * 記事ページで使用する動的生成用のOGP画像
   */
  ogp: MicroCMSImage;
};

export type ConfigCustomFieldNavLink = {
  /**
   * fieldId
   */
  fieldId: "navLink";
  /**
   * リンク（PC：左、SP：上）
   */
  left?: (
    | ConfigCustomFieldPageLink
    | ConfigCustomFieldPostLink
    | ConfigCustomFieldExternalLink
  )[];
  /**
   * リンク（PC：中央、SP：中央）
   */
  center?: (
    | ConfigCustomFieldPageLink
    | ConfigCustomFieldPostLink
    | ConfigCustomFieldExternalLink
  )[];
  /**
   * リンク（PC：右、SP：下）
   */
  right?: (
    | ConfigCustomFieldPageLink
    | ConfigCustomFieldPostLink
    | ConfigCustomFieldExternalLink
  )[];
};

export type ConfigCustomFieldPageLink = {
  /**
   * fieldId
   */
  fieldId: "pageLink";
  /**
   * リンク（固定ページ）
   */
  page?: MicroCMSRelation<Page | null>;
  /**
   * 英語タイトル
   */
  englishTitle?: string;
};

export type ConfigCustomFieldPostLink = {
  /**
   * fieldId
   */
  fieldId: "postLink";
  /**
   * リンク（お知らせ）
   */
  post?: MicroCMSRelation<Post | null>;
  /**
   * 英語タイトル
   */
  englishTitle?: string;
};

export type ConfigCustomFieldExternalLink = {
  /**
   * fieldId
   */
  fieldId: "externalLink";
  /**
   * 外部リンクURL（例：https://example.com）
   */
  link?: string;
  /**
   * タイトル
   */
  title?: string;
  /**
   * 英語タイトル
   */
  englishTitle?: string;
};

export type ConfigCustomFieldTop = {
  /**
   * fieldId
   */
  fieldId: "top";
  /**
   * デジコンについての説明
   */
  aboutDesc?: string;
  /**
   * 班紹介に表示する班の設定
   */
  groups?: MicroCMSRelation<Group | null>[];
  /**
   * 活動内容の説明
   */
  activitiesDesc?: string;
  /**
   * 活動内容紹介カード
   */
  activities?: ConfigCustomFieldActivityCard[];
};

export type ConfigCustomFieldActivityCard = {
  /**
   * fieldId
   */
  fieldId: "activityCard";
  /**
   * タイトル
   */
  title?: string;
  /**
   * 紹介文
   */
  description?: string;
  /**
   * 紹介画像
   */
  image?: MicroCMSImage;
};
