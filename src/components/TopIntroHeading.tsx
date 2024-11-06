type color = "black" | "white";

function TopIntroHeading({
  headingEn,
  headingJa,
  borderColor = "black",
  children,
}: {
  headingEn: string;
  headingJa: string;
  borderColor?: color;
  children?: React.ReactNode;
}) {
  const tailWindClassNameBorderColor =
    borderColor === "black" ? "border-black" : "border-white";
  return (
    <>
      <h2 className="text-4xl font-bold">{headingEn}</h2>
      <div className="flex items-center">
        <span
          className={`mr-2 flex w-8 border-b ${tailWindClassNameBorderColor}`}
        ></span>
        <span className="text-base">{headingJa}</span>
      </div>
      {children && <p className="ml-4 mt-4 text-xl font-bold">{children}</p>}
    </>
  );
}

export default TopIntroHeading;
