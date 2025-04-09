export default function GNB() {
  return (
    <nav className="flex items-center justify-between mx-auto max-w-6xl">
      <a href="/">
        <p className="logo-label w-fit" />
      </a>

      <ul className="flex gap-2">
        <li>
          <a href="/">home</a>
        </li>
        <li>
          <a href="/blog">blog</a>
        </li>
      </ul>
    </nav>
  );
}
