import type { CustomLink } from "@/types/customLink";
import Link from "next/link";

function HeaderLink({ link }: { link: CustomLink }) {
  const href =
    link?.fieldId === "externalLink"
      ? (link?.link ?? "")
      : `${link?.fieldId === "postLink" ? "/post/" : "/"}${link?.link ?? ""}`;
  return (
    <Link
      href={href}
      className="flex min-w-40 flex-col items-center px-3 text-base text-black"
    >
      <span className="font-bold">{link?.title}</span>
      <span className="text-gray-500">{link?.englishTitle}</span>
    </Link>
  );
}

export default HeaderLink;
