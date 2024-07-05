import { Base64UrlConverter } from "@/utils/Base64UrlConverter";

// imgixのTypesetting EndpointのURL
const IMGIX_TYPESETTING_ENDPOINT: string = "https://assets.imgix.net/~text";

/**
 * imgixの画像URLとテキストを受け取り、OGP画像のURLを生成する
 * @param imgixUrl - imgixAPIが利用可能な画像URL（microCMSは画像CDNにimgixを利用しているためimgixAPIが利用可能）
 * @param text - OGP画像に表示するテキスト
 * @return - OGP画像のURL
 */
export function generateOgpUrl(imgixUrl: string, text?: string): string {
  // imgixのテキスト画像のURLパラメータ
  const imgixTextUrlParams: { [key: string]: string } = {
    w: "1000", // 文字画像のサイズ
    "txt-font": "Hiragino%20Sans%20W6", // フォント
    "txt-size": "56", // フォントサイズ
    "txt-color": "333333", // フォントカラー
    "txt-align": "center,middle", // テキストの位置
  };

  // OGP画像のURLパラメータ
  const ogpUrlParams: { [key: string]: string } = {
    w: "1200", // OGP画像の幅
    "blend-mode": "normal", // ブレンドモード（imgixのTypesetting Endpointで作成した文字飲みの画像を合成する際の設定）
    "blend-align": "center,middle", // ブレンド位置
  };

  const imgixTextUrl = `${IMGIX_TYPESETTING_ENDPOINT}?${new URLSearchParams(imgixTextUrlParams).toString()}&txt=${encodeURIComponent(text ?? "")}`;
  const ogpUrl = `${imgixUrl}?${new URLSearchParams(ogpUrlParams).toString()}&blend64=${Base64UrlConverter.encodeUrl(imgixTextUrl)}`;

  return ogpUrl;
}
