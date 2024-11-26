import Heading from "@/components/Heading";
import LinkButton from "@/components/LinkButton";
import PostCategory from "@/components/PostCategory";
import PostOutline from "@/components/PostOutline";
import type { Config } from "@/types/microcms/config";
import type { Post } from "@/types/microcms/post";
import { formatDateToJST } from "@/utils/dateFormatter";
import { generateOGP } from "@/utils/microcms/generateOGP";
import { NoImage } from "@/utils/microcms/NoImage";
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
    <div className="bg-zinc-100 pb-16 pt-8 md:pt-20 lg:pt-32">
      <div className="mx-8 rounded bg-white p-8 sm:p-16 md:mx-20 md:p-20 lg:mx-auto lg:w-[848px]">
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
            <PostCategory>
              {(post.category && post.category.name) ?? "カテゴリなし"}
            </PostCategory>
          </Link>
        </div>
        <div className="pt-4">
          {post.image ? (
            // OGP がある場合は、OGP を表示
            <Image
              className="h-[calc(752px/1.91)] rounded-sm object-cover"
              src={post.image?.url ?? ""}
              alt="OGP"
              width={post.image?.width}
              height={post.image?.height}
            />
          ) : (
            // OGP がない場合は、記事タイトルから生成
            <Image
              src={generateOGP(config.ogp.url, post.title)}
              alt="OGP"
              width={config.ogp.width}
              height={config.ogp.height}
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
      <div className="mx-8 mt-8 h-fit rounded-md bg-white px-8 pb-12 pt-10 sm:px-12 md:mx-20 lg:mx-auto lg:w-fit">
        <Heading heading="News" subheading="お知らせ" level="h2"></Heading>
        <div className="py-5">
          {
            // posts を map して表示
            posts.contents.map((post, i) => {
              return (
                <>
                  <PostOutline
                    linkHref={`/posts/${encodeURIComponent(post.id)}`}
                    image={
                      post.image
                        ? post.image
                        : NoImage.ogp(config.ogp, post.title ?? "")
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
            })
          }
        </div>
        <div className="flex flex-row-reverse">
          <LinkButton href="/posts/list/1">もっとみる</LinkButton>
        </div>
      </div>
    </div>
  );
}

export default Post;
