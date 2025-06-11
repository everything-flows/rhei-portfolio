import { useState } from "react";
import { MENU } from "./menu";
import CloseIcon from "./_assets/CloseIcon";
import HamburgerIcon from "./_assets/HamburgerIcon";
import ThemeButton from "./_components/ThemeButton";

export default function Sidebar({ route }: { route: string }) {
  const [isOpen, setIsOpen] = useState(false);

  function onOpen() {
    setIsOpen(true);
  }

  function onClose() {
    setIsOpen(false);
  }

  return (
    <div className="sm:hidden relative flex gap-4">
      <ThemeButton />
      <button onClick={onOpen}>
        <HamburgerIcon />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed flex flex-col inset-0 bg-gray-900/40 z-[50]"
            onClick={onClose}
          />
          <div className="fixed top-0 right-0 flex flex-col z-[50] bg-normal h-dvh h-full w-[max(400px,80dvw)] max-w-[100dvw] shadow-[0px_0px_32px_0px_#3363FF1F]">
            <div className="w-full flex justify-end">
              <button className="p-4" onClick={onClose}>
                <CloseIcon />
              </button>
            </div>

            <div className="flex-1 flex flex-col">
              <ul className="flex flex-col">
                {MENU.map((item) => (
                  <li key={item.title} className="w-full border-b border-sub">
                    <a
                      href={item.link}
                      className={`font-extrabold text-[1.2rem] hover:text-brand px-6 py-4 w-full inline-block ${
                        item.link === route ? "text-brand" : ""
                      }`}
                    >
                      {item.title}
                    </a>
                  </li>
                ))}
              </ul>

              <div className="flex-1 flex items-end p-4">
                <ThemeButton />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
