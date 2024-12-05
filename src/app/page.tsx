import Top from "@/components/Top";
import type { Config } from "@/types/microcms/config";
import type { Post } from "@/types/microcms/post";
import type { Work } from "@/types/microcms/work";
import { getConfig, getPosts, getWorks } from "@/utils/microcms/getContents";
import type { MicroCMSListResponse } from "microcms-js-sdk";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const dynamicParams = false;

export async function generateMetadata(): Promise<Metadata> {
  const config: Config = await getConfig();

  const ogp = config.topOgp?.url ?? config.ogpDefault.url;
  return {
    description: config.description,
    openGraph: {
      images: [ogp],
    },
  };
}

export default async function Page() {
  const NEWS_LIMIT = 2; // トップページに表示する記事の数
  const WORKS_LIMIT = 10; // トップページに表示する作品の数

  const config: Config = await getConfig().catch(() => notFound());
  const posts: MicroCMSListResponse<Post> = await getPosts({
    limit: NEWS_LIMIT,
  }).catch(() => notFound());
  const works: MicroCMSListResponse<Work> = await getWorks({
    limit: WORKS_LIMIT,
  }).catch(() => notFound());
  return <Top config={config} posts={posts} works={works}></Top>;
}
