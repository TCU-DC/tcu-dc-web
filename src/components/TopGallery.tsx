import { NoImage } from "@/utils/microcms/NoImage";
import { setImageQuality } from "@/utils/microcms/setImageQuality";
import { EmblaOptionsType } from "embla-carousel";
import AutoScroll from "embla-carousel-auto-scroll";
import useEmblaCarousel from "embla-carousel-react";
import type { MicroCMSImage } from "microcms-js-sdk";
import Image from "next/image";
import Link from "next/link";

function TopGallery({
  workImages,
}: {
  workImages: { image: MicroCMSImage; id: string }[];
}) {
  const option: EmblaOptionsType = {
    loop: true,
    watchDrag: false,
  };
  const [emblaRefBackward] = useEmblaCarousel(option, [
    AutoScroll({ playOnInit: true, speed: 1, direction: "backward" }),
  ]);
  const [emblaRefForward] = useEmblaCarousel(option, [
    AutoScroll({ playOnInit: true, speed: 1, direction: "forward" }),
  ]);

  // workImages の配列数を10個にする関数。10個未満の場合、足りない数だけ NoImage.ogp を追加後、順番をランダム化。10個以上の場合はランダムに10個選択にする。
  const getRandomizedWorkImages = (
    images: { image: MicroCMSImage; id: string }[],
  ): { image: MicroCMSImage; id: string }[] => {
    let randomizedImages: { image: MicroCMSImage; id: string }[] = [];
    if (images.length < 10) {
      for (let i = 0; i < 10 - images.length; i++) {
        randomizedImages.push(
          Object.assign({
            image: NoImage.ogpDcLogo,
            id: "",
          }),
        );
      }
      randomizedImages.push(...images);
      randomizedImages = randomizedImages.sort(() => Math.random() - 0.5);
    } else {
      randomizedImages = images
        .sort(() => Math.random() - 0.5)
        .slice(0, 10)
        .map((work) => work);
    }
    return randomizedImages;
  };

  const randomizedWorkImages01 = getRandomizedWorkImages(workImages);
  const randomizedWorkImages02 = getRandomizedWorkImages(workImages);

  return (
    <>
      <div className="embla mt-4">
        <div className="embla__viewport h-48 w-full" ref={emblaRefBackward}>
          <div className="embla__container mx-2 h-48 w-[210rem]">
            {[...Array(3)].map((_, i) => {
              return (
                <div className="embla__slide flex h-48 w-full" key={i}>
                  {randomizedWorkImages01.map((img) => {
                    return (
                      <Link
                        href={img.id ? `/works/${img.id}` : "/works/list/1"}
                        key={img.id}
                        className="mr-4 h-48 w-80 shrink-0 overflow-hidden rounded-lg"
                      >
                        <Image
                          src={setImageQuality(img.image.url, {
                            format: "webp",
                            quality: "50",
                            width: "500",
                          })}
                          alt="作品紹介画像"
                          width={img.image.width}
                          height={img.image.height}
                          className="h-full w-full object-cover transition duration-500 hover:scale-110"
                        />
                      </Link>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="embla mt-4">
        <div className="embla__viewport h-48 w-full" ref={emblaRefForward}>
          <div className="embla__container mx-2 h-48 w-[210rem]">
            {[...Array(3)].map((_, i) => {
              return (
                <div className="embla__slide flex h-48 w-full" key={i}>
                  {randomizedWorkImages02.map((img) => {
                    return (
                      <Link
                        href={img.id ? `/works/${img.id}` : "/works/list/1"}
                        key={img.id}
                        className="mr-4 h-48 w-80 shrink-0 overflow-hidden rounded-lg"
                      >
                        <Image
                          src={setImageQuality(img.image.url, {
                            format: "webp",
                            quality: "50",
                            width: "500",
                          })}
                          alt="作品紹介画像"
                          width={img.image.width}
                          height={img.image.height}
                          className="h-full w-full object-cover transition duration-500 hover:scale-110"
                        />
                      </Link>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default TopGallery;
