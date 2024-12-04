import Footer from "@/components/Footer";
import Header from "@/components/Header";
import type { Config } from "@/types/microcms/config";
import { getConfig } from "@/utils/microcms/getContents";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const config: Config = await getConfig();
  return (
    <>
      <Header {...config}></Header>
      {children}
      <Footer {...config}></Footer>
    </>
  );
}
