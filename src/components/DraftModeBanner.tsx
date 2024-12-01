export const runtime = "edge";

import { cookies, draftMode } from "next/headers";
import Link from "next/link";

function DraftModeBanner() {
  const { isEnabled } = draftMode();
  const currentCookies = cookies();
  const isDraftMode = isEnabled && currentCookies.get("draftKey")?.value;
  return (
    <>
      {isDraftMode && (
        <div className="fixed top-16 z-50 w-full bg-yellow-200 p-2 text-center text-sm opacity-95 lg:top-20">
          プレビューモードで閲覧中
          <Link href={`/api/draft/end`} className="px-1 underline">
            プレビューモード終了
          </Link>
        </div>
      )}
    </>
  );
}

export default DraftModeBanner;
