import type {
  Config,
  ConfigCustomFieldFooterLinks,
} from "@/types/microcms/config";
import { normalizedCustomFieldLink } from "@/utils/microcms/normalizedCustomFieldLink";
import Image from "next/image";
import Link from "next/link";

const Footer = (config: Config) => {
  const footerLink = (links?: ConfigCustomFieldFooterLinks) => (
    <div className="w-1/2 pb-6 pr-6 md:w-1/4">
      <ul className="flex flex-col gap-2 text-sm sm:text-base">
        <li className="font-bold">{links?.title}</li>
        <ul className="flex flex-col gap-1">
          {links?.links &&
            links.links.map((link) => (
              <li key={link.fieldId}>
                <Link
                  href={normalizedCustomFieldLink(link).link ?? ""}
                  className="line-clamp-1"
                  // isTargetBlank が true の場合は target="_blank" を付与
                  target={
                    normalizedCustomFieldLink(link).isTargetBlank
                      ? "_blank"
                      : undefined
                  }
                >
                  {normalizedCustomFieldLink(link).title ?? ""}
                </Link>
              </li>
            ))}
        </ul>
      </ul>
    </div>
  );

  return (
    <div className="bg-black">
      <div className="px-2 py-6 text-zinc-400 sm:px-8">
        <div className="flex items-center">
          <Link href="/">
            <Image
              className="transition duration-500 hover:opacity-50"
              src="/dc_logo_white.svg"
              alt="東京都市大学デジタルコンテンツ研究会ロゴ"
              width="307"
              height="48"
            />
          </Link>
        </div>
        <div>
          <div className="flwx-row flex flex-wrap pt-6 lg:w-[1024px] hover:[&_a]:underline">
            {footerLink(config.footerLinks01)}
            {footerLink(config.footerLinks02)}
            {footerLink(config.footerLinks03)}
            {footerLink(config.footerLinks04)}
          </div>
          <div className="text-sm sm:text-base">
            <p>
              ©︎ 2014-{new Date().getFullYear()}{" "}
              東京都市大学デジタルコンテンツ研究会
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
