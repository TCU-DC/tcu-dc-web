import HeaderLink from "@/components/HeaderLink";
import type { CustomLink } from "@/types/customLink";
import type { Config } from "@/types/microcms/config";
import { normalizedCustomFieldLink } from "@/utils/microcms/configUtils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

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
  const svgArrowWhite = (
    <svg
      width="w-24"
      height="16"
      viewBox="0 0 97 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M96.7071 8.70711C97.0976 8.31658 97.0976 7.68342 96.7071 7.29289L90.3431 0.928932C89.9526 0.538408 89.3195 0.538408 88.9289 0.928932C88.5384 1.31946 88.5384 1.95262 88.9289 2.34315L94.5858 8L88.9289 13.6569C88.5384 14.0474 88.5384 14.6805 88.9289 15.0711C89.3195 15.4616 89.9526 15.4616 90.3431 15.0711L96.7071 8.70711ZM0 9L96 9V7L0 7L0 9Z"
        fill="white"
      />
    </svg>
  );
  return (
    <>
      <div className="fixed top-0 z-50 flex h-20 w-full items-center justify-between bg-white shadow-md">
        <Link href="/">
          <Image
            className="ml-8 h-12 transition duration-500 hover:opacity-50"
            src="/dc_logo.svg"
            alt="東京都市大学デジタルコンテンツ研究会"
            width="307"
            height="48"
          />
        </Link>
        <nav className="ml-auto flex items-center">
          <HeaderLink link={leftLink} />
          <div className="h-4 w-px bg-zinc-300"></div>
          <HeaderLink link={centerLink} />
          <div className="h-4 w-px bg-zinc-300"></div>
          <HeaderLink link={rightLink} />
        </nav>
        <Link
          href={href}
          className="flex h-20 w-80 cursor-pointer items-center bg-gradient-to-r from-[#05C0FF] to-[#0070D9] text-2xl font-bold text-white"
        >
          <div className="w-24">{svgArrowWhite}</div>
          <div className="flex w-56 justify-center">{joinLink.title}</div>
          <div
            // ホバー表示用
            className="absolute flex h-full w-80 items-center bg-gradient-to-r from-[#0070D9] to-[#05C0FF] opacity-0 transition duration-500 hover:opacity-100"
          >
            <div className="w-24">{svgArrowWhite}</div>
            <div className="flex w-56 justify-center">{joinLink.title}</div>
          </div>
        </Link>
      </div>
      <div
        // ヘッダーの高さ分のスペースを確保
        className="h-20"
      ></div>
    </>
  );
};

export default Navbar;
