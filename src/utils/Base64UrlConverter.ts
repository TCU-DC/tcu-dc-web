export class Base64UrlConverter {
  /**
   * URL を Base64 エンコードします。
   * @param  {string} url エンコードする URL
   * @returns {string} Base64 エンコードされた URL
   */
  static encodeUrl(url: string): string {
    const encodedUrl = Buffer.from(url).toString("base64");
    return encodedUrl
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");
  }

  /**
   * Base64 エンコードされた URL をデコードします。
   * @param {string} encodedUrl デコードする Base64 エンコードされた URL
   * @returns {string} デコードされた URL
   */
  static decodeUrl(encodedUrl: string): string {
    const base64 = encodedUrl
      .replace(/-/g, "+")
      .replace(/_/g, "/")
      .padEnd(encodedUrl.length + ((4 - (encodedUrl.length % 4)) % 4), "=");
    return Buffer.from(base64, "base64").toString("utf-8");
  }
}
