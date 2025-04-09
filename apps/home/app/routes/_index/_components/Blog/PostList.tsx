import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards } from "swiper/modules";

import { DocumentSummary } from "~/types/post";

import "swiper/css";
import "swiper/css/effect-cards";

function PostCardSkeleton() {
  return <div className="dark:bg-bg-reverse bg-bg-standard h-[16rem]" />;
}

function PostCard({ post }: { post: DocumentSummary }) {
  const { title, sub_title, tags, thumbnail } = post;

  return (
    <article className="dark:bg-bg-reverse dark:text-text-reverse bg-bg-standard text-text-standard flex h-[16rem] flex-col">
      <div className="flex h-8 w-full shrink-0 items-center gap-4 bg-gray-200 px-2 dark:bg-gray-800">
        <div className="flex items-center gap-2">
          <div className="size-3 rounded-full bg-[#ED553B]" />
          <div className="size-3 rounded-full bg-[#F6D55C]" />
          <div className="size-3 rounded-full bg-[#3CAEA3]" />
        </div>
        <p>panta-rhei@admin</p>
      </div>

      <div className="flex justify-between gap-4 overflow-auto px-6 py-4">
        <div>
          <h3 className="text-[1.5rem]/8 font-bold">{title}</h3>
          <ul className="ml-2 mt-4">
            <li>{sub_title}</li>
            <li>
              <div className="mt-4 flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <p
                    key={tag.id}
                    className="text-text-standard dark:text-text-reverse rounded-sm bg-gray-200 px-2 font-medium dark:bg-gray-800"
                  >
                    {tag.title}
                  </p>
                ))}
              </div>
            </li>
          </ul>
        </div>

        {thumbnail && (
          <img
            src={thumbnail}
            alt={title}
            className="hidden aspect-square rounded-lg object-cover lg:block"
          />
        )}
      </div>
    </article>
  );
}

export default function PostList({ list }: { list?: DocumentSummary[] }) {
  return (
    <Swiper
      effect="cards"
      grabCursor={true}
      modules={[EffectCards]}
      className="mySwiper"
    >
      {list
        ? list.map((post) => (
            <SwiperSlide key={post.id}>
              <PostCard post={post} />
            </SwiperSlide>
          ))
        : [1, 2, 3].map((id) => (
            <SwiperSlide key={id}>
              <PostCardSkeleton />
            </SwiperSlide>
          ))}
    </Swiper>
  );
}
