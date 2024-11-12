import Heading from "@/components/Heading";
import Pagination from "@/components/Pagination";
import PostOutline from "@/components/PostOutline";
import type { Config } from "@/types/microcms/config";
import type { Post } from "@/types/microcms/post";
import { NoImage } from "@/utils/microcms/NoImage";
import type { MicroCMSListResponse } from "microcms-js-sdk";

function PostList({
  config,
  posts,
  postsPaginated,
  currentPage,
  categoryId,
}: {
  config: Config;
  posts: MicroCMSListResponse<Post>;
  postsPaginated: {
    posts: MicroCMSListResponse<Post>;
    pager: number[];
  };
  currentPage: number;
  categoryId?: string;
}) {
  return (
    <div className="bg-zinc-100 pb-16 pt-32">
      <div className="mx-auto w-fit rounded bg-white px-12 pb-12 pt-10">
        <Heading heading="Articles" subheading="記事一覧"></Heading>
        <div className="mb-12 mt-5 flex justify-center">
          <Pagination
            categoryId={categoryId ?? ""}
            pager={postsPaginated.pager}
            currentPage={currentPage}
            maxDisplay={3}
          />
        </div>
        <div>
          {
            // posts を map して表示
            posts.contents.map((post, i) => {
              return (
                <>
                  <PostOutline
                    linkHref={`/post/${encodeURIComponent(post.id)}`}
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
        <div className="mt-12 flex justify-center">
          <Pagination
            categoryId={categoryId ?? ""}
            pager={postsPaginated.pager}
            currentPage={currentPage}
            maxDisplay={3}
          />
        </div>
      </div>
    </div>
  );
}

export default PostList;
