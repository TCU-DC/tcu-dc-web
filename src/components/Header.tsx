import type { Config } from "@/types/microcms/config";
import type { CustomLink } from "@/types/customLink";
import React from "react";
import HeaderLink from "@/components/HeaderLink";
import { normalizedCustomFieldLink } from "@/utils/microcms/configUtils";

import Link from "next/link";

const Navbar = (config: Config) => {
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
      <div className="fixed top-0 w-full flex h-20 items-center justify-between bg-white shadow-md z-50">
        <img src="logo.svg" alt="Logo" className="h-12 m-8" />
        <nav className="flex items-center ml-auto">
          <HeaderLink link={leftLink} />
          <div className="w-px h-4 bg-gray-300"></div>
          <HeaderLink link={centerLink} />
          <div className="w-px h-4 bg-gray-300"></div>
          <HeaderLink link={rightLink} />
        </nav>
        <Link
          href={href}
          className="w-80 h-20 text-2xl font-semibold  text-white cursor-pointer  bg-gradient-to-r from-[#05C0FF] via-[#0291E9] to-[#0070D9] flex items-center"
        >
          <div className="w-20">
            <img src="./arrow_white_w-20.svg" />
          </div>
          <div className="w-60 flex justify-center">{joinLink.title}</div>
          {/* 以下の div はホバー表示用 */}
          <div className="h-full w-80 opacity-0 hover:opacity-100 transition duration-500 absolute bg-gradient-to-r from-[#0070D9] via-[#0291E9] to-[#05C0FF] flex items-center">
            <div className="w-20">
              <img src="./arrow_white_w-20.svg" />
            </div>
            <div className="w-60 flex justify-center">{joinLink.title}</div>
          </div>
        </Link>
      </div>
      <div className="h-16"></div>
    </div>
  );
};

export default Navbar;
