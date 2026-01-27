import { useEffect, useRef } from "react";

export default function ThemedIframe({
  src,
  className,
  ...props
}: {
  src?: string;
  className?: string;
  [key: string]: unknown;
}) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const currentThemeRef = useRef<"dark" | "light" | null>(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe || !src) return;

    const sendTheme = () => {
      const isDark = document.documentElement.classList.contains("dark");
      const theme = isDark ? "dark" : "light";

      if (currentThemeRef.current === theme) {
        return;
      }

      currentThemeRef.current = theme;

      try {
        iframe.contentWindow?.postMessage({ type: "THEME_UPDATE", theme }, "*");
      } catch (e) {}
    };

    const handleLoad = () => {
      sendTheme();
    };

    const observer = new MutationObserver(() => {
      sendTheme();
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    iframe.addEventListener("load", handleLoad);

    if (iframe.contentDocument?.readyState === "complete") {
      handleLoad();
    } else {
      sendTheme();
    }

    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === "REQUEST_THEME") {
        sendTheme();
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      iframe.removeEventListener("load", handleLoad);
      window.removeEventListener("message", handleMessage);
      observer.disconnect();
    };
  }, [src]);

  console.log(props);

  return (
    <iframe
      ref={iframeRef}
      src={src}
      className={className}
      {...props}
      title="themed-iframe"
    />
  );
}
