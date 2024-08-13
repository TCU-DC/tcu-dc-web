import type { CustomLink } from "@/types/customLink";
import Link from "next/link";

function NavbarLink({ link }: { link: CustomLink }) {
  const href =
    link?.fieldId === "externalLink"
      ? link?.link ?? ""
      : `${link?.fieldId === "postLink" ? "/post/" : "/"}${link?.link ?? ""}`;
  return (
    <Link
      href={href}
      className="flex flex-col items-center text-black text-sm px-3"
    >
      <span className="font-bold">{link?.title}</span>
      <span className="text-xs text-gray-500">{link?.englishTitle}</span>
    </Link>
  );
}

export default NavbarLink;
