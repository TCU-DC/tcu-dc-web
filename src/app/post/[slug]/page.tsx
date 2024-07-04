import type { Post } from "@/types/microcms/post";
import type { Metadata } from "next";
import type { MicroCMSContentId, MicroCMSDate } from "microcms-js-sdk";
import parse from "html-react-parser";
import { getPostIds, getPost } from "@/utils/microcms/getContents";
import { notFound } from "next/navigation";
import { Base64UrlConverter } from "@/utils/Base64UrlConverter";

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
  const ogpText = `https://assets.imgix.net/~text?w=2000&txtfont=Hiragino%20Sans%20W6&txt-size=88&txt-color=333333&txt-align=center,middle&txt=${post.title}`;
  const ogpTextBase64 = Base64UrlConverter.encodeUrl(ogpText);
  const ogp =
    post.image?.url ??
    `https://images.microcms-assets.io/assets/60d1ae62ee374a268781036ae38a4e8f/bfe72874397a46dc8277b1d0febe0371/ogp_source.png?h=1200&blend64=${ogpTextBase64}&blend-mode=normal&blend-align=center,middle`;
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
