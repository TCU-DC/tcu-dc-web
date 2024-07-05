export type CustomLink = {
  /**
   * リンク種別
   */
  fieldId: "externalLink" | "pageLink" | "postLink";
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
