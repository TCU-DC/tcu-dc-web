import Link from "next/link";
import { createPagination } from "@/utils/createPagination";

import { FC } from "react";

interface PaginationProps {
  categoryId: string;
  pager: number[];
  currentPage: number;
}

const Pagination: FC<PaginationProps> = ({
  categoryId,
  pager,
  currentPage,
}) => {
  return (
    <div>
      {
        // ページネーションを表示
        createPagination(pager, currentPage).map((page, index) => {
          // page が number ではない場合"..." を表示
          if (typeof page !== "number") {
            return <div key={index}>{page}</div>;
          }
          return (
            <Link
              key={index}
              href={`/post/list/${categoryId ? `${categoryId}/` : ""}${page}`}
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
