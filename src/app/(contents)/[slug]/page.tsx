import type { Page } from "@/types/microcms/page";
import { getPage, getPageIds } from "@/utils/microcms/getContents";
import parse from "html-react-parser";
import type { MicroCMSContentId, MicroCMSDate } from "microcms-js-sdk";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

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
  const page: Page & MicroCMSContentId & MicroCMSDate = await getPage()(
    params.slug,
  );
  return {
    title: page.title,
    description: page.description,
  };
}

export default async function Page({ params }: { params: { slug: string } }) {
  const page: Page & MicroCMSContentId & MicroCMSDate = await getPage()(
    params.slug,
  );
  if (!page) {
    notFound();
  }
  return (
    <div>
      <div>{page.title}</div>
      {parse(page.body ?? "")}
    </div>
  );
}
