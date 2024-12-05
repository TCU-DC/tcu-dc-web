import type { Group } from "./group";
import type { MicroCMSImage, MicroCMSRelation } from "./microcms-schema";
import type { Page } from "./page";
import type { Post } from "./post";

export type Config = {
  /**
   * 【共通】サイト名（必須）
   */
  title: string;
  /**
   * 【共通】サイトの説明文（必須）
   */
  description: string;
  /**
   * 【共通】記事ページで使用する動的生成用のOGP画像（必須）
   */
  ogpDynGen: MicroCMSImage;
  /**
   * 【共通】サイト全体のデフォルトOGP画像（必須）
   */
  ogpDefault: MicroCMSImage;
  /**
   * 【共通】ヘッダーナビゲーションバー
   */
  headerLinks?: ConfigCustomFieldHeaderLinks;
  /**
   * 【共通】ヘッダー入会ボタン
   */
  joinLink?: (
    | ConfigCustomFieldExternalLink
    | ConfigCustomFieldPageLink
    | ConfigCustomFieldPostLink
  )[];
  /**
   * 【トップページ】背景画像
   */
  topImages?: MicroCMSImage[];
  /**
   * 【トップページ】サークル紹介見出し
   */
  aboutHeader?: ConfigCustomFieldHeader;
  /**
   * 【トップページ】班紹介に表示する班を選択
   */
  groupCards?: MicroCMSRelation<Group | null>[];
  /**
   * 【トップページ】作品紹介見出し
   */
  galleryHeader?: ConfigCustomFieldHeader;
  /**
   * 【トップページ】活動紹介見出し
   */
  activitiesHeader?: ConfigCustomFieldHeader;
  /**
   * 【トップページ】活動紹介
   */
  activityCards?: ConfigCustomFieldActivityCard[];
  /**
   * 【トップページ】お問い合わせタイトル
   */
  contactHeader?: string;
  /**
   * 【トップページ】お問い合わせ説明
   */
  contactDescription?: string;
  /**
   * 【トップページ】お問い合わせリンク（PC：左、SP：上）
   */
  contactLink01?: (
    | ConfigCustomFieldPageLink
    | ConfigCustomFieldPostLink
    | ConfigCustomFieldExternalLink
  )[];
  /**
   * 【トップページ】お問い合わせリンク（PC：右、SP：下）
   */
  contactLink02?: (
    | ConfigCustomFieldPageLink
    | ConfigCustomFieldPostLink
    | ConfigCustomFieldExternalLink
  )[];
  /**
   * 【共通】フッターリンク①
   */
  footerLinks01?: ConfigCustomFieldFooterLinks;
  /**
   * 【共通】フッターリンク②
   */
  footerLinks02?: ConfigCustomFieldFooterLinks;
  /**
   * 【共通】フッターリンク③
   */
  footerLinks03?: ConfigCustomFieldFooterLinks;
  /**
   * 【共通】フッターリンク④
   */
  footerLinks04?: ConfigCustomFieldFooterLinks;
  /**
   * 【トップページ】トップページ用のOGP（任意）
   */
  topOgp?: MicroCMSImage;
};

export type ConfigCustomFieldHeaderLinks = {
  /**
   * fieldId
   */
  fieldId: "headerLinks";
  /**
   * リンク（PC：左、SP：上）
   */
  link01?: (
    | ConfigCustomFieldPageLink
    | ConfigCustomFieldPostLink
    | ConfigCustomFieldExternalLink
  )[];
  /**
   * リンク（PC：中央、SP：中央）
   */
  link02?: (
    | ConfigCustomFieldPageLink
    | ConfigCustomFieldPostLink
    | ConfigCustomFieldExternalLink
  )[];
  /**
   * リンク（PC：右、SP：下）
   */
  link03?: (
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
  page: MicroCMSRelation<Page | null>;
  /**
   * タイトル（記入しない場合固定ページのタイトルが使用されます）
   */
  title?: string;
  /**
   * 英語タイトル（ページに存在しない場合もあります）
   */
  englishTitle?: string;
};

export type ConfigCustomFieldPostLink = {
  /**
   * fieldId
   */
  fieldId: "postLink";
  /**
   * リンク（記事ページ）
   */
  post: MicroCMSRelation<Post | null>;
  /**
   * タイトル（記入しない場合記事ページのタイトルが使用されます）
   */
  title?: string;
  /**
   * 英語タイトル（ページに存在しない場合もあります）
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
  link: string;
  /**
   * タイトル
   */
  title: string;
  /**
   * 英語タイトル（存在しない場合もあります）
   */
  englishTitle?: string;
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
  images?: MicroCMSImage[];
};

export type ConfigCustomFieldFooterLinks = {
  /**
   * fieldId
   */
  fieldId: "footerLinks";
  /**
   * タイトル
   */
  title?: string;
  /**
   * リンク
   */
  links?: (
    | ConfigCustomFieldPageLink
    | ConfigCustomFieldPostLink
    | ConfigCustomFieldExternalLink
  )[];
};

export type ConfigCustomFieldHeader = {
  /**
   * fieldId
   */
  fieldId: "header";
  /**
   * タイトル
   */
  title: string;
  /**
   * サブタイトル
   */
  subtitle: string;
  /**
   * 説明
   */
  description?: string;
};
