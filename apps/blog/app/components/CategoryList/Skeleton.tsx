function Row({ width }: { width: number }) {
  return (
    <div>
      <div className="flex h-9 items-center">
        <div className="mr-2 h-7 w-7 flex-shrink-0 animate-pulse rounded-full bg-blue-200 dark:bg-orange-800" />
        <div
          className="h-5 animate-pulse rounded-full bg-blue-200 dark:bg-orange-800"
          style={{ width: `${width * 100}%` }}
        />
      </div>
    </div>
  );
}

export default function CategoryListSkeleton() {
  return (
    <div>
      <Row width={0.75} />
      <Row width={0.6} />
      <Row width={1} />
    </div>
  );
}
