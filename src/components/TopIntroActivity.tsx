"use client";

import type { MicroCMSImage } from "@/types/microcms/microcms-schema";
import { EmblaOptionsType } from "embla-carousel";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";
import Image from "next/image";
import { useEffect } from "react";

function TopIntroActivity({
  heading,
  images,
  children,
}: {
  heading: string;
  images: MicroCMSImage[];
  children: React.ReactNode;
}) {
  const options: EmblaOptionsType = { loop: true };
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    Autoplay(),
    WheelGesturesPlugin(),
  ]);
  useEffect(() => {
    if (emblaApi) {
      console.log(emblaApi.slideNodes());
    }
  }, [emblaApi]);
  return (
    <div className="relative w-full rounded-sm bg-white md:w-fit">
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
      <div className="flex w-full flex-col p-8 md:w-[720px] md:flex-row lg:w-[800px] xl:w-[848px]">
        <div>
          <h3 className="text-3xl font-bold sm:text-4xl">{heading}</h3>
          <div className="prose md:ml-4 md:mt-4">{children}</div>
        </div>
        <div className="h-[calc((100vw-5rem)/1.6)] w-full shrink-0 rounded-sm object-cover sm:h-[calc((100vw-7rem)/1.6)] md:ml-8 md:h-80 md:w-80">
          <div className="embla h-full w-full">
            <div className="embla__viewport h-full w-full" ref={emblaRef}>
              <div className="embla__container h-full w-full">
                {images.map((img) => {
                  return (
                    <div className="embla__slide h-full w-full" key={img.url}>
                      <Image
                        src={img.url}
                        alt="活動紹介画像"
                        width={img.width ? img.width : 320}
                        height={img.height ? img.height : 192}
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

export default TopIntroActivity;
