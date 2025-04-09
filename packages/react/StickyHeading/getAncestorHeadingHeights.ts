export default function getAncestorHeadingHeights(
  element: HTMLElement,
): number {
  const allHeadings = Array.from(
    document.querySelectorAll("h1, h2, h3, h4, h5, h6"),
  ) as HTMLElement[];

  const targetIndex = allHeadings.indexOf(element);
  if (targetIndex === -1) return 0;

  const currentLevel = Number(element.tagName.replace("H", ""));
  let total = 0;
  let level = currentLevel;

  for (let i = targetIndex - 1; i >= 0; i--) {
    const candidate = allHeadings[i];
    const candidateLevel = Number(candidate.tagName.replace("H", ""));

    const isSticky =
      getComputedStyle(candidate).position === "sticky" ||
      candidate.style.position === "sticky";

    if (candidateLevel < level && isSticky) {
      total += candidate.offsetHeight || 0;
      level = candidateLevel;
    }
  }

  return total;
}
