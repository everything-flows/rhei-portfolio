export default function GNB({ isLoggedIn = false }: { isLoggedIn?: boolean }) {
  return (
    <nav className="flex items-center justify-between mx-auto max-w-6xl py-2">
      <a href="/">
        <p className="logo-label w-fit" />
      </a>

      <ul className="flex gap-2 items-center">
        <li>
          <a href="/resume">resume</a>
        </li>
        <li>
          <a href="/blog">blog</a>
        </li>
        <li>
          <a href="/craft">craft</a>
        </li>

        {isLoggedIn && (
          <li>
            <a href="/admin">admin</a>
          </li>
        )}
      </ul>
    </nav>
  );
}
