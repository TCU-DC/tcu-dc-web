import React from "react";
import type { Config } from "@/types/microcms/config";
import { normalizedCustomFieldLink } from "@/utils/microcms/configUtils";
import BannerLink from "@/components/BannerLink";
import type { CustomLink } from "@/types/customLink";
import Link from "next/link";

const Banner = (config: Config) => {
  const leftLink =
    (config?.navbarLinks?.left &&
      normalizedCustomFieldLink(config.navbarLinks.left[0])) ??
    ({} as CustomLink);
  const centerLink =
    (config?.navbarLinks?.center &&
      normalizedCustomFieldLink(config.navbarLinks.center[0])) ??
    ({} as CustomLink);
  const rightLink =
    (config?.navbarLinks?.right &&
      normalizedCustomFieldLink(config.navbarLinks.right[0])) ??
    ({} as CustomLink);
  const joinLink =
    (config?.join && normalizedCustomFieldLink(config.join[0])) ??
    ({} as CustomLink);
  const href =
    joinLink?.fieldId === "externalLink"
      ? joinLink?.link ?? ""
      : `${joinLink?.fieldId === "postLink" ? "/post/" : "/"}${joinLink?.link ?? ""}`;
  return (
    <div>
      <div className="fixed top-0 w-full flex items-center justify-between p-3 bg-white shadow-md z-50">
        {/* <img src="logo.svg" alt="Logo" className="h-12" /> */}
        <nav className="flex items-center ml-auto mr-5">
          <BannerLink link={leftLink} />
          <div className="w-px h-5 bg-gray-300 mx-2"></div>
          <BannerLink link={centerLink} />
          <div className="w-px h-5 bg-gray-300 mx-2"></div>
          <BannerLink link={rightLink} />
        </nav>
        <Link
          href={href}
          className="flex-grow p-2 bg-blue-500 text-white rounded cursor-pointer text-lg max-w-40 text-center hover:bg-blue-700"
        >
          {joinLink.title}
        </Link>
      </div>
      <div className="h-16"></div>
    </div>
  );
};

export default Banner;
