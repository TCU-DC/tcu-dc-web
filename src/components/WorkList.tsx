import CategoryTag from "@/components/CategoryTag";
import Heading from "@/components/Heading";
import Pagination from "@/components/Pagination";
import WorkOutline from "@/components/WorkOutline";
import type { Group } from "@/types/microcms/group";
import type { Work } from "@/types/microcms/work";
import { NoImage } from "@/utils/microcms/NoImage";
import type { MicroCMSContentId, MicroCMSListResponse } from "microcms-js-sdk";

function WorkList({
  works,
  worksPaginated,
  worksCountsByGroup,
  currentPage,
  groupId,
}: {
  works: MicroCMSListResponse<Work>;
  worksPaginated: {
    works: MicroCMSListResponse<Work>;
    pager: number[];
  };
  worksCountsByGroup: {
    group: Group & MicroCMSContentId;
    count: number;
  }[];
  currentPage: number;
  groupId?: string;
}) {
  const workGroupLink = (c: {
    group: Group & MicroCMSContentId;
    count: number;
  }) => {
    if (c.group.id === groupId || (!c.group.id && !groupId)) {
      return (
        <CategoryTag theme="gradation">
          {c.group.name}: {c.count}
        </CategoryTag>
      );
    } else {
      return (
        <CategoryTag
          theme="gray"
          linkHref={`/works/list/${c.group.id ? `${c.group.id}/` : ""}1`}
        >
          {c.group.name}: {c.count}
        </CategoryTag>
      );
    }
  };

  return (
    <div className="bg-zinc-900 py-8 text-zinc-200 md:pb-16 md:pt-20 lg:pt-32">
      <div className="mx-2 rounded bg-black px-4 py-8 sm:mx-8 sm:p-8 sm:px-12 sm:pb-12 sm:pt-10 md:mx-20 lg:mx-auto lg:w-fit">
        <Heading
          heading="Gallery"
          subheading="作品一覧"
          borderColor="white"
        ></Heading>
        <div className="mt-5"></div>
        <div className="flex flex-wrap gap-2">
          {workGroupLink({
            group: { id: "", name: "All" },
            count: worksCountsByGroup
              .map((c) => c.count)
              .reduce((a, b) => a + b),
          })}
          {worksCountsByGroup
            .sort((a, b) => b.count - a.count)
            .map((group) => {
              return group.count > 0 ? workGroupLink(group) : null;
            })}
        </div>
        <div className="mb-12 mt-5 flex justify-center">
          <Pagination
            hrefBase={`/works/list/${groupId ? `${groupId}/` : ""}`}
            pager={worksPaginated.pager}
            currentPage={currentPage}
            maxDisplay={3}
            theme="black"
          />
        </div>
        <div>
          {
            // works を map して表示
            works.contents.map((work, i) => {
              return (
                <>
                  <WorkOutline
                    linkHref={`/works/${encodeURIComponent(work.id)}`}
                    image={work.images ? work.images[0] : NoImage.gray}
                    headline={work.title ?? ""}
                    category={work.group}
                    author={work.author.map((a) => a.name).join(", ") ?? ""}
                  ></WorkOutline>
                  {i !== works.contents.length - 1 && (
                    // 最後の記事以外は区切り線を表示
                    <div className="flex justify-center px-10 py-2.5">
                      <span className="flex w-full border-b border-zinc-600"></span>
                    </div>
                  )}
                </>
              );
            })
          }
        </div>
        <div className="mt-12 flex justify-center">
          <Pagination
            hrefBase={`/works/list/${groupId ? `${groupId}/` : ""}`}
            pager={worksPaginated.pager}
            currentPage={currentPage}
            maxDisplay={3}
            theme="black"
          />
        </div>
      </div>
    </div>
  );
}

export default WorkList;
