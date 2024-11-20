import PostComponent from "@/components/Post";
import type { Config } from "@/types/microcms/config";
import type { Post as PostType } from "@/types/microcms/post";
import { generateOGP } from "@/utils/microcms/generateOGP";
import {
  getConfig,
  getPost,
  getPostIds,
  getPosts,
} from "@/utils/microcms/getContents";
import type {
  MicroCMSContentId,
  MicroCMSDate,
  MicroCMSListResponse,
} from "microcms-js-sdk";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const dynamicParams = false;

export async function generateStaticParams() {
  const postIds: string[] = await getPostIds();

  return postIds.map((id) => ({
    slug: id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post: PostType & MicroCMSContentId & MicroCMSDate = await getPost()(
    params.slug,
  ).catch(() => notFound());
  const config: Config = await getConfig().catch(() => notFound());

  const ogp = post.image?.url ?? generateOGP(config.ogp.url, post.title);
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      images: [ogp],
    },
    robots: {
      index: !post.noindex,
    },
  };
}

export default async function Post({ params }: { params: { slug: string } }) {
  const NEWS_LIMIT = 2; // 表示する記事一覧の数

  const config: Config = await getConfig();
  const post: PostType & MicroCMSContentId & MicroCMSDate = await getPost()(
    params.slug,
  ).catch(() => notFound());
  const posts: MicroCMSListResponse<PostType> = await getPosts({
    limit: NEWS_LIMIT,
  }).catch(() => notFound());

  return <PostComponent config={config} post={post} posts={posts} />;
}
