import type { MouseEvent } from "react";

import type { Tag } from "~/types/post";

function TagItem({ item, bold = false }: { item: Tag; bold?: boolean }) {
  function goToTagPage(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    window.location.href = `/tags/${item.id}`;
  }

  return (
    <button
      onClick={goToTagPage}
      className={`text-brand border-brand ${bold ? "text-responsive-p border-[1.5px]" : "border text-[1rem]"} overflow-hidden text-ellipsis whitespace-nowrap break-keep rounded-full px-2`}
    >
      <p
        className={`${item.isSpoiler ? "blur-[0.25rem] hover:blur-none" : ""}`}
      >
        {item.title}
      </p>
    </button>
  );
}

export default function TagList({
  tagList,
  bold = false,
}: {
  tagList: Tag[];
  bold?: boolean;
}) {
  return (
    <ul className="mt-2 flex flex-wrap gap-x-2 gap-y-1">
      {tagList.map((tag) => (
        <TagItem key={tag.title} item={tag} bold={bold} />
      ))}
    </ul>
  );
}
