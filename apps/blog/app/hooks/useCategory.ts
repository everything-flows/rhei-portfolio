import { useParams, useRouteLoaderData } from "@remix-run/react";
import { createBrowserClient } from "@supabase/ssr";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { create } from "zustand";
import { persist } from "zustand/middleware";

import { categoryQueryOptions } from "~/_utils/fetchCategoryData";
import { DEFAULT_SUB_BLOG } from "~/constants/supabase";
import type { Category } from "~/types/post";

export default function useCategory() {
  const params = useParams();
  const { supabaseCredential } = useRouteLoaderData("root");
  const { setCategory, categoryToggleList, toggleCategory } = categoryStore();

  const subBlogId = params.subBlogId ?? DEFAULT_SUB_BLOG;

  const supabase = createBrowserClient(
    supabaseCredential.url,
    supabaseCredential.key,
  );

  const { data: categoryList } = useSuspenseQuery(
    categoryQueryOptions(supabase, subBlogId),
  );

  useEffect(() => {
    if (categoryList.length > 0) {
      setCategory(categoryList);
    }
  }, [categoryList, setCategory]);

  return { categoryList, categoryToggleList, toggleCategory };
}

function toggleCategoryInList(
  id: string,
  currentCategory: Category[],
): Category[] {
  return currentCategory.map((category) => {
    if (category.id === id) {
      return { ...category, isOpen: !category.isOpen };
    }
    if (category.children && category.children.length > 0) {
      return {
        ...category,
        children: toggleCategoryInList(id, category.children),
      };
    }
    return category;
  });
}

function mergeCategories(
  newCategories: Category[],
  oldCategories: Category[],
): Category[] {
  const oldStateMap = new Map<string, boolean>();

  function collectOpenStates(categories: Category[]) {
    categories.forEach((cat) => {
      oldStateMap.set(cat.id, cat.isOpen);
      if (cat.children) {
        collectOpenStates(cat.children);
      }
    });
  }

  collectOpenStates(oldCategories);

  function applyOpenStates(categories: Category[]): Category[] {
    return categories.map((cat) => ({
      ...cat,
      isOpen: oldStateMap.get(cat.id) ?? cat.isOpen,
      children: cat.children ? applyOpenStates(cat.children) : [],
    }));
  }

  return applyOpenStates(newCategories);
}

interface CategoryState {
  categoryToggleList: Category[];
  setCategory: (newCategory: Category[]) => void;
  toggleCategory: (id: string) => void;
}

const categoryStore = create<CategoryState>()(
  persist(
    (set) => ({
      categoryToggleList: [],
      setCategory: (newCategory: Category[]) =>
        set((state) => ({
          categoryToggleList: mergeCategories(
            newCategory,
            state.categoryToggleList,
          ),
        })),
      toggleCategory: (id: string) =>
        set((state) => ({
          categoryToggleList: toggleCategoryInList(
            id,
            state.categoryToggleList,
          ),
        })),
    }),
    {
      name: "category-storage",
      partialize: (state) => ({ categoryToggleList: state.categoryToggleList }),
    },
  ),
);
