import type { Metadata } from "next";
import type { Top } from "@/types/microcms/top";
import { getTopSetting } from "@/utils/microcms/getContents";

export default async function Home() {
  return (
    <div>
      <div></div>
    </div>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const top: Top = await getTopSetting();
  return {
    description: top.description,
  };
}
