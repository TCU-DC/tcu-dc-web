import CategoryTag from "@/components/CategoryTag";
import type { MicroCMSImage } from "@/types/microcms/microcms-schema";
import type { PostCategory } from "@/types/microcms/post_category";
import { formatDateToJST } from "@/utils/dateFormatter";
import { setImageQuality } from "@/utils/microcms/setImageQuality";
import type { MicroCMSContentId } from "microcms-js-sdk";
import Image from "next/image";
import Link from "next/link";

function PostOutline({
  linkHref,
  image,
  headline,
  date,
  category,
}: {
  linkHref: string;
  image: MicroCMSImage;
  headline: string;
  date?: string;
  category?: PostCategory & MicroCMSContentId;
}) {
  // image.url のクエリに "blend-mode" が含まれている場合のif文
  let imageUrl;
  if (image.url.includes("blend-mode")) {
    imageUrl = setImageQuality(image.url, {
      format: "webp",
      quality: "0",
    });
  } else {
    imageUrl = setImageQuality(image.url, {
      format: "webp",
      quality: "30",
      width: "480",
    });
  }
  return (
    <Link
      href={linkHref}
      className="flex transition duration-500 hover:opacity-50 lg:w-[752px]"
    >
      <Image
        className="h-24 w-24 shrink-0 rounded-sm object-cover sm:h-28 sm:w-28 md:w-52"
        src={imageUrl}
        alt="OGP"
        width={image.width}
        height={image.height}
      />
      <div
        className={`lg:w-[calc(752px - 13rem)] flex h-24 flex-col justify-center pl-4 sm:h-28`}
      >
        <h4
          // 524px = 752px - (13rem + 1.25rem)
          className={`line-clamp-2 whitespace-pre-wrap break-words text-lg font-bold sm:text-xl lg:mt-1 lg:line-clamp-1 lg:w-[524px]`}
        >
          {headline}
        </h4>
        <div className="w-fit">
          <div className="ml-0 flex flex-row-reverse items-center gap-2 sm:items-start lg:flex-col lg:gap-0">
            <p className="mt-2 text-sm tracking-wide sm:text-base">
              {date ? formatDateToJST(date, "YYYY/MM/DD") : "0000/00/00"}
            </p>
            <div className="max-w-20 sm:max-w-fit">
              <CategoryTag>
                {(category && category.name) ?? "カテゴリなし"}
              </CategoryTag>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default PostOutline;
