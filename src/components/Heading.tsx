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
  return (
    <>
      {level === "h1" && <h1 className="text-4xl font-bold">{heading}</h1>}
      {level === "h2" && <h2 className="text-4xl font-bold">{heading}</h2>}
      {level === "h3" && <h3 className="text-4xl font-bold">{heading}</h3>}
      {level === "h4" && <h4 className="text-4xl font-bold">{heading}</h4>}
      {level === "h5" && <h5 className="text-4xl font-bold">{heading}</h5>}
      {level === "h6" && <h6 className="text-4xl font-bold">{heading}</h6>}
      {subheading && (
        <div className="flex items-center">
          <span
            className={`mr-2 flex w-8 border-b ${tailWindClassNameBorderColor}`}
          ></span>
          <span className="text-base">{subheading}</span>
        </div>
      )}
      {children && (
        <div className="ml-4 mt-4 text-xl font-bold">{children}</div>
      )}
    </>
  );
}

export default Heading;
