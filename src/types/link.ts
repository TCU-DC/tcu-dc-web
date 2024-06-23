export type Link = {
  /**
   * 外部リンクかどうか（`false`の場合内部リンク）
   */
  isExternal: boolean;
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
