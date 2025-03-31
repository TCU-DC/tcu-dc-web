import WorkComponent from "@/components/Work";
import type { Config } from "@/types/microcms/config";
import type { Work as WorkType } from "@/types/microcms/work";
import {
  getAllWorkIds,
  getConfig,
  getWork,
} from "@/utils/microcms/getContents";
import type { MicroCMSContentId, MicroCMSDate } from "microcms-js-sdk";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const dynamicParams = false;

export async function generateStaticParams() {
  const workIds: string[] = await getAllWorkIds();

  return workIds.map((id) => ({
    slug: id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const work: WorkType & MicroCMSContentId & MicroCMSDate = await getWork(
    params.slug,
  ).catch(() => notFound());
  const config: Config = await getConfig().catch(() => notFound());

  const ogp = work.images
    ? (work.images[0]?.url ?? config.ogpDefault.url)
    : config.ogpDefault.url;
  return {
    title: work.title,
    description: work.description,
    openGraph: {
      images: [ogp],
    },
    robots: {
      index: !work.noindex,
    },
  };
}

export default async function Post({ params }: { params: { slug: string } }) {
  const post: WorkType & MicroCMSContentId & MicroCMSDate = await getWork(
    params.slug,
  ).catch(() => notFound());

  return <WorkComponent work={post} />;
}
