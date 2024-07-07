import type { MicroCMSImage } from "./microcms-schema";

export type Member = {
  /**
   * 名前
   */
  name?: string;
  /**
   * プロフィール画像
   */
  image?: MicroCMSImage;
  /**
   * 自己紹介
   */
  introduction?: string;
  /**
   * 入学年度
   */
  enrollment?: string;
  /**
   * 学部
   */
  faculty?: string;
  /**
   * 学科
   */
  department?: string;
};
