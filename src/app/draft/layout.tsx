import DraftModeBanner from "@/components/DraftModeBanner";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <DraftModeBanner />
      {children}
    </>
  );
}
