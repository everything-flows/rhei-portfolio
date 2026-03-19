import { motion } from "motion/react";

import CircleArrowIcon from "~/assets/CircleArrowIcon";
import { bounceTransition, tapAnimation } from "~/constants/motion";

export default function ExternalLink() {
  return (
    <nav aria-label="주요 링크" className="mx-auto max-w-6xl py-6 lg:py-10">
      <ul className="grid grid-cols-2 gap-1 sm:grid-cols-3 lg:grid-cols-4">
        {LINK_LIST.map((link) => (
          <li key={link.title}>
            <Card data={link} />
          </li>
        ))}
      </ul>
    </nav>
  );
}

function Card({ data }: { data: (typeof LINK_LIST)[number] }) {
  const { title, description, link, isExternal, rel } = data;

  return (
    <motion.a
      href={link}
      target={isExternal ? "_blank" : "_self"}
      rel={rel}
      aria-label={description}
      className="border-brand external-link-card hover:bg-brand group relative block flex aspect-[2/1] items-end overflow-hidden rounded-md border-2 p-2 transition-colors"
      whileTap={tapAnimation.medium}
      transition={bounceTransition}
    >
      <span
        className="pointer-events-none absolute right-0 top-0 z-0 text-blue-200 transition-colors group-hover:text-blue-600 dark:text-orange-800 dark:group-hover:text-orange-400"
        aria-hidden="true"
      >
        <CircleArrowIcon size="5rem" />
      </span>
      <span className="external-link-card__title text-brand z-1 group-hover:text-reverse relative font-bold transition-colors">
        {title}
      </span>
    </motion.a>
  );
}

const LINK_LIST = [
  {
    title: "Resume",
    description: "이력서 보기",
    link: "/resume",
  },
  {
    title: "Blog",
    description: "블로그 보기",
    link: "/blog",
  },
  {
    title: "GitHub",
    description: "GitHub 프로필 보기",
    link: "https://github.com/everything-flows",
    isExternal: true,
    rel: "noreferrer me",
  },
  {
    title: "Craft",
    description: "작업물 보기",
    link: "/craft",
  },
];
