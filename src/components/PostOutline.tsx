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
      className="flex w-[752px] transition duration-500 hover:opacity-50"
    >
      <Image
        className="h-28 w-52 rounded-sm object-cover"
        src={image.url}
        alt="OGP"
        width={image.width ? image.width : 208}
        height={image.height ? image.height : 112}
      />
      <div className={`w-[calc(752px - 13rem)] h-28 pl-5`}>
        <h4
          // 524px = 752px - (13rem + 1.25rem)
          className={`mt-1 w-[524px] truncate text-xl font-bold`}
        >
          {headline}
        </h4>
        <p className="mt-2 text-base tracking-wide">
          {date ? formatDateToJST(date, "YYYY/MM/DD") : "0000/00/00"}
        </p>
        <PostCategory>
          {(category && category.name) ?? "カテゴリなし"}
        </PostCategory>
      </div>
    </Link>
  );
}

export default PostOutline;
