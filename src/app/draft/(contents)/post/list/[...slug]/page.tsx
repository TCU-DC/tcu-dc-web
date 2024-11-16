export const runtime = "edge";

import PostList from "@/components/PostList";
import type { Config } from "@/types/microcms/config";
import type { Post } from "@/types/microcms/post";
import { getConfig, getPostsPaginated } from "@/utils/microcms/getContents";
import type { MicroCMSListResponse } from "microcms-js-sdk";
import { cookies, draftMode } from "next/headers";
import { redirect } from "next/navigation";

// SSG のため、1ページあたりの表示件数は固定とする
const FIRST_PAGE: number = 1;
const PER_PAGE: number = 10;

export default async function Page({ params }: { params: { slug: string[] } }) {
  // params から ページ番号を取得。params.slug[1] に 値がない場合 params.slug[0] がページ番号
  const currentPage = Number(params.slug[1] ?? params.slug[0]);
  // params から カテゴリIDを取得。params.slug[1] に 値がある場合 params.slug[0] がカテゴリID。ない場合は undefined
  const categoryId = params.slug[1] ? params.slug[0] : undefined;

  const REDIRECT_PATH = `/post/list/${categoryId ? `${categoryId}/` : ""}${currentPage}`; // ドラフトモードが無効の場合のリダイレクト先

  const { isEnabled } = draftMode();
  const currentCookies = cookies();
  const draftKey = currentCookies.get("draftKey")?.value;

  // ドラフトモードではないか、ドラフトキーが存在しない場合、通常のページにリダイレクト
  if (!isEnabled || !draftKey) {
    return redirect(REDIRECT_PATH);
  }

  const postsPaginated: {
    posts: MicroCMSListResponse<Post>;
    pager: number[];
  } = await getPostsPaginated(
    currentPage,
    PER_PAGE,
    categoryId,
    draftKey,
  ).catch(() => redirect(REDIRECT_PATH));
  const posts: MicroCMSListResponse<Post> = postsPaginated.posts;
  const config: Config = await getConfig({ draftKey: draftKey }).catch(() =>
    redirect(REDIRECT_PATH),
  );

  // const pager: number[] = postsPaginated.pager;
  return (
    <PostList
      config={config}
      posts={posts}
      postsPaginated={postsPaginated}
      currentPage={currentPage}
      categoryId={categoryId}
    ></PostList>
  );
}
