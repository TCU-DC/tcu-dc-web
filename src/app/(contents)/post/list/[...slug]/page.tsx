import Pagination from "@/components/Pagination";
import type { Post } from "@/types/microcms/post";
import {
  getPostCategoryIds,
  getPostsPaginated,
} from "@/utils/microcms/getContents";
import type { MicroCMSListResponse } from "microcms-js-sdk";
import type { Metadata } from "next";
import Link from "next/link";

// SSG のため、1ページあたりの表示件数は固定とする
const FIRST_PAGE: number = 1;
const PER_PAGE: number = 10;

export async function generateStaticParams() {
  const slug: string[][] = [];
  // 全ページのページ番号のスラッグを追加（/list/[ページ数]）
  const postsPaginated: {
    posts: MicroCMSListResponse<Post>;
    pager: number[];
  } = await getPostsPaginated(FIRST_PAGE, PER_PAGE);
  postsPaginated.pager.forEach((page) => {
    slug.push([page.toString(), ""] as string[]);
  });
  // 全カテゴリIDを取得
  const postCategoryIds: string[] = await getPostCategoryIds();
  // カテゴリIDとページ番号を組み合わせてスラッグを生成（/list/[カテゴリID]/[ページ数]）
  for (const id of postCategoryIds) {
    const postsByCategoryPaginated: {
      posts: MicroCMSListResponse<Post>;
      pager: number[];
    } = await getPostsPaginated(FIRST_PAGE, PER_PAGE, id as string);
    postsByCategoryPaginated.pager.forEach((page) => {
      slug.push([id, page.toString()] as string[]);
    });
  }
  return slug.map((s) => ({
    slug: s,
  }));
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "記事一覧",
    description: "記事一覧です。",
  };
}

export default async function Page({ params }: { params: { slug: string[] } }) {
  // params から ページ番号を取得。params.slug[1] に 値がない場合 params.slug[0] がページ番号
  const currentPage = Number(params.slug[1] ?? params.slug[0]);
  // params から カテゴリIDを取得。params.slug[1] に 値がある場合 params.slug[0] がカテゴリID。ない場合は undefined
  const categoryId = params.slug[1] ? params.slug[0] : undefined;

  const postsPaginated: {
    posts: MicroCMSListResponse<Post>;
    pager: number[];
  } = await getPostsPaginated(currentPage, PER_PAGE, categoryId);
  const posts: MicroCMSListResponse<Post> = postsPaginated.posts;
  // const pager: number[] = postsPaginated.pager;
  return (
    <div>
      <div>
        {
          // posts を map して表示
          posts.contents.map((post) => {
            return (
              <Link key={post.id} href={`/post/${encodeURIComponent(post.id)}`}>
                <div>{post.title}</div>
                <div>{post.description}</div>
              </Link>
            );
          })
        }
      </div>
      <div>
        {
          // ページネーションを表示
          <Pagination
            categoryId={categoryId ?? ""}
            pager={postsPaginated.pager}
            currentPage={currentPage}
          />
        }
      </div>
    </div>
  );
}
