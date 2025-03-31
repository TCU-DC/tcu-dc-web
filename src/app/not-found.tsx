import Error404 from "@/components/Error404";
import type { Config } from "@/types/microcms/config";
import type { Work } from "@/types/microcms/work";
import {
  getAllWorkIds,
  getConfig,
  getWorks,
} from "@/utils/microcms/getContents";
import type { MicroCMSListResponse } from "microcms-js-sdk";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const config: Config = await getConfig();
  return {
    title: "404 Not Found",
    description: "ページが見つかりませんでした。",
    openGraph: {
      images: [config.ogpDefault.url],
    },
    robots: {
      index: false,
    },
  };
}

export default async function NotFound() {
  // ランダムで取得する作品の件数を定義
  const NUMBER_OF_RANDOM_WORKS = 10;

  const config: Config = await getConfig();
  const workIds = await getAllWorkIds();

  // workIdsからランダムで指定した件数を取得する
  const randomWorkIds = workIds
    .sort(() => Math.random() - 0.5)
    .slice(0, NUMBER_OF_RANDOM_WORKS);

  // 作品のIDを使って作品情報を取得する
  const randomWorks: MicroCMSListResponse<Work> = await getWorks({
    ids: randomWorkIds.join(","),
  });

  return <Error404 config={config} works={randomWorks}></Error404>;
}
