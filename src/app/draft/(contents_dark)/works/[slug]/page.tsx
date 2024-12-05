export const runtime = "edge";

import WorkComponent from "@/components/Work";
import type { Work as WorkType } from "@/types/microcms/work";
import { getWork } from "@/utils/microcms/getContents";
import type { MicroCMSContentId, MicroCMSDate } from "microcms-js-sdk";
import { cookies, draftMode } from "next/headers";
import { redirect } from "next/navigation";

export const dynamicParams = true;

export default async function Post({ params }: { params: { slug: string } }) {
  const REDIRECT_PATH = `/works/${params.slug}`; // ドラフトモードが無効の場合のリダイレクト先

  const { isEnabled } = draftMode();
  const currentCookies = cookies();
  const draftKey = currentCookies.get("draftKey")?.value;

  // ドラフトモードではないか、ドラフトキーが存在しない場合、通常のページにリダイレクト
  if (!isEnabled || !draftKey) {
    return redirect(REDIRECT_PATH);
  }

  const post: WorkType & MicroCMSContentId & MicroCMSDate = await getWork({
    draftKey: draftKey,
  })(params.slug).catch(() => redirect(REDIRECT_PATH));

  return <WorkComponent work={post} />;
}
