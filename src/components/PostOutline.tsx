import PostCategory from "@/components/PostCategory";
import type { MicroCMSImage } from "@/types/microcms/microcms-schema";
import type { PostCategory as PostCategoryType } from "@/types/microcms/post_category";
import { formatDateToJST } from "@/utils/dateFormatter";
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
  category?: PostCategoryType & MicroCMSContentId;
}) {
  return (
    <Link
      href={linkHref}
      className="flex transition duration-500 hover:opacity-50 lg:w-[752px]"
    >
      <Image
        className="h-28 w-28 shrink-0 rounded-sm object-cover md:w-52"
        src={image.url}
        alt="OGP"
        width={image.width ? image.width : 208}
        height={image.height ? image.height : 112}
      />
      <div
        className={`lg:w-[calc(752px - 13rem)] flex h-28 flex-col justify-center pl-4`}
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
            <div className="w-20 sm:w-fit">
              <PostCategory>
                {(category && category.name) ?? "カテゴリなし"}
              </PostCategory>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default PostOutline;
