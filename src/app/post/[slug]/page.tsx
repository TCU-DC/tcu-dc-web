import type { Post } from "@/types/microcms/post";
import type { Config } from "@/types/microcms/config";
import type { Metadata } from "next";
import type { MicroCMSContentId, MicroCMSDate } from "microcms-js-sdk";
import parse from "html-react-parser";
import { notFound } from "next/navigation";
import { getConfig, getPostIds, getPost } from "@/utils/microcms/getContents";
import { generateOgpUrl } from "@/utils/microcms/generateOGP";

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
  const config: Config & MicroCMSContentId & MicroCMSDate = await getConfig();
  const post: Post & MicroCMSContentId & MicroCMSDate = await getPost()(
    params.slug,
  );
  const ogp = post.image?.url ?? generateOgpUrl(config.ogp.url, post.title);
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      images: [ogp],
    },
  };
}

export default async function Page({ params }: { params: { slug: string } }) {
  const post: Post & MicroCMSContentId & MicroCMSDate = await getPost()(
    params.slug,
  );
  if (!post) {
    notFound();
  }
  return (
    <div>
      <div>{post.title}</div>
      {parse(post.body ?? "")}
    </div>
  );
}
