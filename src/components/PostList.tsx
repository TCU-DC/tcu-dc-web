import CategoryTag from "@/components/CategoryTag";
import Heading from "@/components/Heading";
import Pagination from "@/components/Pagination";
import PostOutline from "@/components/PostOutline";
import type { Config } from "@/types/microcms/config";
import type { Post } from "@/types/microcms/post";
import type { PostCategory as PostCategoty } from "@/types/microcms/post_category";
import { NoImage } from "@/utils/microcms/NoImage";
import type { MicroCMSContentId, MicroCMSListResponse } from "microcms-js-sdk";

function PostList({
  config,
  posts,
  postsPaginated,
  postCountsByCategory,
  currentPage,
  categoryId,
}: {
  config: Config;
  posts: MicroCMSListResponse<Post>;
  postsPaginated: {
    posts: MicroCMSListResponse<Post>;
    pager: number[];
  };
  postCountsByCategory: {
    category: PostCategoty & MicroCMSContentId;
    count: number;
  }[];
  currentPage: number;
  categoryId?: string;
}) {
  const postCategoryLink = (c: {
    category: PostCategoty & MicroCMSContentId;
    count: number;
  }) => {
    if (c.category.id === categoryId || (!c.category.id && !categoryId)) {
      return (
        <CategoryTag theme="black">
          {c.category.name}: {c.count}
        </CategoryTag>
      );
    } else {
      return (
        <CategoryTag
          theme="gray"
          linkHref={`/posts/list/${c.category.id ? `${c.category.id}/` : ""}1`}
        >
          {c.category.name}: {c.count}
        </CategoryTag>
      );
    }
  };

  return (
    <div className="bg-zinc-100 py-8 md:pb-16 md:pt-20 lg:pt-32">
      <div className="mx-2 rounded bg-white px-4 py-8 sm:mx-8 sm:p-8 sm:px-12 sm:pb-12 sm:pt-10 md:mx-20 lg:mx-auto lg:w-fit">
        <Heading heading="Articles" subheading="記事一覧"></Heading>
        <div className="mt-5"></div>
        <div className="flex flex-wrap gap-2">
          {postCategoryLink({
            category: { id: "", name: "All" },
            count: postCountsByCategory
              .map((c) => c.count)
              .reduce((a, b) => a + b),
          })}
          {postCountsByCategory
            .sort((a, b) => b.count - a.count)
            .map((category) => {
              return category.count > 0 ? postCategoryLink(category) : null;
            })}
        </div>
        <div className="mb-12 mt-5 flex justify-center">
          <Pagination
            hrefBase={`/posts/list/${categoryId ? `${categoryId}/` : ""}`}
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
        <div className="mt-12 flex justify-center">
          <Pagination
            hrefBase={`/posts/list/${categoryId ? `${categoryId}/` : ""}`}
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
