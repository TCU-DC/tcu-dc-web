import { MicroCMSRelation, MicroCMSImage } from "./microcms-schema";

export type Work = {
  /**
   * 班
   */
  group?: MicroCMSRelation<unknown | null>;
  /**
   * 作者
   */
  author?: MicroCMSRelation<unknown | null>[];
  /**
   * タイトル
   */
  title?: string;
  /**
   * 説明
   */
  description?: string;
  /**
   * 画像
   */
  image?: MicroCMSImage;
  /**
   * 詳細な説明文
   */
  body?: string;
};
