'use server'

import type { Tag } from "@ts-ghost/content-api";
import { adminApi as api } from "./ghost";
import type { ErrorBrowseResponse, MinimalTag, SuccessBrowseResponse } from "./types";

export async function getAllTags() {
  const response = await api.tags.browse({ limit: "all" }).fetch() as SuccessBrowseResponse<Tag> | ErrorBrowseResponse;

  if (!response.success || !response.data) {
    return [];
  }
  const tags = (response.data as Array<Tag>).map((tag) => {
    return { slug: tag.slug, name: tag.name };
  });
  return tags;
}

/**
 * Trả về tất cả các tag có trong Ghost dưới dạng cây
 * @returns {Promise<Array<Record<string, MinimalTag[]>>}
 */
export async function getTagTree(): Promise<
  Array<Record<string, MinimalTag[]>>
> {
  const tags = await getAllTags();

  const formatedTags: Array<Record<string, MinimalTag[]>> = [];

  for (const tag of tags) {
    const tagProp = tag.name.split(": ");
    const parent = tagProp[0];
    const child = tagProp[1];

    const parentTagIndex: number = formatedTags.findIndex(
      (item) => Object.keys(item)[0] === parent
    );

    const childTagObject = { slug: tag.slug, name: child };
    if (parentTagIndex != -1) {
      Object.values(formatedTags[parentTagIndex])[0].push(childTagObject);
    } else {
      formatedTags.push({ [parent]: [childTagObject] });
    }
  }
  return formatedTags;
}