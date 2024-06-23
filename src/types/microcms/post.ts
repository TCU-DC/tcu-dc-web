import { MicroCMSRelation, MicroCMSImage } from "./microcms-schema";

export type Post = {
  /**
   * タイトル
   */
  title?: string;
  /**
   * 記事の説明
   */
  description?: string;
  /**
   * カテゴリ
   */
  category?: MicroCMSRelation<unknown | null>[];
  /**
   * 著者
   */
  author?: MicroCMSRelation<unknown | null>[];
  /**
   * 本文
   */
  body?: string;
  /**
   * OGP画像
   */
  image?: MicroCMSImage;
  /**
   * このページを検索結果から非表示にする
   */
  noindex?: boolean;
};
