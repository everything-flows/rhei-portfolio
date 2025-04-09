import {
  cloneElement,
  isValidElement,
  useEffect,
  useRef,
  useState,
} from "react";

import getAncestorHeadingHeights from "./getAncestorHeadingHeights";

export function StickyHeading({ children }: { children: React.ReactElement }) {
  const ref = useRef<HTMLElement>(null);
  const [top, setTop] = useState(0);
  const [zIndex, setZIndex] = useState(1);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const updateTop = () => {
      const offset = getAncestorHeadingHeights(element);
      setTop(offset);
    };

    updateTop();

    const level = Number(element.tagName.replace("H", ""));
    const computedZ = Math.max(1, 7 - level);
    setZIndex(computedZ);

    const observer = new ResizeObserver(updateTop);

    const allHeadings = Array.from(
      document.querySelectorAll("h1, h2, h3, h4, h5, h6"),
    ) as HTMLElement[];

    const targetIndex = allHeadings.indexOf(element);
    if (targetIndex === -1) return;

    let trackLevel = level;

    for (let i = targetIndex - 1; i >= 0; i--) {
      const candidate = allHeadings[i];
      const candidateLevel = Number(candidate.tagName.replace("H", ""));
      const isSticky =
        getComputedStyle(candidate).position === "sticky" ||
        candidate.style.position === "sticky";

      if (candidateLevel < trackLevel && isSticky) {
        observer.observe(candidate);
        trackLevel = candidateLevel;
      }

      if (trackLevel === 1) break;
    }

    window.addEventListener("resize", updateTop);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateTop);
    };
  }, []);

  if (!isValidElement(children)) {
    return null;
  }

  return cloneElement(children, {
    ref,
    style: {
      ...(children.props.style || {}),
      position: "sticky",
      top: `${top}px`,
      zIndex,
    },
  });
}
