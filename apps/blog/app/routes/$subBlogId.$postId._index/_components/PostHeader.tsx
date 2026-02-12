import Breadcrumb from "~/components/Breadcrumb";
import TagList from "~/components/TagList";
import { Document } from "~/types/post";

export default function PostHeader({
  data,
  fromDirectory,
  fromPinned,
}: {
  data: Document;
  fromDirectory?: boolean;
  fromPinned?: boolean;
}) {
  const { title, subTitle, id, tags } = data;

  const getTitleTransitionName = () => {
    if (fromDirectory) return `list-post-title-${id}`;
    if (fromPinned) return `pinned-post-title-${id}`;
    return undefined;
  };

  const getSubtitleTransitionName = () => {
    if (fromDirectory) return `list-post-subtitle-${id}`;
    if (fromPinned) return `pinned-post-subtitle-${id}`;
    return undefined;
  };

  const getTagsTransitionName = () => {
    if (fromDirectory) return `list-post-tags-${id}`;
    return undefined;
  };

  return (
    <section className="mx-auto mb-8 max-w-6xl border-b border-gray-200 pb-8 dark:border-gray-600">
      <Breadcrumb postId={id} />

      <h1
        className="text-responsive-h1 mt-2 break-keep"
        style={
          getTitleTransitionName()
            ? { viewTransitionName: getTitleTransitionName() }
            : undefined
        }
      >
        {title}
      </h1>
      {subTitle && (
        <h2
          className="text-responsive-p break-keep text-gray-400 dark:text-gray-300"
          style={
            getSubtitleTransitionName()
              ? { viewTransitionName: getSubtitleTransitionName() }
              : undefined
          }
        >
          {subTitle}
        </h2>
      )}

      {tags && (
        <div
          style={
            getTagsTransitionName()
              ? { viewTransitionName: getTagsTransitionName() }
              : undefined
          }
        >
          <TagList tagList={tags} />
        </div>
      )}
    </section>
  );
}
