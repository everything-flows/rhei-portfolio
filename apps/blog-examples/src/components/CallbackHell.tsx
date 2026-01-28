import { ReactNode } from "react";

export type TaskStatus = "pending" | "running" | "completed";

export interface BaseTask {
  id: string;
  name: string;
  status: TaskStatus;
  duration: number;
}

interface HeaderProps {
  title: string;
  subtitle: string;
}

export function Header({ title, subtitle }: HeaderProps) {
  return (
    <div className="text-center">
      <h1 className="text-2xl font-bold">{title}</h1>
      <p className="text-sm text-gray-600 dark:text-gray-400">{subtitle}</p>
    </div>
  );
}

interface TimerProps {
  elapsedTime: number;
  totalDuration: number;
}

export function Timer({ elapsedTime, totalDuration }: TimerProps) {
  return (
    <div className="text-center">
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800">
        <span className="text-sm font-medium">경과 시간:</span>
        <span className="text-md font-mono font-bold">
          {(elapsedTime / 1000).toFixed(2)}s
        </span>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          / {(totalDuration / 1000).toFixed(1)}s
        </span>
      </div>
    </div>
  );
}

interface TaskBlocksProps {
  children: ReactNode;
}

export function TaskBlocks({ children }: TaskBlocksProps) {
  return (
    <div className="space-y-4">
      <div className="flex gap-2">{children}</div>
    </div>
  );
}

interface ControlButtonsProps {
  isRunning: boolean;
  onRun: () => void;
  onReset: () => void;
  runLabel?: string;
  runningLabel?: string;
  color?: "blue" | "green";
}

export function ControlButtons({
  isRunning,
  onRun,
  onReset,
  runLabel = "실행하기",
  runningLabel = "실행 중...",
  color = "blue",
}: ControlButtonsProps) {
  const colorClass =
    color === "blue"
      ? "bg-blue-500 hover:bg-blue-600"
      : "bg-green-500 hover:bg-green-600";

  return (
    <div className="flex gap-2 justify-center">
      <button
        onClick={onRun}
        disabled={isRunning}
        className={`px-6 py-2 rounded-lg ${colorClass} text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors`}
      >
        {isRunning ? runningLabel : runLabel}
      </button>
      <button
        onClick={onReset}
        disabled={isRunning}
        className="px-6 py-2 rounded-lg border border-gray-300 dark:border-gray-700 font-medium hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        초기화
      </button>
    </div>
  );
}

interface TaskBlockProps {
  task: BaseTask;
  progress: number;
  color?: "blue" | "green";
  isBlocked?: boolean;
}

export function TaskBlock({
  task,
  progress,
  color = "blue",
  isBlocked = false,
}: TaskBlockProps) {
  const getTaskColor = () => {
    if (isBlocked)
      return "bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-700";

    const colorMap = {
      blue: {
        running:
          "bg-blue-50 dark:bg-blue-900/20 border-blue-500 dark:border-blue-400",
        completed:
          "bg-green-50 dark:bg-green-900/20 border-green-500 dark:border-green-400",
      },
      green: {
        running:
          "bg-green-50 dark:bg-green-900/20 border-green-500 dark:border-green-400",
        completed:
          "bg-green-50 dark:bg-green-900/20 border-green-500 dark:border-green-400",
      },
    };

    switch (task.status) {
      case "running":
        return colorMap[color].running;
      case "completed":
        return colorMap[color].completed;
      default:
        return "bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700";
    }
  };

  const getProgressBarColor = () => {
    if (color === "green") {
      return "bg-green-500/20 dark:bg-green-400/10";
    }
    return task.status === "completed"
      ? "bg-green-500/20 dark:bg-green-400/10"
      : "bg-blue-500/20 dark:bg-blue-400/10";
  };

  const getIcon = () => {
    if (isBlocked) {
      return (
        <svg
          className="w-5 h-5 text-gray-400 dark:text-gray-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
          />
        </svg>
      );
    }

    const iconColor =
      color === "green"
        ? "green"
        : task.status === "running"
          ? "blue"
          : "green";
    const colorClass =
      iconColor === "blue"
        ? "border-blue-500 dark:border-blue-400"
        : "border-green-500 dark:border-green-400";
    const textColorClass =
      iconColor === "blue"
        ? "text-blue-500 dark:text-blue-400"
        : "text-green-500 dark:text-green-400";

    switch (task.status) {
      case "running":
        return (
          <div
            className={`w-5 h-5 rounded-full border-2 ${colorClass} border-t-transparent animate-spin`}
          />
        );
      case "completed":
        return (
          <svg
            className={`w-5 h-5 ${textColorClass}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        );
      default:
        return (
          <div className="w-5 h-5 rounded-full border-2 border-gray-300 dark:border-gray-600" />
        );
    }
  };

  return (
    <div className="flex-1 space-y-2">
      <div
        className={`relative p-2 rounded-2xl border-2 transition-all ${getTaskColor()} overflow-hidden`}
      >
        {/* 프로그레스 바 */}
        {(task.status === "running" || task.status === "completed") && (
          <div
            className={`absolute inset-0 ${getProgressBarColor()}`}
            style={{ width: `${progress}%`, transition: "none" }}
          />
        )}

        {/* 내용 */}
        <div className="relative h-full flex flex-col items-center justify-center p-2 text-center">
          {getIcon()}
          <h3 className="text-sm font-semibold mt-2">{task.name}</h3>
        </div>
      </div>
    </div>
  );
}
