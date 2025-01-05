"use client";

import CategoryTag from "@/components/CategoryTag";
import Heading from "@/components/Heading";
import LinkButton from "@/components/LinkButton";
import type { Work } from "@/types/microcms/work";
import { NoImage } from "@/utils/microcms/NoImage";
import { setImageQuality } from "@/utils/microcms/setImageQuality";
import { EmblaOptionsType } from "embla-carousel";
import AutoHeight from "embla-carousel-auto-height";
import useEmblaCarousel from "embla-carousel-react";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";
import type { MicroCMSContentId, MicroCMSDate } from "microcms-js-sdk";
import Image from "next/image";
import Link from "next/link";

function Work({ work }: { work: Work & MicroCMSContentId & MicroCMSDate }) {
  const options: EmblaOptionsType = { loop: true };
  const [emblaRef] = useEmblaCarousel(options, [
    WheelGesturesPlugin(),
    AutoHeight(),
  ]);
  return (
    <div className="w-full bg-zinc-900 py-8 text-zinc-200 md:pb-16 md:pt-20 lg:pt-32">
      <div className="mx-2 rounded bg-black px-4 py-8 sm:mx-8 sm:p-8 md:mx-20 md:p-20 lg:mx-auto lg:w-[848px]">
        <Heading
          heading={work.title ?? ""}
          subheading={`作者: ${work.author.map((a) => a.name).join(", ")}`}
          level="h1"
          borderColor="white"
        ></Heading>
        <div className="pt-3">
          <Link
            href={`/works/list/${work.group?.id ? `${work.group?.id}/1` : "1"}`}
            className="transition duration-500 hover:opacity-50"
          >
            <CategoryTag theme="gray">
              {(work.group && work.group.name) ?? "班なし"}
            </CategoryTag>
          </Link>
        </div>
        <div className="mt-4 w-full">
          {work.images ? (
            // 紹介画像 がある場合は、紹介画像 を表示
            <>
              <div className="embla h-full w-full">
                <div className="embla__viewport h-full w-full" ref={emblaRef}>
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
            </>
          ) : (
            // 紹介画像 がない場合は、画像なし
            <Image
              className="h-full w-full rounded-sm object-cover"
              src={NoImage.gray.url}
              alt="No Image"
              width={NoImage.gray.width}
              height={NoImage.gray.width}
            />
          )}
        </div>
        <div className="flex justify-center p-10">
          <span className="flex w-full border-b border-zinc-600"></span>
        </div>

        <article
          className="prose prose-invert !max-w-none"
          dangerouslySetInnerHTML={{ __html: work.body ?? "" }}
        ></article>

        <div className="flex justify-center p-10">
          <span className="flex w-full border-b border-zinc-600"></span>
        </div>
        <div className="flex flex-row-reverse">
          <LinkButton href="/works/list/1" theme="gray">
            作品一覧へ
          </LinkButton>
        </div>
      </div>
    </div>
  );
}

export default Work;
