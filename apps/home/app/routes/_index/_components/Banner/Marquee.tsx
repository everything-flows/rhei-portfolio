// 코드 참고: https://codepen.io/kimyangsun/pen/yLEoqoG

import { ReactNode, useEffect, useRef } from "react";

const Marquee = ({
  children,
  speed = 1,
  reverse = false,
  style,
}: {
  children: ReactNode;
  speed?: number;
  reverse?: boolean;
  style?: string;
}) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function animate() {
      if (!ref.current) {
        return;
      }

      const parentSelector = ref.current;
      const clone = parentSelector.innerHTML;
      const firstElement =
        parentSelector.firstElementChild as HTMLParagraphElement | null;
      let i = 0;
      parentSelector.insertAdjacentHTML("beforeend", clone);
      parentSelector.insertAdjacentHTML("beforeend", clone);

      if (reverse) parentSelector.classList.add("reverse");

      if (!firstElement) {
        return;
      }

      const moveItem = () => {
        if (reverse) {
          firstElement.style.marginRight = `-${i}px`;
        } else {
          firstElement.style.marginLeft = `-${i}px`;
        }
        if (i > firstElement.clientWidth) i = 0;
        i += speed;
        requestAnimationFrame(moveItem);
      };
      requestAnimationFrame(moveItem);
    }

    animate();
  }, [speed, reverse]);

  return (
    <div
      className={`flex overflow-hidden ${style || ""} ${reverse ? "flex-row-reverse" : ""}`}
      ref={ref}
    >
      {children}
    </div>
  );
};

export default Marquee;
