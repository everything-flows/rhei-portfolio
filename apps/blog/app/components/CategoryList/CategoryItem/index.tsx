import { Link } from "@remix-run/react";

import RightChevronIcon from "~/assets/RightChevronIcon";
import useCategoryStore from "~/stores/category";

export default function CategoryItem({
  id,
  emoji,
  title,
  href,
  isSelected = false,
  isOpen = false,
  indent = 0,
  hasChildren = false,
}: {
  id: string;
  emoji?: string;
  title: string;
  href: string;
  isSelected: boolean;
  isOpen: boolean;
  indent: number;
  hasChildren: boolean;
}) {
  const { toggleCategory } = useCategoryStore();

  const handleAnchorClick = (event: React.MouseEvent) => {
    const target: HTMLElement | null = event.target as HTMLElement | null;
    if (!target) return;

    if (
      target.tagName.toLowerCase() === "button" ||
      target.tagName.toLowerCase() === "svg" ||
      target.tagName.toLowerCase() === "path"
    ) {
      event.preventDefault();
    }
  };

  const handleButtonClick = () => {
    toggleCategory(id);
  };

  return (
    <Link to={href} className="no-underline" onClick={handleAnchorClick}>
      <div
        className={`flex h-9 items-center rounded-full pr-2 font-medium transition-colors ${
          isSelected
            ? "bg-brand text-reverse font-semibold hover:bg-blue-600 dark:hover:bg-orange-600"
            : "hover:bg-brand/20"
        }`}
        style={{ paddingLeft: `calc(${indent} * 1rem + 0.2rem)` }}
      >
        <button
          aria-label="toggle menu"
          onClick={handleButtonClick}
          className={`hover:bg-brand/30 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border-none bg-transparent outline-none transition-all ${
            isOpen ? "rotate-90" : ""
          } ${!hasChildren ? "opacity-0" : ""}`}
        >
          <RightChevronIcon
            size="1rem"
            className={isSelected ? "text-reverse" : ""}
          />
        </button>

        <p className="ml-1 flex-grow overflow-hidden text-ellipsis whitespace-nowrap break-all">
          {emoji && <span>{emoji} </span>}
          {title}
        </p>
      </div>
    </Link>
  );
}
