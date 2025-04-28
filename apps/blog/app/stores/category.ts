import { create } from "zustand";
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

interface CategoryState {
  categoryList: Category[];
  setCategory: (newCategory: Category[]) => void;
  toggleCategory: (id: string) => void;
}

const useCategoryStore = create<CategoryState>((set) => ({
  categoryList: [],
  setCategory: (newCategory: Category[]) =>
    set(() => ({ categoryList: newCategory })),
  toggleCategory: (id: string) =>
    set((state) => ({ categoryList: toggleCategory(id, state.categoryList) })),
}));

export default useCategoryStore;
