import Link from "next/link";

type color = "black" | "gray" | "white" | "gradation";

function CategoryTag({
  children,
  theme = "black",
  linkHref,
}: {
  children: React.ReactNode;
  theme?: color;
  linkHref?: string;
}) {
  let bgColor, textColor;

  switch (theme) {
    case "white":
      bgColor = "bg-white";
      textColor = "text-black";
      break;
    case "gray":
      bgColor = "bg-zinc-200";
      textColor = "text-black";
      break;
    case "gradation":
      bgColor = "bg-gradient-to-r from-[#05C0FF] to-[#0070D9]";
      textColor = "text-white";
      break;
    default:
    case "black":
      bgColor = "bg-black";
      textColor = "text-white";
      break;
  }
  const isButton = !!linkHref;

  const Category = (
    <div
      className={`${isButton && `transition duration-500 hover:bg-zinc-300`} ${bgColor} ${textColor} mt-2 flex h-7 w-fit shrink-0 items-center rounded-sm px-2 text-sm font-bold sm:text-base`}
    >
      <span className="line-clamp-1">{children}</span>
    </div>
  );

  return isButton ? <Link href={linkHref}>{Category}</Link> : Category;
}

export default CategoryTag;
