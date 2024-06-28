import type { Post } from "@/types/microcms/post";
import type { Metadata } from "next";
import type { MicroCMSContentId, MicroCMSDate } from "microcms-js-sdk";
import parse from "html-react-parser";
import { getPostIds, getPost } from "@/utils/microcms/getContents";
import { notFound } from "next/navigation";

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
  const post: Post & MicroCMSContentId & MicroCMSDate = await getPost()(
    params.slug,
  );
  return {
    title: post.title,
    description: post.description,
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
