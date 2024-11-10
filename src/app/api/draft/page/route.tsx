export const runtime = "edge";

import { getPage } from "@/utils/microcms/getContents";
import { cookies, draftMode } from "next/headers";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const contentId = searchParams.get("contentId");
  const draftKey = searchParams.get("draftKey");
  if (!contentId) {
    return new Response("Invalid request", { status: 400 });
  }
  if (!draftKey) {
    return new Response(null, {
      status: 302,
      headers: {
        Location: `/${contentId}`,
      },
    });
  }

  await getPage({
    draftKey: draftKey,
  })(contentId).catch(() => {
    throw new Error("Page not found");
  });

  draftMode().enable();

  cookies().set({
    name: "draftKey",
    value: draftKey,
    httpOnly: true,
    path: "/draft/",
  });

  const response = new Response(null, {
    status: 302,
    headers: {
      Location: `/draft/${contentId}`,
    },
  });

  return response;
}
