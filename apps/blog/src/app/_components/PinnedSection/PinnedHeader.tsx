export default function PinnedHeader() {
  return (
    <h2 className="text-responsive-h2 items-center flex flex-wrap gap-x-2 gap-y-1 leading-[1.4] font-black justify-end">
      <span className="text-block">📌</span>
      <hr className="flex-1 border border-nromal" />
      <span className="text-block bg-reverse text-reverse">Pinned</span>
      <span className="text-block border-2 border-reverse">Posts</span>
    </h2>
  );
}
