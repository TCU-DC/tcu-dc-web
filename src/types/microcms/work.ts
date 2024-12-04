import type { Group } from "./group";
import type { Member } from "./member";
import type { MicroCMSImage, MicroCMSRelation } from "./microcms-schema";

export type Work = {
  /**
   * 班
   */
  group?: MicroCMSRelation<Group | null>;
  /**
   * 作者
   */
  author?: MicroCMSRelation<Member | null>[];
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
