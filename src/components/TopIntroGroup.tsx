function TopIntroGroup({
  heading,
  imageSrc,
  children,
}: {
  heading: string;
  imageSrc: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative h-96 w-96 rounded-sm bg-gray-100">
      <div className="absolute z-0 h-12 w-12">
        <svg
          className="h-full w-full rounded-tl-sm"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0 0H48L0 48V0Z" fill="url(#paint0_linear_270_428)" />
          <defs>
            <linearGradient
              id="paint0_linear_270_428"
              x1="0"
              y1="0"
              x2="48"
              y2="0"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#05C0FF" />
              <stop offset="1" stop-color="#0070D9" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div className="absolute z-10 h-96 w-96 p-8">
        <h3 className="text-4xl font-bold">{heading}</h3>
        <p className="mt-4 text-base">{children}</p>
      </div>
      <img
        src={imageSrc}
        className="absolute bottom-0 z-0 m-8 h-48 w-80 rounded-sm object-cover"
      />
    </div>
  );
}

export default TopIntroGroup;
