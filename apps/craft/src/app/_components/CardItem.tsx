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
        className="group bg-reverse relative block h-full overflow-hidden rounded-2xl p-3 shadow-[0px_0px_12px_0px_#0263ff40] dark:shadow-[0px_0px_12px_0px_#f94b2840]"
      >
        {/* 프리즘 그라데이션 */}
        <div
          className="absolute -inset-20 opacity-25 transition-all duration-500 ease-out group-hover:scale-150 group-hover:rotate-20 group-hover:opacity-30 dark:opacity-10 dark:group-hover:opacity-20"
          style={{
            background:
              "conic-gradient(from 180deg at 60% 45%, #0000 0deg, #4A6FC4 15deg, #4ABDC4 30deg, #E8B84A 45deg, #E8755A 60deg, #0000 75deg, #0000 180deg, #4A6FC4 195deg, #4ABDC4 210deg, #E8B84A 225deg, #E8755A 240deg, #0000 255deg)",
          }}
        />

        <article className="relative flex flex-col">
          <div className="border-normal overflow-hidden rounded-xl border-2">
            <img
              src={thumbnail}
              alt={title}
              className="aspect-[16/9] w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <div className="mt-3 px-1">
            <h3 className="text-reverse text-lg font-bold">{title}</h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {description}
            </p>
          </div>
        </article>
      </Link>
    </motion.div>
  );
}
