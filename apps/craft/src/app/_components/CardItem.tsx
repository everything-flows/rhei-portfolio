"use client";

import { motion } from "motion/react";
import Link from "next/link";

import { bounceTransition, tapAnimation } from "@/constants/motion";

interface Card {
  title: string;
  description: string;
  thumbnail: string;
  link: string;
}

export default function CardItem({ data }: { data: Card }) {
  const { title, description, thumbnail, link } = data;

  return (
    <motion.div whileTap={tapAnimation.medium} transition={bounceTransition}>
      <Link
        key={title}
        href={link}
        className="text-reverse bg-reverse block rounded-3xl p-2 hover:text-blue-500 dark:hover:text-orange-500"
      >
        <article className="flex flex-col">
          <img
            src={thumbnail}
            alt={title}
            className="border-normal mb-2 aspect-[16/9] rounded-2xl border-2 object-cover"
          />
          <div className="p-2">
            <h3 className="text-[1.4rem] font-bold">{title}</h3>
            <p className="text-gray-400 dark:text-gray-300">{description}</p>
          </div>
        </article>
      </Link>
    </motion.div>
  );
}
