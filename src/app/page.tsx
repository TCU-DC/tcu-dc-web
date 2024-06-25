import { Top } from "@/types/microcms/top";
import { getTopSetting } from "@/utils/microcms/getContents";
import Banner from "@/components/Banner";

export default async function Home() {
  const top: Top = await getTopSetting();

  return (
    <div>
      <Banner {...top}></Banner>
    </div>
  );
}
