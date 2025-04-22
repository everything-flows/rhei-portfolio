export default function Pill() {
  return (
    <div className="relative m-40 size-40">
      <div
        className="border-brand absolute rounded-full border-2"
        style={{ top: "-4rem", width: "4rem", height: "4rem" }}
      />
      <div
        className="border-brand absolute border-2"
        style={{ top: "-2rem", width: "4rem", height: "4rem" }}
      />
      <div
        className="border-brand absolute rounded-full border-2"
        style={{
          top: 0,
          width: "4rem",
          height: "4rem",
          transform: "scaleY(0)",
        }}
      />

      <div
        className="border-reverse absolute rounded-full border-2"
        style={{
          top: 0,
          width: "4rem",
          height: "4rem",
          transform: "scaleY(0)",
        }}
      />
      <div
        className="border-reverse absolute border-2"
        style={{ top: "2rem", width: "4rem", height: "4rem" }}
      />
      <div
        className="border-reverse absolute rounded-full border-2"
        style={{ top: "4rem", width: "4rem", height: "4rem" }}
      />
      <div></div>
    </div>
  );
}
