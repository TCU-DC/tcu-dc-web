export const runtime = "edge";

import WorkList from "@/components/WorkList";
import { Group } from "@/types/microcms/group";
import type { Work } from "@/types/microcms/work";
import {
  getWorksCountsByGroup,
  getWorksPaginated,
} from "@/utils/microcms/getContents";
import type { MicroCMSContentId, MicroCMSListResponse } from "microcms-js-sdk";
import { cookies, draftMode } from "next/headers";
import { redirect } from "next/navigation";

// SSG のため、1ページあたりの表示件数は固定とする
const FIRST_PAGE: number = 1;
const PER_PAGE: number = 10;

export const dynamicParams = true;

export default async function Page({ params }: { params: { slug: string[] } }) {
  // params から ページ番号を取得。params.slug[1] に 値がない場合 params.slug[0] がページ番号
  const currentPage = Number(params.slug[1] ?? params.slug[0]);
  // params から カテゴリIDを取得。params.slug[1] に 値がある場合 params.slug[0] がカテゴリID。ない場合は undefined
  const groupId = params.slug[1] ? params.slug[0] : undefined;

  const REDIRECT_PATH = `/posts/list/${groupId ? `${groupId}/` : ""}${currentPage}`; // ドラフトモードが無効の場合のリダイレクト先

  const { isEnabled } = draftMode();
  const currentCookies = cookies();
  const draftKey = currentCookies.get("draftKey")?.value;

  // ドラフトモードではないか、ドラフトキーが存在しない場合、通常のページにリダイレクト
  if (!isEnabled || !draftKey) {
    return redirect(REDIRECT_PATH);
  }

  const worksPaginated: {
    works: MicroCMSListResponse<Work>;
    pager: number[];
  } = await getWorksPaginated(currentPage, PER_PAGE, groupId, draftKey).catch(
    () => redirect(REDIRECT_PATH),
  );
  const works: MicroCMSListResponse<Work> = worksPaginated.works;
  const worksCountsByGroup: {
    group: Group & MicroCMSContentId;
    count: number;
  }[] = await getWorksCountsByGroup(draftKey).catch(() =>
    redirect(REDIRECT_PATH),
  );

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
