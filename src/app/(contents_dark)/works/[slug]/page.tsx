import WorkComponent from "@/components/Work";
import type { Work as WorkType } from "@/types/microcms/work";
import { getAllWorkIds, getWork } from "@/utils/microcms/getContents";
import { NoImage } from "@/utils/microcms/NoImage";
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

  const ogp = work.images
    ? (work.images[0]?.url ?? NoImage.ogpDcLogo.url)
    : NoImage.ogpDcLogo.url;
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
