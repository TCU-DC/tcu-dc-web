export const runtime = "edge";

import { getWork } from "@/utils/microcms/getContents";
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
        Location: `/works/${contentId}`,
      },
    });
  }

  await getWork({
    draftKey: draftKey,
  })(contentId).catch(() => {
    throw new Error("Post not found");
  });

  draftMode().enable();

  cookies().set({
    name: "draftKey",
    value: draftKey,
    httpOnly: true,
    path: "/draft",
  });

  const response = new Response(null, {
    status: 302,
    headers: {
      Location: `/draft/works/${contentId}`,
    },
  });

  return response;
}
