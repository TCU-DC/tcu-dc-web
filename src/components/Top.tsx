import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Heading from "@/components/Heading";
import LinkButton from "@/components/LinkButton";
import PostOutline from "@/components/PostOutline";
import TopIntroActivity from "@/components/TopIntroActivity";
import TopIntroGroup from "@/components/TopIntroGroup";
import type { Config } from "@/types/microcms/config";
import type { MicroCMSImage } from "@/types/microcms/microcms-schema";
import type { Post } from "@/types/microcms/post";
import { NoImage } from "@/utils/microcms/NoImage";
import type { MicroCMSListResponse } from "microcms-js-sdk";
import Image from "next/image";

function Top({
  config,
  posts,
}: {
  config: Config;
  posts: MicroCMSListResponse<Post>;
}) {
  return (
    <>
      <Header {...config}></Header>
      <div className="relative">
        <div className="absolute top-[calc(100dvh-(5rem+25rem))] z-30 ml-8 flex h-32 items-center rounded-sm bg-white pl-4 text-8xl font-bold text-black">
          <span className="bg-gradient-to-r from-[#05C0FF] to-[#0070D9] bg-clip-text text-transparent">
            世界
            <span className="text-black">を</span>創
          </span>
          るのは、
        </div>
        <div className="absolute top-[calc(100dvh-(5rem+15rem))] z-30 ml-8 flex h-32 items-center rounded-sm bg-white pl-4 text-8xl font-bold">
          <span className="bg-gradient-to-r from-[#05C0FF] to-[#0070D9] bg-clip-text text-transparent">
            君<span className="text-black">だ。</span>
          </span>
        </div>
        <div className="absolute right-20 top-[calc(100dvh-(5rem+15rem))] z-40 h-fit w-fit rounded-md bg-white px-12 pb-12 pt-10">
          <Heading heading="News" subheading="お知らせ" level="h2"></Heading>
          <div className="py-5">
            {
              // posts を map して表示
              posts.contents.map((post, i) => {
                return (
                  <>
                    <PostOutline
                      linkHref={`/post/${encodeURIComponent(post.id)}`}
                      image={
                        post.image
                          ? post.image
                          : NoImage.ogp(config.ogp, post.title ?? "")
                      }
                      headline={post.title ?? ""}
                      category={post.category}
                      date={post.publishedAt}
                    ></PostOutline>
                    {i !== posts.contents.length - 1 && (
                      // 最後の記事以外は区切り線を表示
                      <div className="flex justify-center px-10 py-2.5">
                        <span className="flex w-full border-b border-zinc-200"></span>
                      </div>
                    )}
                  </>
                );
              })
            }
          </div>
          <div className="flex flex-row-reverse">
            <LinkButton href="/post/list/1">もっとみる</LinkButton>
          </div>
        </div>

        <Image
          // w-80 は Tailwind で 20rem として定義されているため、100% - 20rem で w-full から w-80 を引いた横幅を表現
          // h-20 は Tailwind で 5rem と定義されているため、100dvh - 5rem と指定することで、ビューポートの高さから h-20 分を引いた高さを表現
          className="absolute z-20 h-[calc(100dvh-5rem)] w-[calc(100%-20rem)] rounded-br-3xl object-cover"
          src="https://picsum.photos/1082/960"
          alt="トップ画像"
          width={1082}
          height={960}
        />
        <svg
          preserveAspectRatio="none"
          className="absolute top-[calc(100dvh-25rem)] z-10"
          width="w-full"
          height="700"
          viewBox="0 0 1920 700"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 0H1920V662.503C1644.2 719.769 1384.42 701.773 1103.96 672.296C1015.01 662.947 798.037 614.159 711.431 592.482C478.387 534.152 238.537 520.2 0 551.724V0Z"
            fill="#F4F4F5"
          />
        </svg>
        <div className="absolute top-[calc(100dvh+5rem)] z-0 w-full">
          <div className="relative">
            <svg
              className="absolute z-0"
              width="500"
              height="500"
              viewBox="0 0 500 500"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 0H500C500 276.142 276.142 500 0 500V0Z"
                fill="url(#paint0_radial_270_421)"
              />
              <defs>
                <radialGradient
                  id="paint0_radial_270_421"
                  cx="0"
                  cy="0"
                  r="1"
                  gradientUnits="userSpaceOnUse"
                  gradientTransform="translate(250 250) rotate(90) scale(250)"
                >
                  <stop stop-color="#05C0FF" />
                  <stop offset="1" stop-color="#0070D9" />
                </radialGradient>
              </defs>
            </svg>
            <div className="absolute top-52 z-50 w-full">
              <div className="mx-36">
                <Heading heading="About" subheading="デジコンとは" level="h2">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: config.top?.aboutDesc ?? "",
                    }}
                  ></div>
                </Heading>
                <div className="mb-16 mt-8 flex flex-wrap justify-center gap-8">
                  {config.top &&
                    config.top.groups &&
                    config.top.groups.map((group) => {
                      // group.image[i].url を 配列にする
                      let image: MicroCMSImage[] = [];
                      if (group.image) {
                        for (let i = 0; i < group.image.length; i++) {
                          image.push(group.image[i]);
                        }
                      } else {
                        image.push(NoImage.white);
                      }
                      return (
                        <div key={group.id}>
                          <TopIntroGroup
                            heading={group.name ?? ""}
                            image={image}
                          >
                            <div
                              dangerouslySetInnerHTML={{
                                __html: group.description ?? "",
                              }}
                            ></div>
                          </TopIntroGroup>
                        </div>
                      );
                    })}
                </div>
              </div>
              <div className="bg-black text-white">
                <svg
                  preserveAspectRatio="none"
                  className="mt-0"
                  width="w-full"
                  height="80"
                  viewBox="0 0 1920 80"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0 -4.04102e-05L1920 0V0C1285.98 105.392 633.934 105.936 0 -4.04102e-05V-4.04102e-05Z"
                    fill="white"
                  />
                </svg>
                <div className="mx-36 h-96">
                  <div className="mb-8 mt-16">
                    <Heading
                      heading="Gallery"
                      subheading="作品紹介"
                      borderColor="white"
                      level="h2"
                    >
                      東京都市大学デジタルコンテンツ研究会の会員が制作した作品です。
                    </Heading>
                  </div>
                </div>
              </div>

              <div className="relative h-[500px] w-full bg-zinc-100">
                <svg
                  preserveAspectRatio="none"
                  // absolute を使用しているが、親要素の高さがコンテンツによって可変するため、500px まで bg-zinc-100 の背景色を指定する。超えた部分からは子要素で背景色指定に対応する。
                  className="absolute z-10"
                  width="w-full"
                  height="100"
                  viewBox="0 0 1920 100"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1920 87V87C1592.17 110.939 1262.76 101.752 936.773 59.5778L897.524 54.5V54.5C620.251 22.5849 340.428 19.3271 62.4876 44.778L0 50.5V0H1920V87Z"
                    fill="black"
                  />
                </svg>
                <svg
                  className="absolute z-0"
                  width="500"
                  height="500"
                  viewBox="0 0 500 500"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0 0H500C500 276.142 276.142 500 0 500V0Z"
                    fill="url(#paint0_radial_305_89)"
                  />
                  <defs>
                    <radialGradient
                      id="paint0_radial_305_89"
                      cx="0"
                      cy="0"
                      r="1"
                      gradientUnits="userSpaceOnUse"
                      gradientTransform="translate(209.5 280) rotate(90) scale(250)"
                    >
                      <stop stop-color="#05C0FF" />
                      <stop offset="1" stop-color="#0070D9" />
                    </radialGradient>
                  </defs>
                </svg>
                <div
                  // tyle属性の background は 292px = 500px - 208px（※TailWindの高さ t-52 が 208px 13rem）までは透明、超えた部分から背景色 rgb(244 244 245)（bg-zinc-100）を設定している。
                  // z-index の関係上500pxを超えた部分から以下の子要素に対して背景色を指定するため。
                  className="absolute top-52 z-20 w-full"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 292px, rgb(244 244 245) 292px,rgb(244 244 245) 100%)",
                  }}
                >
                  <div className="px-36">
                    <Heading
                      heading="Activities"
                      subheading="活動内容"
                      level="h2"
                    >
                      <div
                        dangerouslySetInnerHTML={{
                          __html: config.top?.activitiesDesc ?? "",
                        }}
                      ></div>
                    </Heading>
                    <div className="mb-16 mt-8 flex flex-wrap justify-center gap-8">
                      {config.top?.activities &&
                        config.top.activities.map((activity) => {
                          return (
                            <TopIntroActivity
                              key={activity.title}
                              heading={activity.title ?? ""}
                              image={
                                activity.image ? activity.image : NoImage.gray
                              }
                            >
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: activity.description ?? "",
                                }}
                              ></div>
                            </TopIntroActivity>
                          );
                        })}
                    </div>
                  </div>
                  <div className="bg-gradient-to-t from-[#0070D9] to-[#05C0FF] text-center">
                    <h3 className="pt-20 text-4xl font-bold text-white">
                      お問い合わせ
                    </h3>
                    <div
                      className={`mx-auto flex w-12 border-b-2 border-white pt-6`}
                    ></div>
                    <p className="pt-12 text-xl font-bold text-white">
                      ご不明な点はお気軽にお問い合わせください
                    </p>
                    <div className="flex justify-center gap-12 pt-20">
                      <LinkButton href="/contact" color="white">
                        フォームへ
                      </LinkButton>
                      <LinkButton href="/contact" color="white">
                        入会する
                      </LinkButton>
                    </div>
                    <svg
                      className="mt-20"
                      preserveAspectRatio="meet"
                      width="w-full"
                      height="h-fit"
                      viewBox="0 0 1920 281"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M1771.01 279.113H1833V61.7484H1918.72V11.2341H1685.29V61.7484H1771.01V279.113ZM1769.73 63.024V280.388H1834.28V63.024H1920V9.9585H1684.01V63.024H1769.73Z"
                        fill="black"
                        fill-opacity="0.8"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M1507.89 269.204C1525.75 275.838 1545.01 279.154 1565.68 279.154C1589.15 279.154 1610.19 275.072 1628.82 266.908C1647.7 258.744 1663.52 246.881 1676.27 231.319L1636.47 194.581C1636.19 194.905 1635.92 195.226 1635.64 195.546C1626.67 205.78 1616.74 213.495 1605.86 218.69C1594.63 223.793 1582.39 226.344 1569.12 226.344C1556.62 226.344 1545.14 224.303 1534.68 220.221C1524.22 216.139 1515.16 210.271 1507.51 202.617C1499.85 194.964 1493.86 185.907 1489.52 175.447C1485.44 164.987 1483.4 153.379 1483.4 140.623C1483.4 127.867 1485.44 116.258 1489.52 105.798C1493.86 95.3384 1499.85 86.2815 1507.51 78.6278C1515.16 70.9741 1524.22 65.1063 1534.68 61.0244C1545.14 56.9424 1556.62 54.9014 1569.12 54.9014C1582.39 54.9014 1594.63 57.5802 1605.86 62.9378C1616.74 67.8839 1626.66 75.3471 1635.63 85.3275C1635.91 85.643 1636.19 85.961 1636.47 86.2815L1676.27 49.5439C1663.52 33.9814 1647.7 22.2457 1628.82 14.3369C1610.19 6.17302 1589.27 2.09104 1566.06 2.09104C1545.14 2.09104 1525.88 5.53521 1508.27 12.4235C1490.67 19.0567 1475.23 28.6238 1461.97 41.1248C1448.96 53.6258 1438.75 68.2954 1431.35 85.1335C1424.21 101.972 1420.64 120.468 1420.64 140.623C1420.64 160.777 1424.21 179.274 1431.35 196.112C1438.75 212.95 1448.96 227.619 1461.97 240.12C1474.98 252.621 1490.29 262.316 1507.89 269.204ZM1629.32 13.165C1610.52 4.92337 1589.42 0.81543 1566.06 0.81543C1545 0.81543 1525.58 4.28226 1507.82 11.2321C1490.06 17.9227 1474.49 27.5775 1461.09 40.1964L1461.08 40.205C1447.95 52.8239 1437.65 67.6324 1430.19 84.6203L1430.18 84.6353C1422.96 101.646 1419.36 120.314 1419.36 140.623C1419.36 160.931 1422.96 179.599 1430.18 196.61L1430.19 196.625C1437.65 213.613 1447.95 228.421 1461.08 241.04C1474.22 253.663 1489.67 263.446 1507.43 270.392L1507.44 270.396L1507.45 270.4C1525.46 277.09 1544.87 280.43 1565.68 280.43C1589.3 280.43 1610.52 276.321 1629.33 268.077C1648.39 259.834 1664.37 247.849 1677.26 232.127L1678.02 231.197L1636.37 192.746L1635.5 193.751C1626.42 204.346 1616.36 212.263 1605.32 217.535C1594.27 222.552 1582.21 225.068 1569.12 225.068C1556.76 225.068 1545.44 223.051 1535.14 219.033C1524.84 215.012 1515.93 209.24 1508.41 201.715C1500.88 194.188 1494.98 185.277 1490.7 174.97C1486.69 164.68 1484.67 153.236 1484.67 140.623C1484.67 128.009 1486.69 116.566 1490.7 106.276C1494.98 95.9678 1500.88 87.057 1508.41 79.5298C1515.93 72.0055 1524.84 66.233 1535.14 62.2127C1545.44 58.1946 1556.76 56.177 1569.12 56.177C1582.21 56.177 1594.27 58.8187 1605.31 64.089L1605.32 64.0941L1605.33 64.099C1616.37 69.1176 1626.43 76.7814 1635.51 87.1231L1636.38 88.1059L1678.02 49.6654L1677.26 48.7352C1664.37 33.0117 1648.39 21.1528 1629.32 13.165Z"
                        fill="black"
                        fill-opacity="0.8"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M1113.02 279.112H1176.54L1200.41 221.709H1324.59L1348.37 279.112H1413.42L1293.64 11.2341H1232.41L1113.02 279.112ZM1219.99 174.639H1305.09L1262.62 72.1186L1219.99 174.639ZM1262.62 75.4463L1221.9 173.364H1303.18L1262.62 75.4463ZM1323.74 222.985L1347.51 280.387H1415.39L1294.47 9.9585H1231.59L1111.05 280.387H1177.39L1201.26 222.985H1323.74Z"
                        fill="black"
                        fill-opacity="0.8"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M980.605 279.113H1042.6V61.7484H1128.32V11.2341H894.884V61.7484H980.605V279.113ZM979.33 63.024V280.388H1043.88V63.024H1129.6V9.9585H893.608V63.024H979.33Z"
                        fill="black"
                        fill-opacity="0.8"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M667.335 11.2341H616.055V279.113H677.284V116.522L810.841 279.113H861.738V11.2341H800.509V173.751L667.335 11.2341ZM799.233 170.182L667.938 9.9585H614.779V280.388H678.56V120.085L810.238 280.388H863.014V9.9585H799.233V170.182Z"
                        fill="black"
                        fill-opacity="0.8"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M364.346 268.821C382.459 275.709 402.104 279.153 423.279 279.153C444.199 279.153 463.46 275.709 481.064 268.821C498.922 261.932 514.357 252.365 527.368 240.12C540.635 227.619 550.967 212.949 558.366 196.111C565.764 179.018 569.463 160.522 569.463 140.622C569.463 120.467 565.764 102.099 558.366 85.5158C550.967 68.6778 540.635 54.0083 527.368 41.5073C514.357 29.0064 498.922 19.3117 481.064 12.4234C463.46 5.5352 444.071 2.09104 422.896 2.09104C401.976 2.09104 382.587 5.5352 364.728 12.4234C346.87 19.3117 331.307 29.0064 318.041 41.5073C304.775 54.0083 294.442 68.6778 287.044 85.5158C279.9 102.354 276.329 120.723 276.329 140.622C276.329 160.522 279.9 178.89 287.044 195.728C294.442 212.566 304.647 227.236 317.658 239.737C330.925 252.238 346.487 261.932 364.346 268.821ZM528.247 40.583C541.636 53.2003 552.065 68.0083 559.531 84.9979C567.01 101.761 570.739 120.309 570.739 140.622C570.739 160.684 567.009 179.354 559.536 196.618L559.533 196.624C552.067 213.617 541.635 228.429 528.243 241.048L528.243 241.048C515.103 253.415 499.524 263.067 481.523 270.011C463.758 276.962 444.338 280.429 423.279 280.429C401.963 280.429 382.163 276.961 363.892 270.013L363.886 270.011C345.882 263.066 330.176 253.285 316.783 240.665L316.774 240.657C303.641 228.038 293.34 213.229 285.876 196.242L285.869 196.227C278.653 179.218 275.053 160.678 275.053 140.622C275.053 120.567 278.653 102.027 285.869 85.0176L285.876 85.0026C293.343 68.0094 303.774 53.1984 317.166 40.579C330.559 27.959 346.264 18.1781 364.269 11.2333C382.287 4.28349 401.834 0.81543 422.896 0.81543C444.211 0.81543 463.76 4.28275 481.528 11.2355C499.531 18.1801 515.109 27.9611 528.247 40.583ZM455.807 220.22C445.857 224.302 434.887 226.343 422.896 226.343C410.905 226.343 399.807 224.302 389.603 220.22C379.398 216.138 370.468 210.27 362.815 202.617C355.416 194.963 349.548 185.906 345.211 175.446C341.129 164.731 339.088 153.123 339.088 140.622C339.088 127.866 341.129 116.258 345.211 105.798C349.548 95.338 355.544 86.2812 363.197 78.6275C370.851 70.9739 379.653 65.1061 389.603 61.0241C399.807 56.9422 410.905 54.9012 422.896 54.9012C434.887 54.9012 445.984 56.9422 456.189 61.0241C466.394 65.1061 475.196 70.9739 482.594 78.6275C490.248 86.2812 496.116 95.338 500.198 105.798C504.535 116.258 506.703 127.866 506.703 140.622C506.703 153.378 504.535 164.986 500.198 175.446C496.116 185.906 490.248 194.963 482.594 202.617C474.941 210.27 466.012 216.138 455.807 220.22ZM390.079 62.2076C400.119 58.1918 411.054 56.1768 422.896 56.1768C434.739 56.1768 445.675 58.1921 455.716 62.2085C465.759 66.2258 474.408 71.9941 481.677 79.5141L481.685 79.5219L481.692 79.5295C489.217 87.0537 494.989 95.9598 499.009 106.262L499.014 106.274L499.019 106.287C503.285 116.573 505.428 128.013 505.428 140.622C505.428 153.232 503.285 164.671 499.019 174.958L499.014 174.97L499.009 174.982C494.989 185.284 489.217 194.19 481.692 201.715C474.163 209.244 465.38 215.017 455.333 219.036L455.322 219.04C445.543 223.052 434.74 225.067 422.896 225.067C411.053 225.067 400.117 223.052 390.076 219.036C380.033 215.018 371.252 209.248 363.724 201.722C356.451 194.196 350.674 185.285 346.397 174.974C342.379 164.422 340.364 152.975 340.364 140.622C340.364 128.008 342.381 116.564 346.395 106.274C350.671 95.9665 356.573 87.0563 364.099 79.5295C371.632 71.9967 380.29 66.2249 390.079 62.2076Z"
                        fill="black"
                        fill-opacity="0.8"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M88.5276 269.204C106.386 275.838 125.648 279.154 146.313 279.154C169.784 279.154 190.832 275.072 209.456 266.908C228.335 258.744 244.152 246.881 256.908 231.319L217.11 194.581C216.832 194.905 216.553 195.226 216.274 195.546C207.307 205.78 197.381 213.495 186.495 218.69C175.269 223.793 163.023 226.344 149.757 226.344C137.256 226.344 125.775 224.303 115.315 220.221C104.855 216.139 95.7985 210.271 88.1449 202.617C80.4912 194.964 74.4958 185.907 70.1587 175.447C66.0768 164.987 64.0358 153.379 64.0358 140.623C64.0358 127.867 66.0768 116.258 70.1587 105.798C74.4958 95.3384 80.4912 86.2815 88.1449 78.6278C95.7985 70.9741 104.855 65.1063 115.315 61.0244C125.775 56.9424 137.256 54.9014 149.757 54.9014C163.023 54.9014 175.269 57.5802 186.495 62.9378C197.376 67.8839 207.299 75.3471 216.262 85.3275C216.545 85.6429 216.828 85.9609 217.109 86.2813C217.109 86.2812 217.109 86.2814 217.109 86.2813L256.908 49.5439C244.152 33.9814 228.335 22.2457 209.456 14.3369C190.832 6.17302 169.912 2.09104 146.696 2.09104C125.775 2.09104 106.514 5.53521 88.9102 12.4235C71.3068 19.0567 55.8719 28.6238 42.6055 41.1248C29.5942 53.6258 19.3893 68.2954 11.9908 85.1335C4.84733 101.972 1.27561 120.468 1.27561 140.623C1.27561 160.777 4.84733 179.274 11.9908 196.112C19.3893 212.95 29.5942 227.619 42.6055 240.12C55.6167 252.621 70.9241 262.316 88.5276 269.204ZM209.958 13.1644C191.154 4.92318 170.059 0.81543 146.696 0.81543C125.636 0.81543 106.217 4.28257 88.452 11.233C70.6994 17.9235 55.1216 27.578 41.7306 40.1964L41.7217 40.205C28.5877 52.8239 18.2873 67.6324 10.8228 84.6203L10.8165 84.6353C3.59965 101.646 0 120.314 0 140.623C0 160.931 3.59965 179.599 10.8164 196.61L10.8229 196.625C18.2873 213.613 28.5877 228.421 41.7217 241.04C54.8594 253.663 70.3109 263.446 88.0627 270.392L88.073 270.396L88.0834 270.4C106.096 277.09 125.509 280.43 146.313 280.43C169.933 280.43 191.159 276.321 209.968 268.077C229.027 259.834 245.008 247.849 257.895 232.127L258.657 231.197L217.002 192.746L216.141 193.751C207.059 204.346 196.996 212.263 185.955 217.534C174.911 222.552 162.851 225.068 149.757 225.068C137.397 225.068 126.076 223.051 115.779 219.033C105.477 215.012 96.5711 209.24 89.0469 201.715C81.52 194.189 75.6178 185.278 71.3422 174.971C67.3284 164.68 65.3114 153.236 65.3114 140.623C65.3114 128.009 67.3285 116.565 71.3422 106.275C75.6178 95.9671 81.52 87.0567 89.0469 79.5298C96.5711 72.0055 105.477 66.233 115.779 62.2127C126.076 58.1946 137.397 56.177 149.757 56.177C162.846 56.177 174.903 58.8187 185.945 64.089L185.956 64.0941L185.967 64.099C197.008 69.1176 207.07 76.7814 216.151 87.1231L217.014 88.1059L258.657 49.6654L257.895 48.7352C245.007 33.0113 229.022 21.1522 209.958 13.1644Z"
                        fill="black"
                        fill-opacity="0.8"
                      />
                    </svg>
                  </div>
                  <Footer {...config}></Footer>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Top;
