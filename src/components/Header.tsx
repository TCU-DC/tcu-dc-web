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
      : `${joinLink?.fieldId === "postLink" ? "/posts/" : "/"}${joinLink?.link ?? ""}`;
  class SvgArrowWhite {
    static w_24 = (
      <svg
        width="97"
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
    static w_12 = (
      <svg
        width="49"
        height="16"
        viewBox="0 0 49 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M48.7071 8.70711C49.0976 8.31658 49.0976 7.68342 48.7071 7.29289L42.3431 0.928932C41.9526 0.538408 41.3195 0.538408 40.9289 0.928932C40.5384 1.31946 40.5384 1.95262 40.9289 2.34315L46.5858 8L40.9289 13.6569C40.5384 14.0474 40.5384 14.6805 40.9289 15.0711C41.3195 15.4616 41.9526 15.4616 42.3431 15.0711L48.7071 8.70711ZM0 9H48V7H0V9Z"
          fill="white"
        />
      </svg>
    );
  }
  return (
    <>
      <div className="fixed top-0 z-50 flex h-20 w-full items-center justify-between bg-white shadow-md">
        <Link href="/">
          <Image
            className="h-12 transition duration-500 hover:opacity-50 lg:ml-6 xl:ml-8"
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
          className="flex h-20 cursor-pointer items-center bg-gradient-to-r from-[#05C0FF] to-[#0070D9] font-bold text-white lg:w-48 lg:text-xl xl:w-80 xl:text-2xl"
        >
          <div className="hidden w-24 xl:inline-block">
            {SvgArrowWhite.w_24}
          </div>
          <div className="flex hidden w-12 lg:inline-block xl:hidden">
            {SvgArrowWhite.w_12}
          </div>
          <div className="flex justify-center lg:w-36 xl:w-56">
            {joinLink.title}
          </div>
          <div
            // ホバー表示用
            className="absolute flex h-full w-80 items-center bg-gradient-to-r from-[#0070D9] to-[#05C0FF] opacity-0 transition duration-500 hover:opacity-100"
          >
            <div className="hidden w-24 xl:inline-block">
              {SvgArrowWhite.w_24}
            </div>
            <div className="flex hidden w-12 lg:inline-block xl:hidden">
              {SvgArrowWhite.w_12}
            </div>
            <div className="flex justify-center lg:w-36 xl:w-56">
              {joinLink.title}
            </div>
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
