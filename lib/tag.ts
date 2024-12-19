'use server'

import { Tag } from "@ts-ghost/content-api";
import { adminApi as api } from "./ghost";

export async function getAllTags() {
  const response = await api.tags.browse({ limit: "all" }).fetch();

  if (!response.success || !response["data"]) {
    return [];
  }
  const tags = (response["data"] as Array<Tag>).map((tag) => {
    return { slug: tag.slug, name: tag.name };
  });
  return tags;
}