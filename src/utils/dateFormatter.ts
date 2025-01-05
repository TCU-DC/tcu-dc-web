type formatVariations = "YYYY/MM/DD" | "YYYY-MM-DD";

/**
 * ISO 8601形式のUTC日時を日本時間の指定形式に変換する関数
 * @param {string} isoDate - ISO 8601形式のUTC日時（例："2024-11-07T14:30:00Z"）
 * @param {formatVariations} format - 出力する日付のフォーマット（デフォルトは 'YYYY/MM/DD'）
 * @returns {string} フォーマット済みの日付文字列
 */
export function formatDateToJST(
  isoDate: string,
  format: formatVariations = "YYYY/MM/DD",
): string {
  // Dateオブジェクトに変換し、日本時間に補正
  const date = new Date(isoDate);
  const JSTDate = new Date(date.getTime() + 9 * 60 * 60 * 1000); // UTC+9で日本時間に変換

  // 年・月・日を取得
  const year = JSTDate.getFullYear();
  const month = String(JSTDate.getMonth() + 1).padStart(2, "0");
  const day = String(JSTDate.getDate()).padStart(2, "0");

  // フォーマットに応じて出力を変える
  switch (format) {
    case "YYYY/MM/DD":
      return `${year}/${month}/${day}`;
    case "YYYY-MM-DD":
      return `${year}-${month}-${day}`;
    default:
      return `${year}/${month}/${day}`; // デフォルトはYYYY/MM/DD形式
  }
}
