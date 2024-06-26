import type { Top } from "@/types/microcms/top";
import { normalizedCustomFieldLink } from "@/utils/microcms/topUtils";

const Banner = (top: Top) => {
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
      <div>{top.join && normalizedCustomFieldLink(top.join[0]).link}</div>
    </div>
  );
};

export default Banner;
