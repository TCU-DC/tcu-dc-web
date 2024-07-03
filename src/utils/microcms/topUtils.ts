import {
  TopCustomFieldLink,
  TopCustomFieldPageLink,
  TopCustomFieldPostLink,
} from "@/types/microcms/top";
import { CustomLink } from "@/types/customLink";

/**
 * TopCustomFieldLink, TopCustomFieldPageLink, TopCustomFieldPostLink 異なる形式のリンクを揃える
 */
export const normalizedCustomFieldLink = (
  customField:
    | TopCustomFieldPageLink
    | TopCustomFieldPostLink
    | TopCustomFieldLink,
): CustomLink => {
  // TopCustomFieldLinkの場合
  if (
    customField &&
    "fieldId" in customField &&
    customField.fieldId === "link"
  ) {
    const linkField = customField as TopCustomFieldLink;
    const link: CustomLink = {} as CustomLink;
    link.fieldId = linkField.fieldId;
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
    const link: CustomLink = {} as CustomLink;
    link.fieldId = pageLink.fieldId;
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
    const link: CustomLink = {} as CustomLink;
    link.fieldId = postLink.fieldId;
    link.title = postLink.post?.title;
    link.englishTitle = postLink.post?.id;
    link.link = postLink.post?.id;
    return link;
  }
  return {} as CustomLink;
};
