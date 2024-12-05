import { apiClient } from "@/libs/apiClient";
import type { Config } from "@/types/microcms/config";
import type { Group } from "@/types/microcms/group";
import type { Member } from "@/types/microcms/member";
import type { Page } from "@/types/microcms/page";
import type { Post } from "@/types/microcms/post";
import type { PostCategory } from "@/types/microcms/post_category";
import type { Work } from "@/types/microcms/work";
import type {
  MicroCMSContentId,
  MicroCMSListResponse,
  MicroCMSQueries,
} from "microcms-js-sdk";

export const getGroups = async (queries?: MicroCMSQueries) => {
  try {
    return await apiClient.getList<Group>({ endpoint: "groups", queries });
  } catch (error) {
    console.error("Failed to fetch groups:", error);
    throw error;
  }
};

export const getGroup =
  (queries?: MicroCMSQueries) => async (contentId: string) => {
    try {
      return await apiClient.getListDetail<Group>({
        endpoint: "groups",
        contentId,
        queries,
      });
    } catch (error) {
      console.error(
        `Failed to fetch group with contentId ${contentId}:`,
        error,
      );
      throw error;
    }
  };
export const getGroupIds = async () => {
  try {
    return await apiClient.getAllContentIds({ endpoint: "groups" });
  } catch (error) {
    console.error("Failed to fetch post category IDs:", error);
    throw error;
  }
};

export const getMembers = async (queries?: MicroCMSQueries) => {
  try {
    return await apiClient.getList<Member>({ endpoint: "members", queries });
  } catch (error) {
    console.error("Failed to fetch members:", error);
    throw error;
  }
};

export const getMember =
  (queries?: MicroCMSQueries) => async (contentId: string) => {
    try {
      return await apiClient.getListDetail<Member>({
        endpoint: "members",
        contentId,
        queries,
      });
    } catch (error) {
      console.error(
        `Failed to fetch member with contentId ${contentId}:`,
        error,
      );
      throw error;
    }
  };

export const getPages = async (queries?: MicroCMSQueries) => {
  try {
    return await apiClient.getList<Page>({ endpoint: "pages", queries });
  } catch (error) {
    console.error("Failed to fetch pages:", error);
    throw error;
  }
};
export const getPage =
  (queries?: MicroCMSQueries) => async (contentId: string) => {
    try {
      return await apiClient.getListDetail<Page>({
        endpoint: "pages",
        contentId,
        queries,
      });
    } catch (error) {
      console.error(`Failed to fetch page with contentId ${contentId}:`, error);
      throw error;
    }
  };
export const getPageIds = async () => {
  try {
    return await apiClient.getAllContentIds({ endpoint: "pages" });
  } catch (error) {
    console.error("Failed to fetch page IDs:", error);
    throw error;
  }
};

export const getPosts = async (queries?: MicroCMSQueries) => {
  try {
    return await apiClient.getList<Post>({ endpoint: "posts", queries });
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    throw error;
  }
};
export const getPost =
  (queries?: MicroCMSQueries) => async (contentId: string) => {
    try {
      return await apiClient.getListDetail<Post>({
        endpoint: "posts",
        contentId,
        queries,
      });
    } catch (error) {
      console.error(`Failed to fetch post with contentId ${contentId}:`, error);
      throw error;
    }
  };
export const getPostIds = async () => {
  try {
    return await apiClient.getAllContentIds({ endpoint: "posts" });
  } catch (error) {
    console.error("Failed to fetch post IDs:", error);
    throw error;
  }
};

export const getPostCategories = async (queries?: MicroCMSQueries) => {
  try {
    return await apiClient.getList<PostCategory>({
      endpoint: "post_categories",
      queries,
    });
  } catch (error) {
    console.error("Failed to fetch post categories:", error);
    throw error;
  }
};

export const getPostCategory =
  (queries?: MicroCMSQueries) => async (contentId: string) => {
    try {
      return await apiClient.getListDetail<PostCategory>({
        endpoint: "post_categories",
        contentId,
        queries,
      });
    } catch (error) {
      console.error(
        `Failed to fetch post category with contentId ${contentId}:`,
        error,
      );
      throw error;
    }
  };

