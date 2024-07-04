export class Base64UrlConverter {
  // Base64エンコード
  static encodeUrl(url: string): string {
    const encodedUrl = Buffer.from(url).toString("base64");
    return encodedUrl
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");
  }

  // Base64デコード
  static decodeUrl(encodedUrl: string): string {
    const base64 = encodedUrl
      .replace(/-/g, "+")
      .replace(/_/g, "/")
      .padEnd(encodedUrl.length + ((4 - (encodedUrl.length % 4)) % 4), "=");
    return Buffer.from(base64, "base64").toString("utf-8");
  }
}
