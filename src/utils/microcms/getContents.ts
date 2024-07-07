import type { MicroCMSListResponse } from "microcms-js-sdk";
import type { MicroCMSQueries } from "microcms-js-sdk";
import type { Group } from "@/types/microcms/group";
import type { Member } from "@/types/microcms/member";
import type { Page } from "@/types/microcms/page";
import type { Post } from "@/types/microcms/post";
import type { PostCategory } from "@/types/microcms/post_category";
import type { Config } from "@/types/microcms/config";
import type { Work } from "@/types/microcms/work";
import { apiClient } from "@/libs/apiClient";

export const getGroups = (queries?: MicroCMSQueries) =>
  apiClient.getList<Group>({ endpoint: "groups", queries });
export const getGroup = (queries?: MicroCMSQueries) => (contentId: string) =>
  apiClient.getListDetail<Group>({
    endpoint: "groups",
    contentId,
    queries,
  });

export const getMembers = (queries?: MicroCMSQueries) =>
  apiClient.getList<Member>({ endpoint: "members", queries });
export const getMember = (queries?: MicroCMSQueries) => (contentId: string) =>
  apiClient.getListDetail<Member>({
    endpoint: "members",
    contentId,
    queries,
  });

export const getPages = (queries?: MicroCMSQueries) =>
  apiClient.getList<Page>({ endpoint: "pages", queries });
export const getPage = (queries?: MicroCMSQueries) => (contentId: string) =>
  apiClient.getListDetail<Page>({
    endpoint: "pages",
    contentId,
    queries,
  });
export const getPageIds = () =>
  apiClient.getAllContentIds({ endpoint: "pages" });

export const getPosts = (queries?: MicroCMSQueries) =>
  apiClient.getList<Post>({ endpoint: "posts", queries });
export const getPost = (queries?: MicroCMSQueries) => (contentId: string) =>
  apiClient.getListDetail<Post>({
    endpoint: "posts",
    contentId,
    queries,
  });
export const getPostIds = () =>
  apiClient.getAllContentIds({ endpoint: "posts" });

export const getPostCategories = (queries?: MicroCMSQueries) =>
  apiClient.getList<PostCategory>({ endpoint: "post_categories", queries });
export const getPostCategory =
  (queries?: MicroCMSQueries) => (contentId: string) =>
    apiClient.getListDetail<PostCategory>({
      endpoint: "post_categories",
      contentId,
      queries,
    });
export const getPostCategoryIds = () =>
  apiClient.getAllContentIds({ endpoint: "post_categories" });

export const getConfig = (queries?: MicroCMSQueries) =>
  apiClient.getListDetail<Config>({
    endpoint: "config",
    contentId: "all",
    queries,
  });
export const getWorks = (queries?: MicroCMSQueries) =>
  apiClient.getList<Work>({ endpoint: "works", queries });
export const getWork = (queries?: MicroCMSQueries) => (contentId: string) =>
  apiClient.getListDetail<Work>({
    endpoint: "works",
    contentId,
    queries,
  });

/**
 * ページネーションとカテゴリフィルターを適用した記事一覧取得
 */
export async function getPostsPaginated(
  currentPage: number = 1,
  limit: number = 10,
  categoryId?: string,
): Promise<{ posts: MicroCMSListResponse<Post>; pager: number[] }> {
  const posts = await getPosts({
    limit,
    offset: (currentPage - 1) * limit,
    filters: categoryId ? `category[equals]${categoryId}` : "",
  });
  // 最大のページ数を計算
  const maxPage = Math.ceil(posts.totalCount / limit);
  // ページャーの配列を作成
  const pager = Array.from({ length: maxPage }, (_, i) => i + 1);

  return { posts, pager };
}
