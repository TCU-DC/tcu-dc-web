export type Link = {
  /**
   * リンク種別
   */
  fieldId: "link" | "pageLink" | "postLink";
  /**
   * リンクタイトル
   */
  title?: string;
  /**
   * リンクタイトル（英語）
   */
  englishTitle?: string;
  /**
   * リンクURL, ページの場合はslug
   */
  link?: string;
};
