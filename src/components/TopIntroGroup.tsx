"use client";

import type { MicroCMSImage } from "@/types/microcms/microcms-schema";
import { EmblaOptionsType } from "embla-carousel";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";
import Image from "next/image";
import { useEffect } from "react";

function TopIntroGroup({
  heading,
  image,
  children,
}: {
  heading: string;
  image: MicroCMSImage[];
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
    <div className="relative h-96 w-96 rounded-sm bg-gray-100">
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
      <div className="absolute z-10 h-96 w-96 p-8">
        <h3 className="text-4xl font-bold">{heading}</h3>
        <div className="mt-4 text-base">{children}</div>
      </div>

      <div className="absolute bottom-0 z-50 m-8">
        <div className="embla">
          <div className="embla__viewport" ref={emblaRef}>
            <div className="embla__container">
              {image.map((img) => {
                return (
                  <div className="embla__slide" key={img.url}>
                    <Image
                      src={img.url}
                      alt="班紹介画像"
                      width={img.width ? img.width : 320}
                      height={img.height ? img.height : 192}
                      className="h-48 w-80 rounded-sm object-cover"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopIntroGroup;
