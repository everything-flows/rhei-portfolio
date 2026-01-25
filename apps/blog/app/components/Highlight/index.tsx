import { color } from "@rhei/ui";

interface HighlightProps {
  children: React.ReactNode;
  className?: string;
}

export default function Highlight({
  children,
  className = "",
}: HighlightProps) {
  const lightColor = color.blue[200];
  const darkColor = color.orange[700];

  return (
    <mark
      className={`highlight ${className}`}
      style={
        {
          "--highlight-light": `linear-gradient(to right, ${lightColor}aa 2%, ${lightColor}88 13%, ${lightColor}aa 85%, ${lightColor}ff)`,
          "--highlight-dark": `linear-gradient(to right, ${darkColor}aa 2%, ${darkColor}88 13%, ${darkColor}aa 85%, ${darkColor}ff)`,
        } as React.CSSProperties
      }
    >
      {children}
    </mark>
  );
}
