import {
  ConfigCustomFieldExternalLink,
  ConfigCustomFieldPageLink,
  ConfigCustomFieldPostLink,
} from "@/types/microcms/config";
import { CustomLink } from "@/types/customLink";

/**
 * ConfigCustomFieldExternalLink, ConfigCustomFieldPageLink, ConfigCustomFieldPostLink 異なる形式のリンクを揃える
 */
export const normalizedCustomFieldLink = (
  customField:
    | ConfigCustomFieldExternalLink
    | ConfigCustomFieldPageLink
    | ConfigCustomFieldPostLink,
): CustomLink => {
  // ConfigCustomFieldExternalLinkの場合
  if (
    customField &&
    "fieldId" in customField &&
    customField.fieldId === "externalLink"
  ) {
    const linkField = customField as ConfigCustomFieldExternalLink;
    const link: CustomLink = {} as CustomLink;
    link.fieldId = linkField.fieldId;
    link.title = linkField.title;
    link.englishTitle = linkField.englishTitle;
    link.link = linkField.link;
    return link;
  }
  // ConfigCustomFieldPageLinkの場合
  if (
    customField &&
    "fieldId" in customField &&
    customField.fieldId === "pageLink"
  ) {
    const pageLink = customField as ConfigCustomFieldPageLink;
    const link: CustomLink = {} as CustomLink;
    link.fieldId = pageLink.fieldId;
    link.title = pageLink.page?.title;
    link.englishTitle = pageLink.englishTitle;
    link.link = pageLink.page?.id;
    return link;
  }
  // ConfigCustomFieldPostLinkの場合
  if (
    customField &&
    "fieldId" in customField &&
    customField.fieldId === "postLink"
  ) {
    const postLink = customField as ConfigCustomFieldPostLink;
    const link: CustomLink = {} as CustomLink;
    link.fieldId = postLink.fieldId;
    link.title = postLink.post?.title;
    link.englishTitle = postLink.englishTitle;
    link.link = postLink.post?.id;
    return link;
  }
  return {} as CustomLink;
};
