import { MicroCMSQueries } from "microcms-js-sdk";
import { Top } from "@/types/microcms/top";
import { apiClient } from "@/libs/apiClient";

export const getTopSetting = (queries?: MicroCMSQueries) =>
  apiClient.getObject<Top>({ endpoint: "top/setting", queries });
