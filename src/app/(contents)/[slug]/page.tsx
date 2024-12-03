import PageComponent from "@/components/Page";
import type { Page as PageType } from "@/types/microcms/page";
import { getPage, getPageIds } from "@/utils/microcms/getContents";
import type { MicroCMSContentId, MicroCMSDate } from "microcms-js-sdk";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const dynamicParams = false;

export async function generateStaticParams() {
  const pageIds: string[] = await getPageIds();

  return pageIds.map((id) => ({
    slug: id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const page: PageType & MicroCMSContentId & MicroCMSDate = await getPage()(
    params.slug,
  ).catch(() => notFound());

  const ogp = page.ogp?.url ?? "/ogp.png";
  return {
    title: page.title,
    description: page.description,
    openGraph: {
      images: [ogp],
    },
    robots: {
      index: !page.noindex,
    },
  };
}

export default async function Page({ params }: { params: { slug: string } }) {
  const page: PageType & MicroCMSContentId & MicroCMSDate = await getPage()(
    params.slug,
  ).catch(() => notFound());

  return <PageComponent page={page} />;
}
