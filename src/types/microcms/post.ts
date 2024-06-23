import { MicroCMSRelation, MicroCMSImage } from "./microcms-schema";
import { PostCategory } from "./post_category";
import { Member } from "./member";

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
  category?: MicroCMSRelation<PostCategory | null>[];
  /**
   * 著者
   */
  author?: MicroCMSRelation<Member | null>[];
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
