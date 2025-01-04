import type { CustomLink } from "@/types/customLink";
import Link from "next/link";

type color = "black" | "white";

function HeaderLink({
  link,
  theme = "white",
}: {
  link: CustomLink;
  theme?: color;
}) {
  let textColor, textColorSub;
  switch (theme) {
    case "black":
      textColor = "text-zinc-100";
      textColorSub = "text-zinc-400";
      break;
    default:
    case "white":
      textColor = "text-black";
      textColorSub = "text-zinc-500";
      break;
  }

  return (
    <Link
      href={link.link ?? ""}
      className={`${textColor} flex min-w-64 flex-col items-center px-3 text-base transition duration-500 hover:opacity-50 lg:min-w-36 xl:min-w-40`}
      // 外部リンクの場合は target="_blank" を付与
      target={link.fieldId === "externalLink" ? "_blank" : undefined}
    >
      <span className="font-bold">{link?.title}</span>
      <span className={`${textColorSub}`}>{link?.englishTitle}</span>
    </Link>
  );
}

export default HeaderLink;
