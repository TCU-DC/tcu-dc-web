import PostList from "@/components/PostList";
import type { Config } from "@/types/microcms/config";
import type { Post } from "@/types/microcms/post";
import { PostCategory } from "@/types/microcms/post_category";
import {
  getConfig,
  getPostCategories,
  getPostCategoryIds,
  getPostsPaginated,
} from "@/utils/microcms/getContents";
import type { MicroCMSListResponse } from "microcms-js-sdk";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

// SSG のため、1ページあたりの表示件数は固定とする
const FIRST_PAGE: number = 1;
const PER_PAGE: number = 10;

export const dynamicParams = false;

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
  } = await getPostsPaginated(currentPage, PER_PAGE, categoryId).catch(() =>
    notFound(),
  );
  const posts: MicroCMSListResponse<Post> = postsPaginated.posts;
  const config: Config = await getConfig().catch(() => notFound());
  const postCategories: MicroCMSListResponse<PostCategory> =
    await getPostCategories().catch(() => notFound());

  // const pager: number[] = postsPaginated.pager;
  return (
    <PostList
      config={config}
      posts={posts}
      postsPaginated={postsPaginated}
      postCategories={postCategories}
      currentPage={currentPage}
      categoryId={categoryId}
    ></PostList>
  );
}
