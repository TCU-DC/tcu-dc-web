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
  MicroCMSDate,
  MicroCMSListResponse,
  MicroCMSQueries,
} from "microcms-js-sdk";

/**
 * 指定されたクエリを使用して班のリストを取得
 *
 * @param {MicroCMSQueries} [queries] - 班を取得するためのクエリパラメータ
 * @returns {Promise<MicroCMSListResponse<Group>>} 班のリストを含むPromise
 * @throws エラーが発生した場合、エラーをthrow
 */
export const getGroups = async (
  queries?: MicroCMSQueries,
): Promise<MicroCMSListResponse<Group>> => {
  try {
    return await apiClient.getList<Group>({ endpoint: "groups", queries });
  } catch (error) {
    console.error("Failed to fetch groups:", error);
    throw error;
  }
};

/**
 * 指定されたクエリを使用して班を取得
 *
 * @param {MicroCMSQueries} [queries] - 班を取得するためのクエリパラメータ
 * @param {string} contentId - 取得する班のコンテンツID
 * @returns {Promise<Group & MicroCMSContentId & MicroCMSDate>} 班を含むPromise
 * @throws エラーが発生した場合、エラーをthrow
 */
export const getGroup =
  (queries?: MicroCMSQueries) =>
  async (
    contentId: string,
  ): Promise<Group & MicroCMSContentId & MicroCMSDate> => {
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
/**
 * 班のIDを取得する非同期関数
 *
 * @returns {Promise<string[]>} 班IDの配列を返すPromise
 * @throws エラーが発生した場合、エラーをthrowする
 */
export const getGroupIds = async (): Promise<string[]> => {
  try {
    return await apiClient.getAllContentIds({ endpoint: "groups" });
  } catch (error) {
    console.error("Failed to fetch group IDs:", error);
    throw error;
  }
};

/**
 * 指定されたクエリを使用してメンバーのリストを取得
 *
 * @param {MicroCMSQueries} [queries] - メンバーを取得するためのクエリパラメータ
 * @returns {Promise<MicroCMSListResponse<Member>>} メンバーのリストを含むPromise
 * @throws エラーが発生した場合、エラーをthrow
 */
export const getMembers = async (
  queries?: MicroCMSQueries,
): Promise<MicroCMSListResponse<Member>> => {
  try {
    return await apiClient.getList<Member>({ endpoint: "members", queries });
  } catch (error) {
    console.error("Failed to fetch members:", error);
    throw error;
  }
};

/**
 * 指定されたクエリを使用してメンバーを取得
 *
 * @param {MicroCMSQueries} [queries] - メンバーを取得するためのクエリパラメータ
 * @param {string} contentId - 取得するメンバーのコンテンツID
 * @returns {Promise<Member & MicroCMSContentId & MicroCMSDate>} メンバーを含むPromise
 * @throws エラーが発生した場合、エラーをthrow
 */
export const getMember =
  (queries?: MicroCMSQueries) =>
  async (
    contentId: string,
  ): Promise<Member & MicroCMSContentId & MicroCMSDate> => {
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

/**
 * 指定されたクエリを使用してページのリストを取得
 *
 * @param {MicroCMSQueries} [queries] - ページを取得するためのクエリオプション
 * @returns {Promise<MicroCMSListResponse<Page>>} ページのリストを含むPromise
 * @throws エラーが発生した場合、エラーメッセージをコンソールに出力し、エラーをthrow
 */
export const getPages = async (
  queries?: MicroCMSQueries,
): Promise<MicroCMSListResponse<Page>> => {
  try {
    return await apiClient.getList<Page>({ endpoint: "pages", queries });
  } catch (error) {
    console.error("Failed to fetch pages:", error);
    throw error;
  }
};
/**
 * 指定されたコンテンツIDに基づいてページの詳細を取得
 *
 * @param queries - MicroCMSクエリオプション（オプション）
 * @returns ページの詳細情報を含むPromiseオブジェクト
 * @throws 指定されたコンテンツIDのページの取得に失敗した場合にエラーをthrow
 */
export const getPage =
  (queries?: MicroCMSQueries) =>
  async (
    contentId: string,
  ): Promise<Page & MicroCMSContentId & MicroCMSDate> => {
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
/**
 * ページのIDを取得する非同期関数
 *
 * @returns {Promise<string[]>} ページIDの配列を含むPromise
 * @throws {Error} ページIDの取得に失敗した場合にエラーをthrow
 */
export const getPageIds = async (): Promise<string[]> => {
  try {
    return await apiClient.getAllContentIds({ endpoint: "pages" });
  } catch (error) {
    console.error("Failed to fetch page IDs:", error);
    throw error;
  }
};
/**
 * すべてのページコンテンツを取得
 *
 * @param {MicroCMSQueries} [queries] - クエリパラメータのオプション
 * @returns {Promise<(Page & MicroCMSContentId & MicroCMSDate)[]>} ページコンテンツの配列を含むPromise
 * @throws {Error} コンテンツの取得に失敗した場合にエラーをthrow
 */
export const getPageAllContents = async (
  queries?: MicroCMSQueries,
): Promise<(Page & MicroCMSContentId & MicroCMSDate)[]> => {
  try {
    return await apiClient.getAllContents<Page>({ endpoint: "pages", queries });
  } catch (error) {
    console.error("Failed to fetch page all contents:", error);
    throw error;
  }
};

/**
 * 指定されたクエリを使用して記事を取得
 *
 * @param {MicroCMSQueries} [queries] - 記事をフィルタリングするためのオプションのクエリパラメータ
 * @returns {Promise<MicroCMSListResponse<Post>>} 記事のリストを含むPromise
 * @throws エラーが発生した場合、エラーメッセージをコンソールに出力し、エラーをthrow
 */
export const getPosts = async (
  queries?: MicroCMSQueries,
): Promise<MicroCMSListResponse<Post>> => {
  try {
    return await apiClient.getList<Post>({ endpoint: "posts", queries });
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    throw error;
  }
};
/**
 * 指定された contentId に基づいて記事を取得
 *
 * @param {MicroCMSQueries} [queries] - クエリパラメータのオプション
 * @returns {Promise<Post & MicroCMSContentId & MicroCMSDate>} - 指定された contentId に対応する記事の詳細を含む Promise
 * @throws {Error} - 記事の取得に失敗した場合にエラーをthrow
 */
export const getPost =
  (queries?: MicroCMSQueries) =>
  async (
    contentId: string,
  ): Promise<Post & MicroCMSContentId & MicroCMSDate> => {
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
/**
 * 指定されたエンドポイントからすべての記事IDを取得
 *
 * @returns {Promise<string[]>} 記事IDの配列を含むPromise
 * @throws エンドポイントから記事IDの取得に失敗した場合にエラーをthrow
 */
export const getPostIds = async (): Promise<string[]> => {
  try {
    return await apiClient.getAllContentIds({ endpoint: "posts" });
  } catch (error) {
    console.error("Failed to fetch post IDs:", error);
    throw error;
  }
};
/**
 * すべての記事コンテンツを取得
 *
 * @param {MicroCMSQueries} [queries] - クエリパラメータのオプション
 * @returns {Promise<(Post & MicroCMSContentId & MicroCMSDate)[]>} 記事コンテンツの配列を含むPromise
 * @throws {Error} コンテンツの取得に失敗した場合にエラーをthrow
 */
export const getPostAllContents = async (
  queries?: MicroCMSQueries,
): Promise<(Post & MicroCMSContentId & MicroCMSDate)[]> => {
  try {
    return await apiClient.getAllContents<Post>({ endpoint: "posts", queries });
  } catch (error) {
    console.error("Failed to fetch post all contents:", error);
    throw error;
  }
};

/**
 * 指定されたクエリを使用して記事カテゴリのリストを取得
 *
 * @param {MicroCMSQueries} [queries] - 記事カテゴリを取得するためのオプションのクエリパラメータ
 * @returns {Promise<MicroCMSListResponse<PostCategory>>} 記事カテゴリのリストを含むPromise
 * @throws エラーが発生した場合、エラーメッセージをコンソールに出力し、エラーをthrow
 */
export const getPostCategories = async (
  queries?: MicroCMSQueries,
): Promise<MicroCMSListResponse<PostCategory>> => {
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

/**
 * 指定されたクエリを使用して記事カテゴリを取得
 *
 * @param {MicroCMSQueries} [queries] - 記事カテゴリを取得するためのオプションのクエリパラメータ
 * @param {string} contentId - 取得する記事カテゴリのコンテンツID
 * @returns {Promise<PostCategory & MicroCMSContentId & MicroCMSDate>} 記事カテゴリを含むPromise
 * @throws エラーが発生した場合、エラーメッセージをコンソールに出力し、エラーをthrow
 */
export const getPostCategory =
  (queries?: MicroCMSQueries) =>
  async (
    contentId: string,
  ): Promise<PostCategory & MicroCMSContentId & MicroCMSDate> => {
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

/**
 * 記事カテゴリのIDを取得する非同期関数
 *
 * @returns {Promise<string[]>} 記事カテゴリIDの配列を含むPromise
 * @throws {Error} 記事カテゴリIDの取得に失敗した場合にエラーをthrow
 */
export const getPostCategoryIds = async (): Promise<string[]> => {
  try {
    return await apiClient.getAllContentIds({ endpoint: "post_categories" });
  } catch (error) {
    console.error("Failed to fetch post category IDs:", error);
    throw error;
  }
};

/**
 * 指定されたクエリを使用して設定を取得
 *
 * @param {MicroCMSQueries} [queries] - 設定を取得するためのオプションのクエリパラメータ
 * @returns {Promise<Config & MicroCMSContentId & MicroCMSDate>} 設定を含むPromise
 * @throws エラーが発生した場合、エラーメッセージをコンソールに出力し、エラーをthrow
 */
export const getConfig = async (
  queries?: MicroCMSQueries,
): Promise<Config & MicroCMSContentId & MicroCMSDate> => {
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

/**
 * 指定されたクエリを使用して作品のリストを取得
 *
 * @param {MicroCMSQueries} [queries] - 作品を取得するためのオプションのクエリパラメータ
 * @returns {Promise<MicroCMSListResponse<Work>>} 作品のリストを含むPromise
 * @throws エラーが発生した場合、エラーメッセージをコンソールに出力し、エラーをthrow
 */
export const getWorks = async (
  queries?: MicroCMSQueries,
): Promise<MicroCMSListResponse<Work>> => {
  try {
    return await apiClient.getList<Work>({ endpoint: "works", queries });
  } catch (error) {
    console.error("Failed to fetch works:", error);
    throw error;
  }
};
/**
 * 指定されたクエリを使用して作品を取得
 * @param {MicroCMSQueries} [queries] - 作品を取得するためのオプションのクエリパラメータ
 * @param {string} contentId - 取得する作品のコンテンツID
 * @returns {Promise<Work & MicroCMSContentId & MicroCMSDate>} 作品を含むPromise
 * @throws エラーが発生した場合、エラーメッセージをコンソールに出力し、エラーをthrow
 */
export const getWork =
  (queries?: MicroCMSQueries) =>
  async (
    contentId: string,
  ): Promise<Work & MicroCMSContentId & MicroCMSDate> => {
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
/**
 * 作品のIDを取得する非同期関数
 * @returns {Promise<string[]>} 作品IDの配列を返すPromise
 * @throws エラーが発生した場合、エラーをthrowする
 */
export const getWorkIds = async (): Promise<string[]> => {
  try {
    return await apiClient.getAllContentIds({ endpoint: "works" });
  } catch (error) {
    console.error("Failed to fetch post IDs:", error);
    throw error;
  }
};
/**
 * すべての作品を取得
 * @param {MicroCMSQueries} [queries] - クエリパラメータのオプション
 * @returns {Promise<(Work & MicroCMSContentId & MicroCMSDate)[]>} 作品の配列を含むPromise
 * @throws {Error} 作品の取得に失敗した場合にエラーをthrow
 */
export const getWorkAllContents = async (
  queries?: MicroCMSQueries,
): Promise<(Work & MicroCMSContentId & MicroCMSDate)[]> => {
  try {
    return await apiClient.getAllContents<Work>({ endpoint: "works", queries });
  } catch (error) {
    console.error("Failed to fetch work all contents:", error);
    throw error;
  }
};

/**
 * ページネーションとカテゴリフィルターを適用した記事一覧を取得
 * @param {number} [currentPage=1] - 現在のページ番号
 * @param {number} [limit=10] - 1ページあたりの表示数
 * @param {string} [categoryId] - カテゴリID
 * @param {string} [draftKey] - draftKey
 * @returns {Promise<{ posts: MicroCMSListResponse<Post>; pager: number[] }>} 記事一覧とページャーを含むPromise
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
 * カテゴリごとの記事数の一覧を取得
 * @param {string} [draftKey] - draftKey
 * @returns {Promise<{ category: PostCategory & MicroCMSContentId; count: number }[]>} カテゴリと記事数の一覧を含むPromise
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
 * ページネーションと班フィルターを適用した作品一覧を取得
 * @param {number} [currentPage=1] - 現在のページ番号
 * @param {number} [limit=10] - 1ページあたりの表示数
 * @param {string} [groupId] - 班ID
 * @param {string} [draftKey] - draftKey
 * @returns {Promise<{ works: MicroCMSListResponse<Work>; pager: number[] }>} 作品一覧とページャーを含むPromise
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
 * 班ごとの作品数の一覧を取得
 * @param {string} [draftKey] - draftKey
 * @returns {Promise<{ group: Group & MicroCMSContentId; count: number }[]>} 班と作品数の一覧を含むPromise
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
