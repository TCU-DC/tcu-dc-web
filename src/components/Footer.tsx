import type { Config } from "@/types/microcms/config";
import Image from "next/image";
import Link from "next/link";

const Footer = (config: Config) => {
  return (
    <div className="bg-black">
      <div className="py-6 pl-8 text-zinc-400">
        <div className="flex items-center">
          <Link href="/">
            <Image
              className="transition duration-500 hover:opacity-50"
              src="/dc_logo_white.svg"
              alt="東京都市大学デジタルコンテンツ研究会"
              width="307"
              height="48"
            />
          </Link>
          <div className="mx-9 h-4 w-0.5 bg-white"></div>
          <Link href="https://x.com/tcu_dc" target="_blank">
            <Image
              className="transition duration-500 hover:opacity-50"
              src="/x_logo_white.svg"
              alt="X（SNS）"
              width="40"
              height="36"
            />
          </Link>
        </div>
        <div className="flex items-center pt-6">
          <p>©︎2014-2023 東京都市大学デジタルコンテンツ研究会</p>
          <div className="mx-3 h-3 w-px bg-zinc-400"></div>
          <Link href="/privacy-policy">プライバシーポリシー</Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
