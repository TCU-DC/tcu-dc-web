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
  children: React.ReactNode;
}) {
  const tailWindClassNameBorderColor =
    borderColor === "black" ? "border-black" : "border-white";
  return (
    <>
      <h2 className="font-semibold text-4xl">{headingEn}</h2>
      <div className="flex items-center">
        <div
          className={`flex w-8 mr-2 border-b ${tailWindClassNameBorderColor}`}
        ></div>
        <span className="text-base">{headingJa}</span>
      </div>
      <p className="font-semibold text-xl mt-4 ml-4">{children}</p>
    </>
  );
}

export default TopIntroHeading;
