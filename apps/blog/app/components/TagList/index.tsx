import { Link } from "@remix-run/react";
import type { Tag } from "~/types/post";
import { motion } from "motion/react";

function TagItem({ item }: { item: Tag }) {
  return (
    <Link to={`/tag/${item.id}`}>
      <motion.button
        whileTap={{ scale: 0.96 }}
        whileHover={{ scale: 1.04 }}
        className="text-brand border-brand hover:bg-brand hover:text-reverse overflow-hidden text-ellipsis whitespace-nowrap break-keep rounded-full border-[1.5px] px-2"
      >
        <p
          className={`${item.isSpoiler ? "blur-[0.25rem] hover:blur-none" : ""}`}
        >
          {item.title}
        </p>
      </motion.button>
    </Link>
  );
}

export default function TagList({ tagList }: { tagList: Tag[] }) {
  return (
    <ul className="mt-2 flex flex-wrap gap-x-2 gap-y-1">
      {tagList.map((tag) => (
        <TagItem key={tag.title} item={tag} />
      ))}
    </ul>
  );
}
