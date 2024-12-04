type color = "black" | "white";
type levels = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

function Heading({
  heading,
  subheading,
  borderColor = "black",
  children,
  level = "h1",
}: {
  heading: string;
  subheading?: string;
  borderColor?: color;
  children?: React.ReactNode;
  level?: levels;
}) {
  const tailWindClassNameBorderColor =
    borderColor === "black" ? "border-black" : "border-white";
  const headingClassName = "text-3xl sm:text-4xl font-bold";
  return (
    <>
      {level === "h1" && <h1 className={headingClassName}>{heading}</h1>}
      {level === "h2" && <h2 className={headingClassName}>{heading}</h2>}
      {level === "h3" && <h3 className={headingClassName}>{heading}</h3>}
      {level === "h4" && <h4 className={headingClassName}>{heading}</h4>}
      {level === "h5" && <h5 className={headingClassName}>{heading}</h5>}
      {level === "h6" && <h6 className={headingClassName}>{heading}</h6>}
      {subheading && (
        <div className="flex items-center">
          <span
            className={`mr-2 flex w-8 border-b ${tailWindClassNameBorderColor}`}
          ></span>
          <span className="text-sm sm:text-base">{subheading}</span>
        </div>
      )}
      {children && (
        <div className="ml-4 mt-4 text-lg font-bold sm:text-xl">{children}</div>
      )}
    </>
  );
}

export default Heading;
