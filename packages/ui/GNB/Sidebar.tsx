import { motion } from "motion/react";
import { useState } from "react";
import CloseIcon from "./_assets/CloseIcon";
import HamburgerIcon from "./_assets/HamburgerIcon";
import ThemeButton from "./_components/ThemeButton";
import { MENU } from "./menu";

export default function Sidebar({ route }: { route: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="sm:hidden relative flex gap-4">
      <ThemeButton />
      <button aria-label="Toggle sidebar" onClick={() => setIsOpen(true)}>
        <HamburgerIcon />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed flex flex-col inset-0 bg-gray-900/40 z-[50]"
            onClick={() => setIsOpen(false)}
          />
          <div className="fixed top-0 right-0 flex flex-col z-[50] bg-normal h-dvh h-full w-[max(400px,80dvw)] max-w-[100dvw] shadow-[0px_0px_32px_0px_#0263ff40] dark:shadow-[0px_0px_32px_0px_#f94b2840]">
            <div className="w-full flex justify-end">
              <button className="p-4" onClick={() => setIsOpen(false)}>
                <CloseIcon />
              </button>
            </div>

            <div className="flex-1 flex flex-col">
              <ul className="flex flex-col">
                {MENU.map((item) => (
                  <li
                    key={item.title}
                    className="w-full border-b border-gray-200 dark:border-gray-700"
                  >
                    <motion.a
                      href={item.link}
                      style={{ transformOrigin: "left center" }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`font-extrabold text-[1.2rem] hover:text-brand px-6 py-5 w-full inline-block ${
                        item.link === route ? "text-brand" : ""
                      }`}
                    >
                      {item.title}
                    </motion.a>
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
