import Link from "next/link";

type color = "black" | "white" | "gradation";

function LinkButton({
  href,
  children,
  color = "black",
}: {
  href: string;
  children: React.ReactNode;
  color?: color;
}) {
  let bgColor = "";
  let textColor = "";
  let svgColor = "";
  if (color === "black") {
    bgColor = "bg-black";
    textColor = "text-white";
    svgColor = "white";
  } else if (color === "white") {
    bgColor = "bg-white";
    textColor = "text-black";
    svgColor = "black";
  } else {
    bgColor = "bg-gradient-to-r from-[#05C0FF] to-[#0070D9]";
    textColor = "text-white";
    svgColor = "white";
  }

  return (
    <Link
      href={href}
      className={`${bgColor} ${color === "black" ? "hover:bg-zinc-800" : "hover:bg-zinc-200"} flex h-16 w-64 cursor-pointer items-center rounded transition duration-500 hover:scale-105`}
    >
      <svg
        className="shrink-0"
        width="97"
        height="16"
        viewBox="0 0 97 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M96.7071 8.70711C97.0976 8.31658 97.0976 7.68342 96.7071 7.29289L90.3431 0.928932C89.9526 0.538408 89.3195 0.538408 88.9289 0.928932C88.5384 1.31946 88.5384 1.95262 88.9289 2.34315L94.5858 8L88.9289 13.6569C88.5384 14.0474 88.5384 14.6805 88.9289 15.0711C89.3195 15.4616 89.9526 15.4616 90.3431 15.0711L96.7071 8.70711ZM0 9L96 9V7L0 7L0 9Z"
          fill={svgColor}
        />
      </svg>
      <div>
        <p
          className={`flex w-40 justify-center text-lg font-bold sm:text-xl ${textColor}`}
        >
          {children}
        </p>
      </div>
    </Link>
  );
}

export default LinkButton;
