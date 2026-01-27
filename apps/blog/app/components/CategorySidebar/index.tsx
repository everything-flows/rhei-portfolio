import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import CloseIcon from "~/assets/CloseIcon";
import HamburgerIcon from "~/assets/HamburgerIcon";
import CategoryList from "~/components/CategoryList";

export default function CategorySidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        buttonRef.current &&
        panelRef.current &&
        !buttonRef.current.contains(event.target as Node) &&
        !panelRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <>
      <motion.button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="bg-brand text-reverse fixed bottom-4 right-4 z-40 flex h-12 w-12 items-center justify-center rounded-full shadow-lg sm:right-6 md:right-12"
        aria-label="Toggle category menu"
      >
        {isOpen ? <CloseIcon /> : <HamburgerIcon />}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={panelRef}
            initial={{ scale: 0.5, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.7, opacity: 0, y: 10 }}
            transition={{
              duration: 0.1,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            style={{ transformOrigin: "bottom right" }}
            className="bg-normal fixed bottom-20 right-4 z-40 flex w-80 max-w-[calc(100vw-2rem)] flex-col rounded-2xl shadow-[0px_0px_32px_0px_#0263ff40] dark:shadow-[0px_0px_32px_0px_#f94b2840] sm:right-6 md:right-12"
          >
            <div className="custom-scrollbar max-h-[60vh] overflow-auto p-4">
              <CategoryList />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
