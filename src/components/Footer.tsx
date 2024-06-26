import type { Top } from "@/types/microcms/top";
import { normalizedCustomFieldLink } from "@/utils/microcms/topUtils";

const Banner = (top: Top) => {
  return (
    <div>
      {top.footerLinks?.map((link) => {
        return (
          <div key={link.fieldId}>{normalizedCustomFieldLink(link).link}</div>
        );
      })}
    </div>
  );
};

export default Banner;
