import { Top } from "@/types/microcms/top";
import { normalizedCustomFieldLink } from "@/utils/microcms/topUtils";

const Banner = (p: Top) => {
  return (
    <div>
      <div>{p.title}</div>
      <div>
        {p.navbarLinks?.right &&
          normalizedCustomFieldLink(p.navbarLinks?.right[0]).link}
      </div>
      <div>
        {p.navbarLinks?.center &&
          normalizedCustomFieldLink(p.navbarLinks?.center[0]).link}
      </div>
      <div>
        {p.navbarLinks?.left &&
          normalizedCustomFieldLink(p.navbarLinks?.left[0]).link}
      </div>
      <div>{p.join && normalizedCustomFieldLink(p.join[0]).link}</div>
    </div>
  );
};

export default Banner;
