import Heading from "@/components/Heading";
import type { Page } from "@/types/microcms/page";
import type { MicroCMSContentId, MicroCMSDate } from "microcms-js-sdk";

function Page({ page }: { page: Page & MicroCMSContentId & MicroCMSDate }) {
  return (
    <div className="bg-zinc-100 pb-16 pt-32">
      <div className="mx-auto w-[848px] rounded bg-white p-20">
        <Heading heading={page.title ?? ""} level="h1"></Heading>
        <article
          className="prose mt-10 !max-w-none"
          dangerouslySetInnerHTML={{ __html: page.body ?? "" }}
        ></article>
      </div>
    </div>
  );
}

export default Page;
