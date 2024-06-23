import { MicroCMSRelation } from "./microcms-schema";

export type Top = {
  /**
   * サイト名
   */
  title?: string;
  /**
   * サイトの説明文
   */
  description?: string;
  /**
   * ナビゲーションバー
   */
  navbarLinks?: TopCustomFieldNavLink;
  /**
   * 入会ボタン
   */
  join?: (
    | TopCustomFieldLink
    | TopCustomFieldPageLink
    | TopCustomFieldPostLink
  )[];
  /**
   * フッターリンク
   */
  footerLinks?: (
    | TopCustomFieldPageLink
    | TopCustomFieldPostLink
    | TopCustomFieldLink
  )[];
};

export type TopCustomFieldNavLink = {
  /**
   * fieldId
   */
  fieldId: "navLink";
  /**
   * リンク（PC：左、SP：上）
   */
  left?: (
    | TopCustomFieldPageLink
    | TopCustomFieldPostLink
    | TopCustomFieldLink
  )[];
  /**
   * リンク（PC：中央、SP：中央）
   */
  center?: (
    | TopCustomFieldPageLink
    | TopCustomFieldPostLink
    | TopCustomFieldLink
  )[];
  /**
   * リンク（PC：右、SP：下）
   */
  right?: (
    | TopCustomFieldPageLink
    | TopCustomFieldPostLink
    | TopCustomFieldLink
  )[];
};

export type TopCustomFieldPageLink = {
  /**
   * fieldId
   */
  fieldId: "pageLink";
  /**
   * リンク（固定ページ）
   */
  page?: MicroCMSRelation<unknown | null>;
};

export type TopCustomFieldPostLink = {
  /**
   * fieldId
   */
  fieldId: "postLink";
  /**
   * リンク（お知らせ）
   */
  post?: MicroCMSRelation<unknown | null>;
};

export type TopCustomFieldLink = {
  /**
   * fieldId
   */
  fieldId: "link";
  /**
   * タイトル
   */
  title?: string;
  /**
   * タイトル（英語）
   */
  englishTitle?: string;
  /**
   * リンク（外部）
   */
  link?: string;
};
