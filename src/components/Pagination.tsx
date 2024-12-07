import { createPagination } from "@/utils/createPagination";
import Link from "next/link";

type color = "black" | "white";

const Pagination = ({
  hrefBase,
  pager,
  currentPage,
  maxDisplay,
  theme = "white",
}: {
  hrefBase: string;
  pager: number[];
  currentPage: number;
  maxDisplay?: number;
  theme?: color;
}) => {
  let bgColorClassWhenCurrentPage,
    textColorClassWhenCurrentPage,
    bgColorClass,
    textColorClass;
  switch (theme) {
    case "black":
      bgColorClassWhenCurrentPage =
        "bg-gradient-to-r from-[#05C0FF] to-[#0070D9]";
      textColorClassWhenCurrentPage = "text-white";
      bgColorClass = "bg-zinc-100";
      textColorClass = "text-black";
      break;
    default:
    case "white":
      bgColorClassWhenCurrentPage = "bg-black";
      textColorClassWhenCurrentPage = "text-zinc-100";
      bgColorClass = "bg-zinc-200";
      textColorClass = "text-black";
      break;
  }
  return (
    <div className="flex gap-2">
      {
        // ページネーションを表示
        createPagination(pager, currentPage, maxDisplay).map((page, index) => {
          // page が number ではない場合"..." を表示
          if (typeof page !== "number") {
            return (
              <div
                key={index}
                className="flex h-9 w-9 items-center justify-center text-lg font-bold"
              >
                {page}
              </div>
            );
          }
          // currentPage の場合リンクにせず、黒背景に白文字
          if (page === currentPage) {
            return (
              <div
                key={index}
                className={`${bgColorClassWhenCurrentPage} ${textColorClassWhenCurrentPage} flex h-9 w-9 items-center justify-center rounded text-lg font-bold`}
              >
                {page}
              </div>
            );
          }
          // ページ番号のリンクを表示
          return (
            <Link
              className={`${bgColorClass} ${textColorClass} flex h-9 w-9 items-center justify-center rounded text-lg font-bold transition duration-500 hover:bg-zinc-300`}
              key={index}
              href={`${hrefBase}${page}`}
            >
              <div>{page}</div>
            </Link>
          );
        })
      }
    </div>
  );
};

export default Pagination;
