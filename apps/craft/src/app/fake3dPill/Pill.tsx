import PillElement from "./PillElement";

export default function Pill({
  width = "4rem",
  height = "3rem",
  speed = 500,
  fill = true,
}: {
  width?: string;
  height?: string;
  speed?: number;
  fill?: boolean;
}) {
  return (
    <div
      className="relative"
      style={{ width, height: `calc(${height} * 2 + ${width})` }}
    >
      {/* caps */}
      <PillElement
        type="cap"
        position="top"
        width={width}
        height={height}
        speed={speed}
        fill={fill}
      />
      <PillElement
        type="cap"
        position="bottom"
        width={width}
        height={height}
        speed={speed}
        fill={fill}
      />

      {/* bodies */}
      <PillElement
        type="body"
        position="top"
        width={width}
        height={height}
        speed={speed}
        fill={fill}
      />
      <PillElement
        type="body"
        position="bottom"
        width={width}
        height={height}
        speed={speed}
        fill={fill}
      />

      {/* dividers */}
      <PillElement
        type="divider"
        position="top"
        width={width}
        height={height}
        speed={speed}
        fill={fill}
      />
      <PillElement
        type="divider"
        position="bottom"
        width={width}
        height={height}
        speed={speed}
        fill={fill}
      />
    </div>
  );
}
