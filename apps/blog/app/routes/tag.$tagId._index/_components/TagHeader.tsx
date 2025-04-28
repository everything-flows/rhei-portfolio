export default function TagHeader({
  data,
}: {
  data: { title: string; content: string[] };
}) {
  const { title, content } = data;

  return (
    <section className="mx-auto mb-8 max-w-6xl border-b border-gray-200 pb-8 dark:border-gray-600">
      <h1 className="text-responsive-h1 mt-2 break-keep">Tag: {title}</h1>
      <h2 className="text-responsive-p break-keep text-gray-400 dark:text-gray-300">
        {content.join(", ")}
      </h2>
    </section>
  );
}
