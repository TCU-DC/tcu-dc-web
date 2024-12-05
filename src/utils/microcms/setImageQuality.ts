/**
 * 指定された画像URLに対して、フォーマット、品質、幅、高さを設定する。
 *
 * @param imageUrl - 画像のURL
 * @param format - 画像のフォーマット (例: 'webp')
 * @param quality - 画像の品質 (0から100の範囲)
 * @param width - 画像の幅
 * @param height - 画像の高さ
 * @returns 変換された画像のURL
 */
export function setImageQuality(
  imageUrl: string,
  options: {
    format?: string;
    quality?: string;
    width?: string;
    height?: string;
  },
): string {
  // 画像の URL に WebP と品質設定を追加する関数（microCMSで利用されているimgixの機能を使用）

  // imageUrl.startsWith("/") の場合は、ローカルの画像ファイルを指しているので、そのまま返す
  if (imageUrl.startsWith("/")) return imageUrl;

  const url = new URL(imageUrl);
  const params = new URLSearchParams(url.search);
  if (options.format) params.append("fm", options.format); // 形式を設定
  if (options.quality) params.append("q", options.quality.toString()); // 画質を設定
  if (options.width) params.append("w", options.width.toString()); // 横幅を設定
  if (options.height) params.append("h", options.height.toString()); // 縦幅を設定
  if (options.width || options.height) params.append("fit", "max"); // 画像のリサイズ方法を設定（元画像のサイズ以上に拡大しない）
  url.search = params.toString();
  return url.toString();
}
