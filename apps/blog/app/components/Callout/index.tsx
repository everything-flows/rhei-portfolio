export default function Callout({
  children,
  type = "info",
  className = "",
}: CalloutProps) {
  const {
    Icon,
    className: typeClassName,
    iconClassName,
  } = config[type] ?? config.info;

  return (
    <div
      className={`my-4 flex items-start gap-3 rounded-lg px-4 py-3 ${typeClassName} ${className}`}
    >
      <span className={`mt-1 shrink-0 ${iconClassName}`}>
        <Icon />
      </span>
      {children}
    </div>
  );
}

interface CalloutProps {
  children: React.ReactNode;
  type?: CalloutType;
  className?: string;
}

const InfoIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="size-5"
  >
    <path
      fillRule="evenodd"
      d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
      clipRule="evenodd"
    />
  </svg>
);

const WarnIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="size-5"
  >
    <path
      fillRule="evenodd"
      d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
      clipRule="evenodd"
    />
  </svg>
);

const ErrorIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="size-5"
  >
    <path
      fillRule="evenodd"
      d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z"
      clipRule="evenodd"
    />
  </svg>
);

const TipIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="size-5"
  >
    <path d="M12 .75a8.25 8.25 0 00-4.135 15.39c.686.398 1.115 1.008 1.134 1.623a.75.75 0 00.577.706c.352.083.71.148 1.074.195.323.041.6-.218.6-.544v-4.661a6.714 6.714 0 01-.937-.171.75.75 0 11.374-1.453 5.261 5.261 0 002.626 0 .75.75 0 11.374 1.452 6.712 6.712 0 01-.937.172v4.66c0 .327.277.586.6.545.364-.047.722-.112 1.074-.195a.75.75 0 00.577-.706c.02-.615.448-1.225 1.134-1.623A8.25 8.25 0 0012 .75z" />
    <path
      fillRule="evenodd"
      d="M9.013 19.9a.75.75 0 01.877-.597 11.319 11.319 0 004.22 0 .75.75 0 11.28 1.473 12.819 12.819 0 01-4.78 0 .75.75 0 01-.597-.876zM9.754 22.344a.75.75 0 01.824-.673 13.122 13.122 0 002.844 0 .75.75 0 11.15 1.497 14.623 14.623 0 01-3.144 0 .75.75 0 01-.674-.824z"
      clipRule="evenodd"
    />
  </svg>
);

const config = {
  info: {
    Icon: InfoIcon,
    className: "bg-blue-100/80 text-black dark:bg-blue-900/40 dark:text-black",
    iconClassName: "text-blue-500 dark:text-blue-400",
  },
  warn: {
    Icon: WarnIcon,
    className: "bg-yellow-100/80 text-black dark:bg-yellow-900/40 dark:text-black",
    iconClassName: "text-yellow-500 dark:text-yellow-400",
  },
  error: {
    Icon: ErrorIcon,
    className: "bg-red-100/80 text-black dark:bg-red-900/40 dark:text-black",
    iconClassName: "text-red-500 dark:text-red-400",
  },
  tip: {
    Icon: TipIcon,
    className: "bg-green-100/80 text-black dark:bg-green-900/40 dark:text-black",
    iconClassName: "text-green-500 dark:text-green-400",
  },
} as const;

type CalloutType = keyof typeof config;
