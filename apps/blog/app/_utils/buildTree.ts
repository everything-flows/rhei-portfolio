import type { Category, Document } from "~/types/post";

export function buildTree(items: Document[]) {
  const itemMap: { [key: string]: Category } = {};

  for (const item of items) {
    itemMap[item.id] = { ...item, isOpen: false, children: [] };
  }

  const rootNodes = [];

  for (const item of items) {
    const parentID = item.parentId;

    if (parentID === null || !itemMap[parentID]) {
      rootNodes.push(itemMap[item.id]);
    } else {
      itemMap[parentID].children.push(itemMap[item.id]);
    }
  }

  return rootNodes;
}
