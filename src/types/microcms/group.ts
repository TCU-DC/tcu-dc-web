import { MicroCMSImage } from "./microcms-schema";

export type Group = {
  /**
   * 班名
   */
  name?: string;
  /**
   * 班の説明
   */
  description?: string;
  /**
   * 紹介画像
   */
  image?: MicroCMSImage[];
};
