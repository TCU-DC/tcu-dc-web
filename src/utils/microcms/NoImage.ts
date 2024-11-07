import type { MicroCMSImage } from "@/types/microcms/microcms-schema";
import { generateOGP } from "@/utils/microcms/generateOGP";

export class NoImage {
  static ogp(baseImage: MicroCMSImage, title: string): MicroCMSImage {
    return {
      url: generateOGP(baseImage.url, title),
      height: baseImage.height,
      width: baseImage.width,
    };
  }
  static white: MicroCMSImage = {
    url: "/no_image_white.jpg",
    width: 600,
    height: 600,
  };
  static gray: MicroCMSImage = {
    url: "/no_image_gray.jpg",
    width: 600,
    height: 600,
  };
}
