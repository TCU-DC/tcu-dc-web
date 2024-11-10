import type { MicroCMSImage } from "@/types/microcms/microcms-schema";
import Image from "next/image";

function TopIntroActivity({
  heading,
  image,
  children,
}: {
  heading: string;
  image: MicroCMSImage;
  children: React.ReactNode;
}) {
  return (
    <div className="relative w-fit rounded-sm bg-white">
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
      <div className="m-8 flex w-[784px]">
        <div>
          <h3 className="text-4xl font-bold">{heading}</h3>
          <div className="prose ml-4 mt-4">{children}</div>
        </div>
        <Image
          src={image.url}
          alt="活動紹介画像"
          width={image.width ? image.width : 320}
          height={image.height ? image.height : 192}
          className="ml-8 h-80 w-80 rounded-sm object-cover"
        />
      </div>
    </div>
  );
}

export default TopIntroActivity;
