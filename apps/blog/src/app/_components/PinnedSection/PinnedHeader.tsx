export default function PinnedHeader() {
  return (
    <h2 className="text-responsive-h2 flex flex-wrap items-center justify-end gap-x-2 gap-y-1 leading-[1.4] font-black">
      <span className="text-block">📌</span>
      <hr className="border-normal flex-1 border" />
      <span className="text-block bg-reverse text-reverse">Pinned</span>
      <span className="text-block border-reverse border-2">Posts</span>
    </h2>
  );
}
