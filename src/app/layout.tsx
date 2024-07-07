import type { Metadata } from "next";
import type { Config } from "@/types/microcms/config";
import { Inter } from "next/font/google";
import "./globals.css";
import { getConfig } from "@/utils/microcms/getContents";
import Banner from "@/components/Banner";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

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
      <body className={inter.className}>
        <Banner {...config}></Banner>
        {children}
        <Footer {...config}></Footer>
      </body>
    </html>
  );
}
