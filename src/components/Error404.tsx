"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import LinkButton from "@/components/LinkButton";
import type { Config } from "@/types/microcms/config";
import type { Work } from "@/types/microcms/work";
import { NoImage } from "@/utils/microcms/NoImage";
import { setImageQuality } from "@/utils/microcms/setImageQuality";
import { EmblaOptionsType } from "embla-carousel";
import AutoHeight from "embla-carousel-auto-height";
import useEmblaCarousel from "embla-carousel-react";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";
import type {
  MicroCMSContentId,
  MicroCMSDate,
  MicroCMSListResponse,
} from "microcms-js-sdk";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

function Error404({
  config,
  works,
}: {
  config: Config;
  works: MicroCMSListResponse<Work>;
}) {
  // worksの中からランダムで一つの作品を取得
  const [work, setWork] = useState<
    (Work & MicroCMSContentId & MicroCMSDate) | null
  >(null);
  useEffect(() => {
    if (works.contents.length > 0) {
      const randomIndex = Math.floor(Math.random() * works.contents.length);
      setWork(works.contents[randomIndex]);
    }
  }, [works]);

  // Embla Carouselの設定
  const options: EmblaOptionsType = { loop: true };
  const [emblaRef] = useEmblaCarousel(options, [
    WheelGesturesPlugin(),
    AutoHeight(),
  ]);

  return (
    <>
      <Header config={config}></Header>
      <div className="bg-zinc-100 px-6 py-16">
        <div className="prose !max-w-none text-center">
          <h1>ページが見つかりません</h1>
          <p>お探しのページが見つかりませんでした。</p>
          <p>
            URLが間違っているか、ページが移動または削除された可能性があります。
          </p>
        </div>
      </div>
      <div className="w-full">
        <div className="mx-6 py-16 sm:mx-auto sm:w-[65ch]">
          {work ? (
            <>
              <div className="w-full">
                {work.images ? (
                  // 紹介画像がある場合は、紹介画像を表示
                  <Link href={`/works/${encodeURIComponent(work.id)}`}>
                    <div className="embla h-full w-full rounded-sm shadow-sm ring ring-slate-100">
                      <div
                        className="embla__viewport h-full w-full"
                        ref={emblaRef}
                      >
                        <div className="embla__container h-full w-full">
                          {work.images.map((img) => {
                            return (
                              <div
                                className="embla__slide h-full w-full"
                                key={img.url}
                              >
                                <Image
                                  src={setImageQuality(img.url, {
                                    format: "webp",
                                    quality: "30",
                                    width: "960",
                                  })}
                                  alt="紹介画像"
                                  width={img.width}
                                  height={img.height}
                                  className="h-full w-full rounded-sm object-cover"
                                />
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </Link>
                ) : (
                  // 紹介画像がない場合は、画像なし
                  <Image
                    className="h-full w-full rounded-sm object-cover"
                    src={NoImage.gray.url}
                    alt="No Image"
                    width={NoImage.gray.width}
                    height={NoImage.gray.height}
                  />
                )}
              </div>
              <div className="mt-4 text-center">
                <h3 className="text-lg font-bold">
                  <Link href={`/works/${encodeURIComponent(work.id)}`}>
                    {work?.title ?? ""}
                  </Link>
                </h3>
                <Link
                  href={`/works/${encodeURIComponent(work.id)}`}
                  className="text-zinc-500"
                >{`${work?.author.map((a) => a.name).join(", ")}`}</Link>
              </div>
            </>
          ) : (
            <div className="flex h-96 w-full items-center justify-center">
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
            </div>
          )}
          <div className="flex justify-center pt-16">
            <LinkButton href="/">トップへ戻る</LinkButton>
          </div>
        </div>
      </div>
      <Footer {...config}></Footer>
    </>
  );
}

export default Error404;
