import { getPost } from "@/utils/microcms/getContents";
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
        Location: `/post/${contentId}`,
      },
    });
  }

  await getPost({
    draftKey: draftKey,
  })(contentId).catch(() => {
    throw new Error("Post not found");
  });

  draftMode().enable();

  cookies().set({
    name: "draftKey",
    value: draftKey,
    httpOnly: true,
    path: "/",
  });

  cookies().set({
    name: "previewPath",
    value: `/post/${contentId}`,
    httpOnly: true,
    path: "/",
  });

  const response = new Response(null, {
    status: 302,
    headers: {
      Location: `/post/${contentId}`,
    },
  });

  return response;
}
