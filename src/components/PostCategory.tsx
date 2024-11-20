import Link from "next/link";

type color = "black" | "gray";

function PostCategory({
  children,
  color = "black",
  linkHref,
}: {
  children: React.ReactNode;
  color?: color;
  linkHref?: string;
}) {
  const bgColor = color === "black" ? "bg-black" : "bg-zinc-200";
  const textColor = color === "black" ? "text-white" : "text-black";
  const isButton = !!linkHref;

  const Category = (
    <div
      className={`${isButton && `transition duration-500 hover:bg-zinc-300`} ${bgColor} ${textColor} mt-2 flex h-7 w-fit items-center rounded-sm px-2 text-base font-bold`}
    >
      {children}
    </div>
  );

  return isButton ? <Link href={linkHref}>{Category}</Link> : Category;
}

export default PostCategory;