export const getPostCategoryIds = async () => {
  try {
    return await apiClient.getAllContentIds({ endpoint: "post_categories" });
  } catch (error) {
    console.error("Failed to fetch post category IDs:", error);
    throw error;
  }
};

export const getConfig = async (queries?: MicroCMSQueries) => {
  try {
    return await apiClient.getListDetail<Config>({
      endpoint: "config",
      contentId: "all",
      queries,
    });
  } catch (error) {
    console.error("Failed to fetch config:", error);
    throw error;
  }
};

export const getWorks = async (queries?: MicroCMSQueries) => {
  try {
    return await apiClient.getList<Work>({ endpoint: "works", queries });
  } catch (error) {
    console.error("Failed to fetch works:", error);
    throw error;
  }
};
export const getWork =
  (queries?: MicroCMSQueries) => async (contentId: string) => {
    try {
      return await apiClient.getListDetail<Work>({
        endpoint: "works",
        contentId,
        queries,
      });
    } catch (error) {
      console.error(`Failed to fetch work with contentId ${contentId}:`, error);
      throw error;
    }
  };
export const getWorkIds = async () => {
  try {
    return await apiClient.getAllContentIds({ endpoint: "works" });
  } catch (error) {
    console.error("Failed to fetch post IDs:", error);
    throw error;
  }
};

/**
 * ページネーションとカテゴリフィルターを適用した記事一覧取得
 */
export async function getPostsPaginated(
  currentPage: number = 1,
  limit: number = 10,
  categoryId?: string,
  draftKey?: string,
): Promise<{ posts: MicroCMSListResponse<Post>; pager: number[] }> {
  const posts = await getPosts({
    limit,
    offset: (currentPage - 1) * limit,
    filters: categoryId ? `category[equals]${categoryId}` : "",
    draftKey: draftKey,
  });
  // 最大のページ数を計算
  const maxPage = Math.ceil(posts.totalCount / limit);
  // ページャーの配列を作成
  const pager = Array.from({ length: maxPage }, (_, i) => i + 1);

  return { posts, pager };
}

/**
 * カテゴリとカテゴリごとの記事数の一覧を取得
 */
export async function getPostCountsByCategory(
  draftKey?: string,
): Promise<{ category: PostCategory & MicroCMSContentId; count: number }[]> {
  const categories = await getPostCategories();
  const categoryPostCounts = await Promise.all(
    categories.contents.map(async (category) => {
      const posts = await getPosts({
        filters: `category[equals]${category.id}`,
        draftKey: draftKey,
      });
      return { category, count: posts.totalCount };
    }),
  );
  return categoryPostCounts;
}

/**
 * ページネーションと班フィルターを適用した作品一覧取得
 */
export async function getWorksPaginated(
  currentPage: number = 1,
  limit: number = 10,
  groupId?: string,
  draftKey?: string,
): Promise<{ works: MicroCMSListResponse<Work>; pager: number[] }> {
  const works = await getWorks({
    limit,
    offset: (currentPage - 1) * limit,
    filters: groupId ? `group[equals]${groupId}` : "",
    draftKey: draftKey,
  });
  // 最大のページ数を計算
  const maxPage = Math.ceil(works.totalCount / limit);
  // ページャーの配列を作成
  const pager = Array.from({ length: maxPage }, (_, i) => i + 1);

  return { works, pager };
}

/**
 * カテゴリと班ごとの作品数の一覧を取得
 */
export async function getWorksCountsByGroup(
  draftKey?: string,
): Promise<{ group: Group & MicroCMSContentId; count: number }[]> {
  const groups = await getGroups();
  const groupWorkCounts = await Promise.all(
    groups.contents.map(async (group) => {
      const works = await getWorks({
        filters: `group[equals]${group.id}`,
        draftKey: draftKey,
      });
      return { group, count: works.totalCount };
    }),
  );
  return groupWorkCounts;
}
