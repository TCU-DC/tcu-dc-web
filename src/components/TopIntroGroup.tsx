"use client";

import type { MicroCMSImage } from "@/types/microcms/microcms-schema";
import { setImageQuality } from "@/utils/microcms/setImageQuality";
import { EmblaOptionsType } from "embla-carousel";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";
import Image from "next/image";

function TopIntroGroup({
  heading,
  images,
  children,
}: {
  heading: string;
  images: MicroCMSImage[];
  children: React.ReactNode;
}) {
  const options: EmblaOptionsType = { loop: true };
  const [emblaRef] = useEmblaCarousel(options, [
    Autoplay(),
    WheelGesturesPlugin(),
  ]);

  return (
    <div className="relative rounded-sm bg-zinc-100 md:h-96 md:w-[720px] lg:w-96">
      <div className="absolute z-0 h-12 w-12">
        <svg
          className="h-full w-full rounded-tl-sm"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0 0H48L0 48V0Z" fill="url(#paint0_linear_270_428)" />
          <defs>
            <linearGradient
              id="paint0_linear_270_428"
              x1="0"
              y1="0"
              x2="48"
              y2="0"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#05C0FF" />
              <stop offset="1" stop-color="#0070D9" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div className="flex flex-col p-8 md:flex-row lg:p-0">
        <div className="mr-8 flex flex-col justify-normal pb-6 md:h-80 md:max-w-80 md:justify-center lg:absolute lg:z-10 lg:h-96 lg:w-96 lg:max-w-96 lg:justify-normal lg:p-8">
          <h3 className="text-3xl font-bold sm:text-4xl">{heading}</h3>
          <div className="mt-4">{children}</div>
        </div>
        <div className="h-[calc((100vw-5rem)/1.618)] w-full sm:h-[calc((100vw-7rem)/1.618)] md:absolute md:bottom-0 md:right-0 md:z-50 md:m-8 md:h-80 md:w-80 lg:h-48 lg:w-80">
          <div className="embla h-full w-full">
            <div className="embla__viewport h-full w-full" ref={emblaRef}>
              <div className="embla__container h-full w-full">
                {images.map((img) => {
                  return (
                    <div className="embla__slide h-full w-full" key={img.url}>
                      <Image
                        src={setImageQuality(img.url, {
                          format: "webp",
                          quality: "30",
                          width: "480",
                        })}
                        alt="班紹介画像"
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
        </div>
      </div>
    </div>
  );
}

export default TopIntroGroup;
