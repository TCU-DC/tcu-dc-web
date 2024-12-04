import Top from "@/components/Top";
import type { Config } from "@/types/microcms/config";
import type { Post } from "@/types/microcms/post";
import { getConfig, getPosts } from "@/utils/microcms/getContents";
import type { MicroCMSListResponse } from "microcms-js-sdk";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const dynamicParams = false;

export async function generateMetadata(): Promise<Metadata> {
  const config: Config = await getConfig();

  const ogp = config.topOgp?.url ?? "/ogp.png";
  return {
    description: config.description,
    openGraph: {
      images: [ogp],
    },
  };
}

export default async function Page() {
  const NEWS_LIMIT = 2; // トップページに表示する記事の数

  const config: Config = await getConfig().catch(() => notFound());
  const posts: MicroCMSListResponse<Post> = await getPosts({
    limit: NEWS_LIMIT,
  }).catch(() => notFound());
  return <Top config={config} posts={posts}></Top>;
}
