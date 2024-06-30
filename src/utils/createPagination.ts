export const createPagination = (
  pages: number[],
  currentPage: number,
  maxDisplay: number = 5,
): (number | string)[] => {
  const totalPages = pages.length;
  const pagination: (number | string)[] = [];
  const half = Math.floor(maxDisplay / 2);

  if (totalPages <= maxDisplay) {
    // 総ページ数がmaxDisplay以下の場合、全ページを表示
    return pages;
  }

  // 常に最初のページを表示
  pagination.push(pages[0]);

  let start = Math.max(2, currentPage - half);
  let end = Math.min(totalPages - 1, currentPage + half);

  // 現在のページが中央になるように調整
  if (currentPage - half < 2) {
    end = Math.min(totalPages - 1, end + (half - currentPage + 2));
  }
  if (currentPage + half > totalPages - 1) {
    start = Math.max(2, start - (currentPage + half - totalPages + 1));
  }

  // 省略記号の追加
  if (start > 2) {
    pagination.push("...");
  }

  // 範囲内のページを追加
  for (let i = start; i <= end; i++) {
    pagination.push(pages[i - 1]);
  }

  // 省略記号の追加
  if (end < totalPages - 1) {
    pagination.push("...");
  }

  // 常に最後のページを表示
  pagination.push(pages[totalPages - 1]);

  return pagination;
};
