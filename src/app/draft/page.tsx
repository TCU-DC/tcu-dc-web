export const runtime = "edge";

import Top from "@/components/Top";
import type { Config } from "@/types/microcms/config";
import type { Post } from "@/types/microcms/post";
import type { Work } from "@/types/microcms/work";
import { getConfig, getPosts, getWorks } from "@/utils/microcms/getContents";
import type { MicroCMSListResponse } from "microcms-js-sdk";
import type { Metadata } from "next";
import { cookies, draftMode } from "next/headers";
import { redirect } from "next/navigation";

export async function generateMetadata(): Promise<Metadata> {
  const config: Config = await getConfig();
  return {
    description: config.description,
  };
}

export default async function Page() {
  const REDIRECT_PATH = "/"; // ドラフトモードが無効の場合のリダイレクト先
  const NEWS_LIMIT = 2; // トップページに表示する記事の数
  const WORKS_LIMIT = 10; // トップページに表示する作品の数

  const { isEnabled } = draftMode();
  const currentCookies = cookies();
  const draftKey = currentCookies.get("draftKey")?.value;

  // ドラフトモードではないか、ドラフトキーが存在しない場合、通常のページにリダイレクト
  if (!isEnabled || !draftKey) {
    return redirect(REDIRECT_PATH);
  }

  const config: Config = await getConfig({ draftKey: draftKey }).catch(() =>
    redirect(REDIRECT_PATH),
  );
  const posts: MicroCMSListResponse<Post> = await getPosts({
    draftKey: draftKey,
    limit: NEWS_LIMIT,
  }).catch(() => redirect(REDIRECT_PATH));
  const works: MicroCMSListResponse<Work> = await getWorks({
    draftKey: draftKey,
    limit: WORKS_LIMIT,
  }).catch(() => redirect(REDIRECT_PATH));
  return <Top config={config} posts={posts} works={works}></Top>;
}
