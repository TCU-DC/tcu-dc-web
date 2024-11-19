import type { CustomLink } from "@/types/customLink";
import Link from "next/link";

function HeaderLink({ link }: { link: CustomLink }) {
  const href =
    link?.fieldId === "externalLink"
      ? (link?.link ?? "")
      : `${link?.fieldId === "postLink" ? "/posts/" : "/"}${link?.link ?? ""}`;
  return (
    <Link
      href={href}
      className="flex flex-col items-center px-3 text-base text-black transition duration-500 hover:opacity-50 lg:min-w-36 xl:min-w-40"
    >
      <span className="font-bold">{link?.title}</span>
      <span className="text-zinc-500">{link?.englishTitle}</span>
    </Link>
  );
}

export default HeaderLink;
