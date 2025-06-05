import ThemeButton from "./_components/ThemeButton";
import { MENU } from "./menu";
import Sidebar from "./Sidebar";

export default function GNB({
  route = "/",
  isLoggedIn = false,
}: {
  route?: string;
  isLoggedIn?: boolean;
}) {
  return (
    <nav className="flex items-center justify-between mx-auto max-w-6xl py-4 relative">
      <a href={route} className="flex gap-2 items-center">
        <img
          src="https://tnzycdohhtvupgagmwfx.supabase.co/storage/v1/object/public/rhei-resume//profile.png"
          alt="logo"
          className="size-8 rounded-full"
        />
        <p className="logo-label w-fit font-extrabold text-[1.2rem]" />
      </a>

      <ul className="flex gap-2 items-center sm:flex hidden">
        <div className="mr-4">
          <ThemeButton />
        </div>
        {MENU.map((item) => (
          <li key={item.title}>
            <a
              href={item.link}
              className={`font-extrabold text-[1.2rem] hover:text-brand px-1 ${
                item.link === route ? "text-brand" : ""
              }`}
            >
              {item.title}
            </a>
          </li>
        ))}
        {isLoggedIn && (
          <li>
            <a href="/admin">admin</a>
          </li>
        )}
      </ul>

      <Sidebar route={route} />
    </nav>
  );
}
