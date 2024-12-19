import { contentApi as api } from "./ghost";

export async function getAllTags() {
  const response: any = await api.tags.browse({ limit: "all" }).fetch();
  console.log(response);
  if (!response || !response["data"]) {
    return [];
  }
  return response["data"];
}