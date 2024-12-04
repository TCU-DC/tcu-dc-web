import type { MicroCMSImage } from "./microcms-schema";

export type Page = {
  /**
   * タイトル
   */
  title?: string;
  /**
   * ページの説明
   */
  description?: string;
  /**
   * 本文
   */
  body?: string;
  /**
   * OGP
   */
  ogp?: MicroCMSImage;
  /**
   * このページを検索結果から非表示にする
   */
  noindex?: boolean;
};
