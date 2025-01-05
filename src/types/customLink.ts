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
  /**
   * 新しいタブで開くか否か。true の場合は target="_blank" を付与
   */
  isTargetBlank?: boolean;
};
