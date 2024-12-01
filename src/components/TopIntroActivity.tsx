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
          <h3 className="text-4xl font-bold">{heading}</h3>
          <div className="prose md:ml-4 md:mt-4">{children}</div>
        </div>
        <Image
          src={image.url}
          alt="活動紹介画像"
          width={image.width ? image.width : 320}
          height={image.height ? image.height : 192}
          className="h-80 w-full rounded-sm object-cover md:ml-8 md:w-80"
        />
      </div>
    </div>
  );
}

export default TopIntroActivity;
