import React from "react";
import type { Top } from "@/types/microcms/top";
import { normalizedCustomFieldLink } from "@/utils/microcms/topUtils";
import BannerLink from "@/components/BannerLink";
import type { CustomLink } from "@/types/customLink";
import Link from "next/link";

const Banner = (top: Top) => {
  const leftLink =
    (top?.navbarLinks?.left &&
      normalizedCustomFieldLink(top.navbarLinks.left[0])) ??
    ({} as CustomLink);
  const centerLink =
    (top?.navbarLinks?.center &&
      normalizedCustomFieldLink(top.navbarLinks.center[0])) ??
    ({} as CustomLink);
  const rightLink =
    (top?.navbarLinks?.right &&
      normalizedCustomFieldLink(top.navbarLinks.right[0])) ??
    ({} as CustomLink);
  const joinLink =
    (top?.join && normalizedCustomFieldLink(top.join[0])) ?? ({} as CustomLink);

  return (
    <div className="fixed top-0 w-full flex items-center justify-between p-3 bg-white shadow-md z-50">
      <img src="logo.svg" alt="Logo" className="h-12" />
      <nav className="flex items-center ml-auto mr-5">
        <BannerLink link={leftLink} />
        <div className="w-px h-5 bg-gray-300 mx-2"></div>
        <BannerLink link={centerLink} />
        <div className="w-px h-5 bg-gray-300 mx-2"></div>
        <BannerLink link={rightLink} />
      </nav>
      <Link
        href={
          (joinLink?.fieldId === "postLink" ? "/post/" : "") +
          (joinLink?.link || "")
        }
        className="flex-grow p-2 bg-blue-500 text-white rounded cursor-pointer text-lg max-w-40 text-center hover:bg-blue-700"
      >
        {joinLink.title}
      </Link>
    </div>
  );
};

export default Banner;
