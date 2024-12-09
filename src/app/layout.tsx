import GoogleAnalytics from "@/components/GoogleAnalytics";
import type { Config } from "@/types/microcms/config";
import { getConfig } from "@/utils/microcms/getContents";
import type { Metadata } from "next";
import { Zen_Kaku_Gothic_New } from "next/font/google";
import "./global.css";

const zenKakuGothicNew = Zen_Kaku_Gothic_New({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export async function generateMetadata(): Promise<Metadata> {
  const config: Config = await getConfig();
  return {
    title: {
      template: `%s | ${config.title ?? ""}`,
      default: config.title ?? "",
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <GoogleAnalytics />
      </head>
      <body className={zenKakuGothicNew.className}>{children}</body>
    </html>
  );
}
