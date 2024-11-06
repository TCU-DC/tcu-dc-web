import HeaderLink from "@/components/HeaderLink";
import type { CustomLink } from "@/types/customLink";
import type { Config } from "@/types/microcms/config";
import { normalizedCustomFieldLink } from "@/utils/microcms/configUtils";
import React from "react";

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
      ? (joinLink?.link ?? "")
      : `${joinLink?.fieldId === "postLink" ? "/post/" : "/"}${joinLink?.link ?? ""}`;
  return (
    <div>
      <div className="fixed top-0 z-50 flex h-20 w-full items-center justify-between bg-white shadow-md">
        <img
          src="logo.svg"
          alt="東京都市大学デジタルコンテンツ研究会"
          className="ml-8 h-12"
        />
        <nav className="ml-auto flex items-center">
          <HeaderLink link={leftLink} />
          <div className="h-4 w-px bg-gray-300"></div>
          <HeaderLink link={centerLink} />
          <div className="h-4 w-px bg-gray-300"></div>
          <HeaderLink link={rightLink} />
        </nav>
        <Link
          href={href}
          className="flex h-20 w-80 cursor-pointer items-center bg-gradient-to-r from-[#05C0FF] to-[#0070D9] text-2xl font-bold text-white"
        >
          <div className="w-20">
            <img src="./arrow_white_w-20.svg" />
          </div>
          <div className="flex w-60 justify-center">{joinLink.title}</div>
          {/* 以下の div はホバー表示用 */}
          <div className="absolute flex h-full w-80 items-center bg-gradient-to-r from-[#0070D9] to-[#05C0FF] opacity-0 transition duration-500 hover:opacity-100">
            <div className="w-20">
              <img src="./arrow_white_w-20.svg" />
            </div>
            <div className="flex w-60 justify-center">{joinLink.title}</div>
          </div>
        </Link>
      </div>
      {/* 以下の div はヘッダーの高さ分のスペースを確保するためのもの */}
      <div className="h-20"></div>
    </div>
  );
};

export default Navbar;
