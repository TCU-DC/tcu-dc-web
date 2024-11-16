export const runtime = "edge";

import PageComponent from "@/components/Page";
import type { Page as PageType } from "@/types/microcms/page";
import { getPage } from "@/utils/microcms/getContents";
import type { MicroCMSContentId, MicroCMSDate } from "microcms-js-sdk";
import { cookies, draftMode } from "next/headers";
import { redirect } from "next/navigation";

export default async function Page({ params }: { params: { slug: string } }) {
  const REDIRECT_PATH = `/${params.slug}`; // ドラフトモードが無効の場合のリダイレクト先

  const { isEnabled } = draftMode();
  const currentCookies = cookies();
  const draftKey = currentCookies.get("draftKey")?.value;

  // ドラフトモードではないか、ドラフトキーが存在しない場合、通常のページにリダイレクト
  if (!isEnabled || !draftKey) {
    return redirect(REDIRECT_PATH);
  }

  const page: PageType & MicroCMSContentId & MicroCMSDate = await getPage({
    draftKey: draftKey,
  })(params.slug).catch(() => redirect(REDIRECT_PATH));

  return <PageComponent page={page} />;
}
