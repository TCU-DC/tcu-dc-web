import Footer from "@/components/Footer";
import Header from "@/components/Header";
import type { Config } from "@/types/microcms/config";
import { getConfig } from "@/utils/microcms/getContents";
import type { Metadata } from "next";
import { Zen_Kaku_Gothic_New } from "next/font/google";
import "./globals.css";

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
  const config: Config = await getConfig();
  return (
    <html lang="ja">
      <body className={zenKakuGothicNew.className}>
        <Header {...config}></Header>
        {children}
        <Footer {...config}></Footer>
      </body>
    </html>
  );
}
