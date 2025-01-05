export const runtime = "edge";

import PostComponent from "@/components/Post";
import type { Config } from "@/types/microcms/config";
import type { Post as PostType } from "@/types/microcms/post";
import { getConfig, getPost, getPosts } from "@/utils/microcms/getContents";
import type {
  MicroCMSContentId,
  MicroCMSDate,
  MicroCMSListResponse,
} from "microcms-js-sdk";
import { cookies, draftMode } from "next/headers";
import { redirect } from "next/navigation";

export const dynamicParams = true;

export default async function Post({ params }: { params: { slug: string } }) {
  const REDIRECT_PATH = `/posts/${params.slug}`; // ドラフトモードが無効の場合のリダイレクト先
  const NEWS_LIMIT = 2; // 表示する記事一覧の数

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
  const post: PostType & MicroCMSContentId & MicroCMSDate = await getPost(
    params.slug,
    {
      draftKey: draftKey,
    },
  ).catch(() => redirect(REDIRECT_PATH));
  const posts: MicroCMSListResponse<PostType> = await getPosts({
    draftKey: draftKey,
    limit: NEWS_LIMIT,
  }).catch(() => redirect(REDIRECT_PATH));

  return <PostComponent config={config} post={post} posts={posts} />;
}
