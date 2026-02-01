import { format } from "date-fns";
import { useEffect, useState } from "react";

export default function PostDate({ date }: { date: Date | string }) {
  const [formatted, setFormatted] = useState<string>(DATE_PLACEHOLDER);

  useEffect(() => {
    const d = typeof date === "string" ? new Date(date) : date;
    setFormatted(format(d, "yyyy.MM.dd."));
  }, [date]);

  return <span>{formatted}</span>;
}

const DATE_PLACEHOLDER = "0000.00.00.";
