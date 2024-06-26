import {
  TopCustomFieldLink,
  TopCustomFieldPageLink,
  TopCustomFieldPostLink,
} from "@/types/microcms/top";
import { Link } from "@/types/link";

// TopCustomFieldLink, TopCustomFieldPageLink, TopCustomFieldPostLink 異なる形式のリンクを揃える
export const normalizedCustomFieldLink = (
  customField:
    | TopCustomFieldPageLink
    | TopCustomFieldPostLink
    | TopCustomFieldLink,
): Link => {
  // TopCustomFieldLinkの場合
  if (
    customField &&
    "fieldId" in customField &&
    customField.fieldId === "link"
  ) {
    const linkField = customField as TopCustomFieldLink;
    const link: Link = {} as Link;
    link.isExternal = true;
    link.title = linkField.title;
    link.englishTitle = linkField.englishTitle;
    link.link = linkField.link;
    return link;
  }
  // TopCustomFieldPageLinkの場合
  if (
    customField &&
    "fieldId" in customField &&
    customField.fieldId === "pageLink"
  ) {
    const pageLink = customField as TopCustomFieldPageLink;
    const link: Link = {} as Link;
    link.isExternal = false;
    link.title = pageLink.page?.title;
    link.englishTitle = pageLink.page?.id;
    link.link = pageLink.page?.id;
    return link;
  }
  // TopCustomFieldPostLinkの場合
  if (
    customField &&
    "fieldId" in customField &&
    customField.fieldId === "postLink"
  ) {
    const postLink = customField as TopCustomFieldPostLink;
    const link: Link = {} as Link;
    link.isExternal = false;
    link.title = postLink.post?.title;
    link.englishTitle = postLink.post?.id;
    link.link = postLink.post?.id;
    return link;
  }
  return {} as Link;
};
