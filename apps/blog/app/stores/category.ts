import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { Category } from "~/types/post";

function toggleCategory(id: string, currentCategory: Category[]): Category[] {
  return currentCategory.map((category) => {
    if (category.id === id) {
      return { ...category, isOpen: !category.isOpen };
    }
    if (category.children && category.children.length > 0) {
      return {
        ...category,
        children: toggleCategory(id, category.children),
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
  categoryList: Category[];
  setCategory: (newCategory: Category[]) => void;
  toggleCategory: (id: string) => void;
}

const useCategoryStore = create<CategoryState>()(
  persist(
    (set) => ({
      categoryList: [],
      setCategory: (newCategory: Category[]) =>
        set((state) => ({
          categoryList: mergeCategories(newCategory, state.categoryList),
        })),
      toggleCategory: (id: string) =>
        set((state) => ({
          categoryList: toggleCategory(id, state.categoryList),
        })),
    }),
    {
      name: "category-storage",
      partialize: (state) => ({ categoryList: state.categoryList }),
    },
  ),
);

export default useCategoryStore;
