import type { Config } from "@/types/microcms/config";
import { normalizedCustomFieldLink } from "@/utils/microcms/configUtils";

const Footer = (config: Config) => {
  return (
    <div>
      {config.footerLinks?.map((link) => {
        return (
          <div key={link.fieldId}>{normalizedCustomFieldLink(link).link}</div>
        );
      })}
    </div>
  );
};

export default Footer;
