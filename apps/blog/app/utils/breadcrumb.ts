import type { Category } from "~/types/post";

function findCategoryById(
  category: Category,
  id: string,
  ret: Category[],
): boolean {
  if (category.id === id) {
    return true;
  }

  const result = category.children.find((child) =>
    findCategoryById(child, id, ret),
  );

  if (result) {
    ret.unshift(result);
    return true;
  }

  return false;
}

export function getBreadcrumbData({
  categoryList,
  id,
}: {
  categoryList: Category[];
  id: string;
}): Category[] | undefined {
  if (!id) {
    return;
  }

  const ret: Category[] = [];

  const result = categoryList.find((child) => findCategoryById(child, id, ret));

  if (result) {
    ret.unshift(result);
  }

  return ret;
}

export function formatDate(dateString: string | null) {
  if (!dateString) return "";

  const dateObject = new Date(dateString);
  const utc = dateObject.getTime() + dateObject.getTimezoneOffset() * 60 * 1000;
  const TIME_DIFF = 9 * 60 * 60 * 1000;
  const ktc = new Date(utc + TIME_DIFF);

  const year = ktc.getFullYear();
  const month = ktc.getMonth() + 1;
  const date = ktc.getDate();

  return year + "." + padNumber(month) + "." + padNumber(date) + ".";
}

function padNumber(number: number) {
  if (number < 10) return "0" + number;
  return number;
}
