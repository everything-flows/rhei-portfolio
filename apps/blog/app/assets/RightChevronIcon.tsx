export default function RightChevronIcon({
  size = "1rem",
  className = "",
}: {
  size?: string;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.52859 2.86201C5.78894 2.60166 6.21105 2.60166 6.4714 2.86201L11.1381 7.52868C11.3984 7.78901 11.3984 8.21115 11.1381 8.47148L6.4714 13.1381C6.21105 13.3985 5.78894 13.3985 5.52859 13.1381C5.26824 12.8778 5.26824 12.4557 5.52859 12.1953L9.72386 8.00008L5.52859 3.80482C5.26824 3.54447 5.26824 3.12236 5.52859 2.86201Z"
        fill="currentColor"
      />
    </svg>
  );
}
