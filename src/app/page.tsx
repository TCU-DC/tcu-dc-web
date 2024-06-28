import type { Metadata } from "next";
import type { Top } from "@/types/microcms/top";
import type { Group } from "@/types/microcms/group";
import type { MicroCMSListResponse } from "microcms-js-sdk";
import { getTopSetting, getGroups } from "@/utils/microcms/getContents";

export async function generateMetadata(): Promise<Metadata> {
  const top: Top = await getTopSetting();
  return {
    description: top.description,
  };
}

export default async function Page() {
  const groups: MicroCMSListResponse<Group> = await getGroups();
  return (
    <div>
      {
        // Groups を map して表示
        groups.contents.map((group) => {
          return (
            <div key={group.id}>
              <div>{group.name}</div>
              <div>{group.description}</div>
            </div>
          );
        })
      }
    </div>
  );
}
