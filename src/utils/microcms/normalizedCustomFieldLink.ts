import { CustomLink } from "@/types/customLink";
import type {
  ConfigCustomFieldExternalLink,
  ConfigCustomFieldPageLink,
  ConfigCustomFieldPostLink,
} from "@/types/microcms/config";

/**
 * ConfigCustomFieldExternalLink, ConfigCustomFieldPageLink, ConfigCustomFieldPostLink 異なる形式のリンクを揃える
 * @param {ConfigCustomFieldExternalLink | ConfigCustomFieldPageLink | ConfigCustomFieldPostLink} customField - ConfigCustomFieldExternalLink, ConfigCustomFieldPageLink, ConfigCustomFieldPostLinkのいずれか
 * @return {CustomLink} - CustomLink に変換されたリンク
 */
export const normalizedCustomFieldLink = (
  customField:
    | ConfigCustomFieldExternalLink
    | ConfigCustomFieldPageLink
    | ConfigCustomFieldPostLink,
): CustomLink => {
  if (!customField || !("fieldId" in customField)) {
    return {} as CustomLink;
  }
  switch (customField.fieldId) {
    case "externalLink":
      const externalLinkField = customField as ConfigCustomFieldExternalLink;
      return {
        fieldId: externalLinkField.fieldId,
        title: externalLinkField.title,
        englishTitle: externalLinkField.englishTitle,
        link: externalLinkField.link,
        isTargetBlank: externalLinkField.isTargetBlank,
      } as CustomLink;
    case "pageLink":
      const pageLinkField = customField as ConfigCustomFieldPageLink;
      return {
        fieldId: pageLinkField.fieldId,
        title: pageLinkField.title ?? pageLinkField.page?.title,
        englishTitle: pageLinkField.englishTitle,
        link: `/${pageLinkField.page?.id}`,
        isTargetBlank: pageLinkField.isTargetBlank,
      } as CustomLink;
    case "postLink":
      const postLinkField = customField as ConfigCustomFieldPostLink;
      return {
        fieldId: postLinkField.fieldId,
        title: postLinkField.title ?? postLinkField.post?.title,
        englishTitle: postLinkField.englishTitle,
        link: `/posts/${postLinkField.post?.id}`,
        isTargetBlank: postLinkField.isTargetBlank,
      } as CustomLink;
    default:
      return {} as CustomLink;
  }
};
