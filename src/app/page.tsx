import { client } from "@/libs/client";
import {
  Top,
  TopCustomFieldLink,
  TopCustomFieldPageLink,
  TopCustomFieldPostLink,
} from "@/types/microcms/top";
import { Link } from "@/types/link";

export default async function Home() {
  const top: Top = await client.get({
    endpoint: "top/setting",
  });
  // TopCustomFieldLink, TopCustomFieldPageLink, TopCustomFieldPostLink 異なる形式のリンクを揃える
  const normalizedCustomFieldLink = (
    customField:
      | TopCustomFieldPageLink
      | TopCustomFieldPostLink
      | TopCustomFieldLink
      | undefined,
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
  return (
    <div>
      <div>{top.title}</div>
      <div>
        {top.navbarLinks?.right &&
          normalizedCustomFieldLink(top.navbarLinks?.right[0]).link}
      </div>
      <div>
        {top.navbarLinks?.center &&
          normalizedCustomFieldLink(top.navbarLinks?.center[0]).link}
      </div>
      <div>
        {top.navbarLinks?.left &&
          normalizedCustomFieldLink(top.navbarLinks?.left[0]).link}
      </div>
    </div>
  );
}
