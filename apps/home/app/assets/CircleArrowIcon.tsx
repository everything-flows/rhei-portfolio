type CardAssetProps = {
  size?: string | number;
  title?: string;
};

export default function CircleArrowIcon({
  size = "1em",
  title,
}: CardAssetProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role={title ? "img" : "presentation"}
    >
      <path
        d="M15 13.5V9M15 9H10.5M15 9L9.00019 14.9999M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
        stroke="currentColor"
        strokeWidth="0.2px"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
