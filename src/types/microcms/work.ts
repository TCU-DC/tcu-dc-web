import type { Group } from "./group";
import type { Member } from "./member";
import type { MicroCMSImage, MicroCMSRelation } from "./microcms-schema";

export type Work = {
  /**
   * タイトル
   */
  title: string;
  /**
   * 簡単な説明
   */
  description: string;
  /**
   * 班
   */
  group: MicroCMSRelation<Group | null>;
  /**
   * 作者
   */
  author: MicroCMSRelation<Member | null>[];
  /**
   * 詳細な説明文
   */
  body?: string;
  /**
   * 画像（画像の一枚目がSNS共有時のOGPになります）
   */
  images?: MicroCMSImage[];
  /**
   * このページを検索結果から非表示にする
   */
  noindex?: boolean;
};
