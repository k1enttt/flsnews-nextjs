'use server'

import type { Tag } from "@ts-ghost/content-api";
import { adminApi as api } from "./ghost";
import type { ErrorBrowseResponse, SuccessBrowseResponse } from "./types";

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