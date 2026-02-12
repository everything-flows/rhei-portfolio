import { useParams } from "@remix-run/react";
import { AnimatePresence, motion } from "motion/react";

import useFetchCategory from "~/hooks/useFetchCategory";
import useCategoryStore from "~/stores/category";
import type { Category } from "~/types/post";

import CategoryItem from "./CategoryItem";
import CategoryListSkeleton from "./Skeleton";

export default function CategoryList() {
  const params = useParams();
  const { categoryList: storedCategoryList } = useCategoryStore();

  const { isLoading } = useFetchCategory();

  if (isLoading || storedCategoryList.length === 0) {
    return <CategoryListSkeleton />;
  }

  return (
    <div>
      {storedCategoryList.map((datum: Category) => {
        return renderTreeItem(datum, 0, params.postId || "");
      })}
    </div>
  );
}

const renderTreeItem = (item: Category, depth: number, postId: string) => {
  const { id, emoji, title, subBlog, isOpen, children } = item;

  return (
    <div key={id}>
      <CategoryItem
        id={id}
        emoji={emoji}
        title={title}
        href={`/${subBlog}/${id}`}
        indent={depth}
        isOpen={isOpen}
        isSelected={postId === id}
        hasChildren={children.length !== 0}
      />
      <AnimatePresence initial={false}>
        {isOpen && children && children.length > 0 && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            style={{ overflow: "hidden" }}
          >
            {children.map((child) => renderTreeItem(child, depth + 1, postId))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
