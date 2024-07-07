import type { Metadata } from "next";
import type { Config } from "@/types/microcms/config";
import type { Group } from "@/types/microcms/group";
import type { MicroCMSListResponse } from "microcms-js-sdk";
import { getConfig, getGroups } from "@/utils/microcms/getContents";

export async function generateMetadata(): Promise<Metadata> {
  const config: Config = await getConfig();
  return {
    description: config.description,
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
