import React from "react";
import type { Top } from "@/types/microcms/top";
import { normalizedCustomFieldLink } from "@/utils/microcms/topUtils";
import Link from "next/link";

const Banner = (top: Top) => {
  return (
    <div className="fixed top-0 w-full flex items-center justify-between p-3 bg-white shadow-md z-50">
      <img src="logo.svg" alt="Logo" className="h-12" />
      <nav className="flex items-center ml-auto mr-5">
        <Link
          href={
            // normalizedCustomFieldLink(top.navbarLinks?.left[0])?.fieldId が postLink の場合のみ先頭に文字列 /post/ を追加
            (((top.navbarLinks?.left &&
              normalizedCustomFieldLink(top.navbarLinks?.left[0])?.fieldId) ||
              "") === "postLink"
              ? "/post/"
              : "") +
            ((top.navbarLinks?.left &&
              normalizedCustomFieldLink(top.navbarLinks?.left[0])?.link) ||
              "")
          }
          className="flex flex-col items-center text-black text-sm px-3"
        >
          {top.navbarLinks?.left &&
            normalizedCustomFieldLink(top.navbarLinks?.left[0]).title}
          <span className="text-xs text-gray-500">
            {top.navbarLinks?.left &&
              normalizedCustomFieldLink(top.navbarLinks?.left[0]).englishTitle}
          </span>
        </Link>
        <div className="w-px h-5 bg-gray-300 mx-2"></div>
        <Link
          href={
            (top.navbarLinks?.center &&
              normalizedCustomFieldLink(top.navbarLinks?.center[0])?.link) ||
            ""
          }
          className="flex flex-col items-center text-black text-sm px-3"
        >
          {top.navbarLinks?.center &&
            normalizedCustomFieldLink(top.navbarLinks?.center[0]).title}
          <span className="text-xs text-gray-500">
            {top.navbarLinks?.center &&
              normalizedCustomFieldLink(top.navbarLinks?.center[0])
                .englishTitle}
          </span>
        </Link>
        <div className="w-px h-5 bg-gray-300 mx-2"></div>
        <Link
          href={
            (top.navbarLinks?.right &&
              normalizedCustomFieldLink(top.navbarLinks?.right[0])?.link) ||
            ""
          }
          className="flex flex-col items-center text-black text-sm px-3"
        >
          {top.navbarLinks?.right &&
            normalizedCustomFieldLink(top.navbarLinks?.right[0]).title}
          <span className="text-xs text-gray-500">
            {top.navbarLinks?.right &&
              normalizedCustomFieldLink(top.navbarLinks?.right[0]).englishTitle}
          </span>
        </Link>
      </nav>
      <button className="flex-grow p-2 bg-blue-500 text-white rounded cursor-pointer text-lg max-w-40 text-center hover:bg-blue-700">
        {top.join && normalizedCustomFieldLink(top.join[0]).link}
      </button>
    </div>
  );
};

export default Banner;
