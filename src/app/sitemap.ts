import type { Page } from "@/types/microcms/page";
import type { Post } from "@/types/microcms/post";
import type { Work } from "@/types/microcms/work";
import {
  getPageAllContents,
  getPostAllContents,
  getWorkAllContents,
} from "@/utils/microcms/getContents";
import type {
  MicroCMSContentId,
  MicroCMSDate,
  MicroCMSQueries,
} from "microcms-js-sdk";
import type { MetadataRoute } from "next";

const BASE_URL = process.env.BASE_URL;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let metadata: MetadataRoute.Sitemap = [];

  // ページの取得条件
  const queries: MicroCMSQueries = {
    filters: "noindex[not_equals]true", // noindex が true でないものを取得
    fields: "id,revisedAt", // id と更新日時だけ取得
  };

  // トップページ
  metadata.push({
    url: BASE_URL ?? "",
    lastModified: new Date(),
  });

  // 固定ページ
  const pages: (Page & MicroCMSContentId & MicroCMSDate)[] =
    await getPageAllContents(queries);
  metadata.push(
    ...pages.map((page) => ({
      url: `${BASE_URL}/${page.id}`,
      lastModified: page.revisedAt,
    })),
  );

  // 記事ページ
  const posts: (Post & MicroCMSContentId & MicroCMSDate)[] =
    await getPostAllContents(queries);
  metadata.push(
    ...posts.map((post) => ({
      url: `${BASE_URL}/posts/${post.id}`,
      lastModified: post.revisedAt,
    })),
  );

  // 作品ページ
  const works: (Work & MicroCMSContentId & MicroCMSDate)[] =
    await getWorkAllContents(queries);
  metadata.push(
    ...works.map((work) => ({
      url: `${BASE_URL}/works/${work.id}`,
      lastModified: work.revisedAt,
    })),
  );

  return metadata;
}
