import { useState, useEffect } from "react";
import {
  Header,
  Timer,
  TaskBlocks,
  ControlButtons,
  TaskBlock,
  type TaskStatus,
  type BaseTask,
} from "../../components/CallbackHell";

interface Task extends BaseTask {
  startTime: number;
}

export default function SyncExecutionDemo() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "fileA",
      name: "파일 A 읽기",
      status: "pending",
      duration: 1000,
      startTime: 0,
    },
    {
      id: "fileB",
      name: "파일 B 읽기",
      status: "pending",
      duration: 1000,
      startTime: 1000,
    },
    {
      id: "fileC",
      name: "파일 C 읽기",
      status: "pending",
      duration: 1000,
      startTime: 2000,
    },
  ]);
  const [isRunning, setIsRunning] = useState(false);
  const [currentTaskIndex, setCurrentTaskIndex] = useState(-1);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);

  const totalDuration = tasks.reduce((acc, t) => acc + t.duration, 0);

  const runTasks = async () => {
    setIsRunning(true);
    setStartTime(Date.now());
    setElapsedTime(0);

    // 모든 작업 초기화
    setTasks((prev) =>
      prev.map((task) => ({ ...task, status: "pending" as TaskStatus })),
    );

    // 순차적으로 작업 실행
    for (let i = 0; i < tasks.length; i++) {
      setCurrentTaskIndex(i);

      // 작업 시작
      setTasks((prev) =>
        prev.map((task, idx) =>
          idx === i ? { ...task, status: "running" as TaskStatus } : task,
        ),
      );

      // 작업 실행 (시뮬레이션)
      await new Promise((resolve) => setTimeout(resolve, tasks[i].duration));

      // 작업 완료
      setTasks((prev) =>
        prev.map((task, idx) =>
          idx === i ? { ...task, status: "completed" as TaskStatus } : task,
        ),
      );
    }

    setCurrentTaskIndex(-1);
    setIsRunning(false);
  };

  const reset = () => {
    setTasks((prev) =>
      prev.map((task) => ({ ...task, status: "pending" as TaskStatus })),
    );
    setCurrentTaskIndex(-1);
    setIsRunning(false);
    setElapsedTime(0);
    setStartTime(null);
  };

  // 타이머 업데이트
  useEffect(() => {
    if (!isRunning || startTime === null) return;

    const interval = setInterval(() => {
      setElapsedTime(Date.now() - startTime);
    }, 10);

    return () => clearInterval(interval);
  }, [isRunning, startTime]);

  return (
    <div className="min-h-screen p-6 bg-normal text-normal">
      <div className="max-w-lg mx-auto space-y-2">
        <Header
          title="동기 방식 실행"
          subtitle="각 작업이 완료될 때까지 다음 작업이 대기합니다"
        />

        <Timer elapsedTime={elapsedTime} totalDuration={totalDuration} />

        <TaskBlocks>
          {tasks.map((task, index) => {
            const isBlocked = isRunning && index > currentTaskIndex;
            const progress =
              task.status === "running"
                ? Math.min(
                    100,
                    ((elapsedTime - task.startTime) / task.duration) * 100,
                  )
                : task.status === "completed"
                  ? 100
                  : 0;

            return (
              <TaskBlock
                key={task.id}
                task={task}
                progress={progress}
                color="blue"
                isBlocked={isBlocked}
              />
            );
          })}
        </TaskBlocks>

        <ControlButtons
          isRunning={isRunning}
          onRun={runTasks}
          onReset={reset}
          color="blue"
        />
      </div>
    </div>
  );
}
