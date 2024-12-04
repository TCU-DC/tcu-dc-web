import { createPagination } from "@/utils/createPagination";
import Link from "next/link";
import { FC } from "react";

interface PaginationProps {
  categoryId: string;
  pager: number[];
  currentPage: number;
  maxDisplay?: number;
}

const Pagination: FC<PaginationProps> = ({
  categoryId,
  pager,
  currentPage,
  maxDisplay,
}) => {
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
                className="flex h-9 w-9 items-center justify-center rounded bg-black text-lg font-bold text-white"
              >
                {page}
              </div>
            );
          }
          // ページ番号のリンクを表示
          return (
            <Link
              className="flex h-9 w-9 items-center justify-center rounded bg-zinc-200 text-lg font-bold text-black transition duration-500 hover:bg-zinc-300"
              key={index}
              href={`/posts/list/${categoryId ? `${categoryId}/` : ""}${page}`}
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
