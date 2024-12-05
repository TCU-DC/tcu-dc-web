import WorkList from "@/components/WorkList";
import { Group } from "@/types/microcms/group";
import type { Work } from "@/types/microcms/work";
import {
  getGroupIds,
  getWorksCountsByGroup,
  getWorksPaginated,
} from "@/utils/microcms/getContents";
import type { MicroCMSContentId, MicroCMSListResponse } from "microcms-js-sdk";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

// SSG のため、1ページあたりの表示件数は固定とする
const FIRST_PAGE: number = 1;
const PER_PAGE: number = 10;

export const dynamicParams = false;

export async function generateStaticParams() {
  const slug: string[][] = [];
  // 全ページのページ番号のスラッグを追加（/list/[ページ数]）
  const worksPaginated: {
    works: MicroCMSListResponse<Work>;
    pager: number[];
  } = await getWorksPaginated(FIRST_PAGE, PER_PAGE);
  worksPaginated.pager.forEach((work) => {
    slug.push([work.toString(), ""] as string[]);
  });
  // 全カテゴリIDを取得
  const groupIds: string[] = await getGroupIds();
  // カテゴリIDとページ番号を組み合わせてスラッグを生成（/list/[カテゴリID]/[ページ数]）
  for (const id of groupIds) {
    const worksPaginated: {
      works: MicroCMSListResponse<Work>;
      pager: number[];
    } = await getWorksPaginated(FIRST_PAGE, PER_PAGE, id as string);
    worksPaginated.pager.forEach((work) => {
      slug.push([id, work.toString()] as string[]);
    });
  }
  return slug.map((s) => ({
    slug: s,
  }));
}

export async function generateMetadata(): Promise<Metadata> {
  const ogp = "/ogp.png";
  return {
    title: "作品一覧",
    description: "作品の一覧です。",
    openGraph: {
      images: [ogp],
    },
  };
}

export default async function Page({ params }: { params: { slug: string[] } }) {
  // params から ページ番号を取得。params.slug[1] に 値がない場合 params.slug[0] がページ番号
  const currentPage = Number(params.slug[1] ?? params.slug[0]);
  // params から カテゴリIDを取得。params.slug[1] に 値がある場合 params.slug[0] がカテゴリID。ない場合は undefined
  const groupId = params.slug[1] ? params.slug[0] : undefined;

  const worksPaginated: {
    works: MicroCMSListResponse<Work>;
    pager: number[];
  } = await getWorksPaginated(currentPage, PER_PAGE, groupId).catch(() =>
    notFound(),
  );
  const works: MicroCMSListResponse<Work> = worksPaginated.works;
  const worksCountsByGroup: {
    group: Group & MicroCMSContentId;
    count: number;
  }[] = await getWorksCountsByGroup().catch(() => notFound());

  // const pager: number[] = postsPaginated.pager;
  return (
    <WorkList
      works={works}
      worksPaginated={worksPaginated}
      worksCountsByGroup={worksCountsByGroup}
      currentPage={currentPage}
      groupId={groupId}
    ></WorkList>
  );
}
