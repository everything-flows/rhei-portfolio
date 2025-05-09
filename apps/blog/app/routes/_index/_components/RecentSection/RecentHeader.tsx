export default function RecentHeader() {
  return (
    <h2 className="text-responsive-display flex flex-wrap items-center justify-end gap-x-2 gap-y-1 font-black leading-[1.4]">
      <span className="text-block border-reverse border-2">View</span>
      <span className="text-block bg-reverse text-reverse border-reverse border-2">
        All
      </span>
      <hr className="border-reverse flex-1 border" />
      <span className="text-block border-reverse border-2">→</span>
    </h2>
  );
}
