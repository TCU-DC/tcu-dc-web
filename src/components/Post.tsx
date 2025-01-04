import CategoryTag from "@/components/CategoryTag";
import Heading from "@/components/Heading";
import LinkButton from "@/components/LinkButton";
import PostOutline from "@/components/PostOutline";
import type { Config } from "@/types/microcms/config";
import type { Post } from "@/types/microcms/post";
import { formatDateToJST } from "@/utils/dateFormatter";
import { generateOGP } from "@/utils/microcms/generateOGP";
import { NoImage } from "@/utils/microcms/NoImage";
import { setImageQuality } from "@/utils/microcms/setImageQuality";
import type {
  MicroCMSContentId,
  MicroCMSDate,
  MicroCMSListResponse,
} from "microcms-js-sdk";
import Image from "next/image";
import Link from "next/link";

function Post({
  config,
  post,
  posts,
}: {
  config: Config;
  post: Post & MicroCMSContentId & MicroCMSDate;
  posts: MicroCMSListResponse<Post>;
}) {
  return (
    <div className="bg-zinc-100 py-8 md:pb-16 md:pt-20 lg:pt-32">
      <div className="mx-2 rounded bg-white px-4 py-8 sm:mx-8 sm:p-8 md:mx-20 md:p-20 lg:mx-auto lg:w-[848px]">
        <Heading
          heading={post.title ?? ""}
          subheading={
            (post.publishedAt &&
              formatDateToJST(post.publishedAt, "YYYY/MM/DD")) ??
            "0000/00/00"
          }
          level="h1"
        ></Heading>
        <div className="pt-3">
          <Link
            href={`/posts/list/${post.category?.id ? `${post.category?.id}/1` : "1"}`}
            className="transition duration-500 hover:opacity-50"
          >
            <CategoryTag>
              {(post.category && post.category.name) ?? "カテゴリなし"}
            </CategoryTag>
          </Link>
        </div>
        <div className="mt-4 h-[calc((100vw-3rem)/1.91)] w-full sm:h-[calc((100vw-8rem)/1.91)] md:h-[calc((100vw-20rem)/1.91)] lg:h-[calc((848px-10rem)/1.91)]">
          {post.image ? (
            // OGP がある場合は、OGP を表示
            <Image
              className="h-full w-full rounded-sm object-cover"
              src={setImageQuality(post.image.url, {
                format: "webp",
                quality: "50",
                width: "800",
              })}
              alt="OGP"
              width={post.image?.width}
              height={post.image?.height}
            />
          ) : (
            // OGP がない場合は、記事タイトルから生成
            <Image
              className="h-full w-full rounded-sm object-cover"
              src={setImageQuality(
                generateOGP(config.ogpDynGen.url, post.title),
                {
                  format: "webp",
                  quality: "50",
                },
              )}
              alt="OGP"
              width={config.ogpDynGen.width}
              height={config.ogpDynGen.height}
            />
          )}
        </div>
        <div className="flex justify-center p-10">
          <span className="flex w-full border-b border-zinc-200"></span>
        </div>

        <article
          className="prose !max-w-none"
          dangerouslySetInnerHTML={{ __html: post.body ?? "" }}
        ></article>

        <div className="flex justify-center p-10">
          <span className="flex w-full border-b border-zinc-200"></span>
        </div>
        <div className="flex flex-row-reverse">
          <LinkButton href="/posts/list/1">記事一覧へ</LinkButton>
        </div>
      </div>
      <div className="mx-2 mt-8 h-fit rounded-md bg-white px-4 py-8 sm:mx-8 sm:px-12 sm:py-10 md:mx-20 md:px-8 lg:mx-auto lg:w-[848px]">
        <Heading heading="News" subheading="お知らせ" level="h2"></Heading>
        <div className="py-5">
          {posts.contents.map((post, i) => {
            return (
              <>
                <PostOutline
                  linkHref={`/posts/${encodeURIComponent(post.id)}`}
                  image={
                    post.image
                      ? post.image
                      : NoImage.ogp(config.ogpDynGen, post.title ?? "")
                  }
                  headline={post.title ?? ""}
                  category={post.category}
                  date={post.publishedAt}
                ></PostOutline>
                {i !== posts.contents.length - 1 && (
                  // 最後の記事以外は区切り線を表示
                  <div className="flex justify-center px-10 py-2.5">
                    <span className="flex w-full border-b border-zinc-200"></span>
                  </div>
                )}
              </>
            );
          })}
        </div>
        <div className="flex flex-row-reverse">
          <LinkButton href="/posts/list/1">もっとみる</LinkButton>
        </div>
      </div>
    </div>
  );
}

export default Post;
