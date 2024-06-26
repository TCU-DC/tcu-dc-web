import type { Metadata } from "next";
import type { Top } from "@/types/microcms/top";
import { Inter } from "next/font/google";
import "./globals.css";
import { getTopSetting } from "@/utils/microcms/getContents";
import Banner from "@/components/Banner";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export async function generateMetadata(): Promise<Metadata> {
  const top: Top = await getTopSetting();
  return {
    title: {
      template: "%s | " + top.title,
      default: top.title ?? "",
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const top: Top = await getTopSetting();
  return (
    <html lang="ja">
      <body className={inter.className}>
        <Banner {...top}></Banner>
        {children}
        <Footer {...top}></Footer>
      </body>
    </html>
  );
}
