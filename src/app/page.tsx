import { Top } from "@/types/microcms/top";
import { getTopSetting } from "@/utils/microcms/getContents";
import { normalizedCustomFieldLink } from "@/utils/microcms/topUtils";

export default async function Home() {
  const top: Top = await getTopSetting();

  return (
    <div>
      <div>{top.title}</div>
      <div>
        {top.navbarLinks?.right &&
          normalizedCustomFieldLink(top.navbarLinks?.right[0]).link}
      </div>
      <div>
        {top.navbarLinks?.center &&
          normalizedCustomFieldLink(top.navbarLinks?.center[0]).link}
      </div>
      <div>
        {top.navbarLinks?.left &&
          normalizedCustomFieldLink(top.navbarLinks?.left[0]).link}
      </div>
    </div>
  );
}
