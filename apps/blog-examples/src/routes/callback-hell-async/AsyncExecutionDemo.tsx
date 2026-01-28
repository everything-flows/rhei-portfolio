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
  progress: number;
}

export default function AsyncExecutionDemo() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "fileA",
      name: "파일 A 읽기",
      status: "pending",
      duration: 1000,
      progress: 0,
    },
    {
      id: "fileB",
      name: "파일 B 읽기",
      status: "pending",
      duration: 1000,
      progress: 0,
    },
    {
      id: "fileC",
      name: "파일 C 읽기",
      status: "pending",
      duration: 1000,
      progress: 0,
    },
  ]);
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);

  const maxDuration = Math.max(...tasks.map((t) => t.duration));

  const runTasks = async () => {
    setIsRunning(true);
    setStartTime(Date.now());
    setElapsedTime(0);

    // 모든 작업 초기화
    setTasks((prev) =>
      prev.map((task) => ({
        ...task,
        status: "pending" as TaskStatus,
        progress: 0,
      })),
    );

    // 모든 작업을 동시에 시작
    const taskPromises = tasks.map(async (task, index) => {
      // 작업 시작
      setTasks((prev) =>
        prev.map((t, i) =>
          i === index ? { ...t, status: "running" as TaskStatus } : t,
        ),
      );

      const taskStartTime = Date.now();

      // 프로그레스 업데이트를 위한 인터벌
      const interval = setInterval(() => {
        const elapsed = Date.now() - taskStartTime;
        const progress = Math.min(100, (elapsed / task.duration) * 100);

        setTasks((prev) =>
          prev.map((t, i) => (i === index ? { ...t, progress } : t)),
        );
      }, 10);

      // 작업 실행 (시뮬레이션)
      await new Promise((resolve) => setTimeout(resolve, task.duration));

      clearInterval(interval);

      // 작업 완료
      setTasks((prev) =>
        prev.map((t, i) =>
          i === index
            ? { ...t, status: "completed" as TaskStatus, progress: 100 }
            : t,
        ),
      );
    });

    // 모든 작업이 완료될 때까지 대기
    await Promise.all(taskPromises);
    setIsRunning(false);
  };

  const reset = () => {
    setTasks((prev) =>
      prev.map((task) => ({
        ...task,
        status: "pending" as TaskStatus,
        progress: 0,
      })),
    );
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
          title="비동기 방식 실행"
          subtitle="모든 작업이 동시에 시작되어 병렬로 실행됩니다"
        />

        <Timer elapsedTime={elapsedTime} totalDuration={maxDuration} />

        <TaskBlocks>
          {tasks.map((task) => (
            <TaskBlock
              key={task.id}
              task={task}
              progress={task.progress}
              color="green"
            />
          ))}
        </TaskBlocks>

        <ControlButtons isRunning={isRunning} onRun={runTasks} color="green" />
      </div>
    </div>
  );
}
