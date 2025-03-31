import type { MicroCMSImage } from "@/types/microcms/microcms-schema";
import { generateOGP } from "@/utils/microcms/generateOGP";

export class NoImage {
  /**
   * 指定されたベース画像とタイトルを使用して OGP 画像を生成
   * @param {MicroCMSImage} baseImage - ベースとなる画像
   * @param {string} title - OGP 画像に含めるタイトル
   * @returns {MicroCMSImage} 生成された OGP 画像
   */
  static ogp(baseImage: MicroCMSImage, title: string): MicroCMSImage {
    return {
      url: generateOGP(baseImage.url, title),
      height: baseImage.height,
      width: baseImage.width,
    };
  }
  /**
   * デフォルトの DC ロゴの OGP 画像
   * @type {MicroCMSImage}
   */
  static dcLogoThumbnail: MicroCMSImage = {
    url: "/dc_logo_thumbnail.png",
    width: 2400,
    height: 1260,
  };

  /**
   * 白色のプレースホルダー画像
   * @type {MicroCMSImage}
   */
  static white: MicroCMSImage = {
    url: "/no_image_white.jpg",
    width: 600,
    height: 600,
  };
  /**
   * 灰色のプレースホルダー画像
   * @type {MicroCMSImage}
   */
  static gray: MicroCMSImage = {
    url: "/no_image_gray.jpg",
    width: 600,
    height: 600,
  };
}
