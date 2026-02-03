import { useState, useRef } from "react";

type IPCType = "pipe" | "socket" | "shared-memory" | "message-queue";

const IPC_INFO: Record<IPCType, { name: string; description: string }> = {
  pipe: {
    name: "Pipe",
    description: "단방향 데이터 스트림. 부모-자식 프로세스 간 통신에 적합해요.",
  },
  socket: {
    name: "Socket",
    description: "양방향 통신 채널. 같은 머신 또는 네트워크를 통해 통신할 수 있어요.",
  },
  "shared-memory": {
    name: "Shared Memory",
    description: "같은 메모리 영역을 공유해요. 복사가 없어서 대용량 데이터에 빨라요.",
  },
  "message-queue": {
    name: "Message Queue",
    description: "메시지를 큐에 쌓아두고 순서대로 처리해요. 비동기 처리에 유리해요.",
  },
};

export default function IPCDemo() {
  const [selectedType, setSelectedType] = useState<IPCType>("pipe");

  return (
    <div className="min-h-screen p-4 bg-normal text-normal">
      <div className="max-w-2xl mx-auto space-y-4">
        {/* 헤더 */}
        <div className="text-center">
          <h1 className="text-xl font-bold">IPC 방식 비교</h1>
          <p className="text-xs text-gray-600 dark:text-gray-400">
            프로세스 간 통신 방식을 선택해서 동작을 확인해 보세요
          </p>
        </div>

        {/* 탭 선택 */}
        <div className="flex gap-1 p-1 bg-gray-100 dark:bg-gray-800 rounded-lg">
          {(Object.keys(IPC_INFO) as IPCType[]).map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`flex-1 px-2 py-1.5 rounded-md text-xs font-medium transition-colors ${
                selectedType === type
                  ? "bg-white dark:bg-gray-700 shadow-sm"
                  : "hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              {IPC_INFO[type].name}
            </button>
          ))}
        </div>

        {/* 설명 */}
        <div className="text-center text-sm text-gray-600 dark:text-gray-400">
          {IPC_INFO[selectedType].description}
        </div>

        {/* 데모 영역 */}
        {selectedType === "pipe" && <PipeDemo />}
        {selectedType === "socket" && <SocketDemo />}
        {selectedType === "shared-memory" && <SharedMemoryDemo />}
        {selectedType === "message-queue" && <MessageQueueDemo />}
      </div>
    </div>
  );
}

// ============================================================================
// Pipe Demo - 단방향 스트림
// ============================================================================
interface MovingData {
  id: number;
  text: string;
}

function PipeDemo() {
  const [isRunning, setIsRunning] = useState(false);
  const [sentChunks, setSentChunks] = useState<string[]>([]);
  const [movingChunk, setMovingChunk] = useState<MovingData | null>(null);
  const [receivedChunks, setReceivedChunks] = useState<string[]>([]);
  const idRef = useRef(0);

  const runDemo = async () => {
    setIsRunning(true);
    setSentChunks([]);
    setMovingChunk(null);
    setReceivedChunks([]);

    const chunks = ["chunk1", "chunk2", "chunk3", "chunk4", "EOF"];

    for (const chunk of chunks) {
      // 부모가 파이프에 쓰기
      setSentChunks((prev) => [...prev, chunk]);
      await sleep(200);

      // 파이프를 통해 이동
      setMovingChunk({ id: idRef.current++, text: chunk });
      await sleep(600);

      // 자식이 파이프에서 읽기
      setMovingChunk(null);
      setReceivedChunks((prev) => [...prev, chunk]);
      await sleep(200);
    }

    setIsRunning(false);
  };

  return (
    <div className="space-y-4">
      {/* 시각화 */}
      <div className="flex items-center gap-2">
        <ProcessBox title="부모 프로세스" color="blue" status="Write">
          <div className="text-xs font-mono space-y-1 h-20 overflow-y-auto">
            {sentChunks.map((chunk, i) => (
              <div key={i} className="text-blue-600 dark:text-blue-400">
                → {chunk}
              </div>
            ))}
          </div>
        </ProcessBox>

        {/* 파이프 시각화 */}
        <div className="flex-1 flex flex-col items-center">
          <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Pipe (단방향)</div>
          <div className="w-full h-8 bg-gray-200 dark:bg-gray-700 rounded-full relative overflow-hidden">
            {/* 이동 중인 데이터 */}
            {movingChunk && (
              <div
                key={movingChunk.id}
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 px-2 py-0.5 bg-blue-500 text-white text-[10px] rounded whitespace-nowrap animate-move-right"
              >
                {movingChunk.text}
              </div>
            )}
            {/* 방향 표시 */}
            <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-xs">
              → → →
            </div>
          </div>
        </div>

        <ProcessBox title="자식 프로세스" color="green" status="Read">
          <div className="text-xs font-mono space-y-1 h-20 overflow-y-auto">
            {receivedChunks.map((chunk, i) => (
              <div key={i} className="text-green-600 dark:text-green-400">
                ✓ {chunk}
              </div>
            ))}
          </div>
        </ProcessBox>
      </div>

      <ControlButton isRunning={isRunning} onRun={runDemo} />
    </div>
  );
}

// ============================================================================
// Socket Demo - 양방향 통신
// ============================================================================
interface SocketMessage {
  from: "client" | "server";
  text: string;
}

function SocketDemo() {
  const [isRunning, setIsRunning] = useState(false);
  const [clientMessages, setClientMessages] = useState<string[]>([]);
  const [serverMessages, setServerMessages] = useState<string[]>([]);
  const [movingMessage, setMovingMessage] = useState<{ id: number; from: "client" | "server"; text: string } | null>(null);
  const [logs, setLogs] = useState<SocketMessage[]>([]);
  const idRef = useRef(0);

  const runDemo = async () => {
    setIsRunning(true);
    setClientMessages([]);
    setServerMessages([]);
    setMovingMessage(null);
    setLogs([]);

    const conversation: SocketMessage[] = [
      { from: "client", text: "CONNECT" },
      { from: "server", text: "ACK" },
      { from: "client", text: "REQUEST" },
      { from: "server", text: "RESPONSE" },
      { from: "client", text: "CLOSE" },
      { from: "server", text: "CLOSED" },
    ];

    for (const msg of conversation) {
      // 보내는 쪽에 표시
      if (msg.from === "client") {
        setClientMessages((prev) => [...prev, msg.text]);
      } else {
        setServerMessages((prev) => [...prev, msg.text]);
      }
      await sleep(150);

      // 이동 애니메이션
      setMovingMessage({ id: idRef.current++, from: msg.from, text: msg.text });
      setLogs((prev) => [...prev, msg]);
      await sleep(600);

      setMovingMessage(null);
      await sleep(150);
    }

    setIsRunning(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <ProcessBox title="클라이언트" color="blue" status="Socket">
          <div className="text-xs font-mono space-y-1 h-20 overflow-y-auto">
            {clientMessages.map((text, i) => (
              <div key={i} className="text-blue-600 dark:text-blue-400">
                → {text}
              </div>
            ))}
          </div>
        </ProcessBox>

        {/* 소켓 시각화 - 양방향 */}
        <div className="flex-1 flex flex-col items-center">
          <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Socket (양방향)</div>
          <div className="w-full space-y-1">
            {/* Client → Server 채널 */}
            <div className="h-6 bg-blue-100 dark:bg-blue-900/30 rounded-full relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center text-blue-300 dark:text-blue-700 text-xs">
                → → →
              </div>
              {movingMessage && movingMessage.from === "client" && (
                <div
                  key={movingMessage.id}
                  className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 px-2 py-0.5 bg-blue-500 text-white text-[10px] rounded whitespace-nowrap animate-move-right"
                >
                  {movingMessage.text}
                </div>
              )}
            </div>
            {/* Server → Client 채널 */}
            <div className="h-6 bg-green-100 dark:bg-green-900/30 rounded-full relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center text-green-300 dark:text-green-700 text-xs">
                ← ← ←
              </div>
              {movingMessage && movingMessage.from === "server" && (
                <div
                  key={movingMessage.id}
                  className="absolute top-1/2 -translate-y-1/2 translate-x-1/2 px-2 py-0.5 bg-green-500 text-white text-[10px] rounded whitespace-nowrap animate-move-left"
                >
                  {movingMessage.text}
                </div>
              )}
            </div>
          </div>
        </div>

        <ProcessBox title="서버" color="green" status="Socket">
          <div className="text-xs font-mono space-y-1 h-20 overflow-y-auto">
            {serverMessages.map((text, i) => (
              <div key={i} className="text-green-600 dark:text-green-400">
                ← {text}
              </div>
            ))}
          </div>
        </ProcessBox>
      </div>

      {/* 메시지 로그 */}
      <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3">
        <div className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">통신 로그</div>
        <div className="space-y-1 h-24 overflow-y-auto font-mono text-xs">
          {logs.map((msg, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className={msg.from === "client" ? "text-blue-500" : "text-green-500"}>
                {msg.from === "client" ? "Client → Server" : "Server → Client"}
              </span>
              <span>{msg.text}</span>
            </div>
          ))}
        </div>
      </div>

      <ControlButton isRunning={isRunning} onRun={runDemo} />
    </div>
  );
}

// ============================================================================
// Shared Memory Demo - 메모리 공유
// ============================================================================
function SharedMemoryDemo() {
  const [isRunning, setIsRunning] = useState(false);
  const [sharedBuffer, setSharedBuffer] = useState<number[]>([0, 0, 0, 0]);
  const [writerIndex, setWriterIndex] = useState(-1);
  const [readerIndex, setReaderIndex] = useState(-1);
  const [logs, setLogs] = useState<string[]>([]);

  const runDemo = async () => {
    setIsRunning(true);
    setSharedBuffer([0, 0, 0, 0]);
    setLogs([]);

    // Writer가 데이터 쓰기
    for (let i = 0; i < 4; i++) {
      setWriterIndex(i);
      setLogs((prev) => [...prev, `Writer: buffer[${i}] = ${(i + 1) * 10}`]);
      await sleep(300);
      setSharedBuffer((prev) => {
        const next = [...prev];
        next[i] = (i + 1) * 10;
        return next;
      });
      await sleep(200);
    }
    setWriterIndex(-1);

    await sleep(300);

    // Reader가 데이터 읽기
    for (let i = 0; i < 4; i++) {
      setReaderIndex(i);
      setLogs((prev) => [...prev, `Reader: read buffer[${i}] → ${(i + 1) * 10}`]);
      await sleep(400);
    }
    setReaderIndex(-1);

    setIsRunning(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <ProcessBox title="Writer" color="blue" status={writerIndex >= 0 ? "Writing..." : "Idle"}>
          <div className="text-xs text-center">
            {writerIndex >= 0 && (
              <span className="text-blue-600 dark:text-blue-400">
                buffer[{writerIndex}] 쓰는 중
              </span>
            )}
          </div>
        </ProcessBox>

        {/* 공유 메모리 시각화 */}
        <div className="flex-1 flex flex-col items-center">
          <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Shared Memory</div>
          <div className="flex gap-1">
            {sharedBuffer.map((value, i) => (
              <div
                key={i}
                className={`w-10 h-10 rounded border-2 flex items-center justify-center text-xs font-mono transition-colors ${
                  writerIndex === i
                    ? "border-blue-500 bg-blue-100 dark:bg-blue-900/30"
                    : readerIndex === i
                      ? "border-green-500 bg-green-100 dark:bg-green-900/30"
                      : "border-gray-300 dark:border-gray-600"
                }`}
              >
                {value}
              </div>
            ))}
          </div>
          <div className="text-[10px] text-gray-400 mt-1">복사 없이 직접 접근</div>
        </div>

        <ProcessBox title="Reader" color="green" status={readerIndex >= 0 ? "Reading..." : "Idle"}>
          <div className="text-xs text-center">
            {readerIndex >= 0 && (
              <span className="text-green-600 dark:text-green-400">
                buffer[{readerIndex}] 읽는 중
              </span>
            )}
          </div>
        </ProcessBox>
      </div>

      {/* 로그 */}
      <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3">
        <div className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">접근 로그</div>
        <div className="space-y-1 h-24 overflow-y-auto font-mono text-xs">
          {logs.map((log, i) => (
            <div key={i} className={log.startsWith("Writer") ? "text-blue-500" : "text-green-500"}>
              {log}
            </div>
          ))}
        </div>
      </div>

      <ControlButton isRunning={isRunning} onRun={runDemo} />
    </div>
  );
}

// ============================================================================
// Message Queue Demo - 큐 기반 통신
// ============================================================================
function MessageQueueDemo() {
  const [isRunning, setIsRunning] = useState(false);
  const [queue, setQueue] = useState<string[]>([]);
  const [processed, setProcessed] = useState<string[]>([]);
  const [logs, setLogs] = useState<string[]>([]);

  const runDemo = async () => {
    setIsRunning(true);
    setQueue([]);
    setProcessed([]);
    setLogs([]);

    const messages = ["Task A", "Task B", "Task C", "Task D"];

    // Producer가 메시지 추가
    for (const msg of messages) {
      setLogs((prev) => [...prev, `Producer: enqueue "${msg}"`]);
      setQueue((prev) => [...prev, msg]);
      await sleep(300);
    }

    await sleep(500);

    // Consumer가 메시지 처리
    for (let i = 0; i < messages.length; i++) {
      const msg = messages[i];
      setLogs((prev) => [...prev, `Consumer: dequeue "${msg}"`]);
      setQueue((prev) => prev.slice(1));
      await sleep(200);
      setProcessed((prev) => [...prev, msg]);
      await sleep(300);
    }

    setIsRunning(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <ProcessBox title="Producer" color="blue" status="Enqueue">
          <div className="text-xs text-center text-blue-600 dark:text-blue-400">
            메시지 생산
          </div>
        </ProcessBox>

        {/* 메시지 큐 시각화 */}
        <div className="flex-1 flex flex-col items-center">
          <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Message Queue</div>
          <div className="w-full h-10 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center px-2 gap-1 overflow-hidden">
            {queue.length === 0 ? (
              <span className="text-xs text-gray-400">(empty)</span>
            ) : (
              queue.map((msg, i) => (
                <div
                  key={i}
                  className="px-2 py-1 bg-purple-500 text-white text-[10px] rounded whitespace-nowrap"
                >
                  {msg}
                </div>
              ))
            )}
          </div>
          <div className="text-[10px] text-gray-400 mt-1">FIFO 순서 보장</div>
        </div>

        <ProcessBox title="Consumer" color="green" status="Dequeue">
          <div className="text-xs font-mono space-y-0.5">
            {processed.map((msg, i) => (
              <div key={i} className="text-green-600 dark:text-green-400 text-[10px]">
                ✓ {msg}
              </div>
            ))}
          </div>
        </ProcessBox>
      </div>

      {/* 로그 */}
      <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3">
        <div className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">큐 동작 로그</div>
        <div className="space-y-1 h-24 overflow-y-auto font-mono text-xs">
          {logs.map((log, i) => (
            <div key={i} className={log.startsWith("Producer") ? "text-blue-500" : "text-green-500"}>
              {log}
            </div>
          ))}
        </div>
      </div>

      <ControlButton isRunning={isRunning} onRun={runDemo} />
    </div>
  );
}

// ============================================================================
// 공통 컴포넌트
// ============================================================================
function ProcessBox({
  title,
  color,
  status,
  children,
}: {
  title: string;
  color: "blue" | "green";
  status: string;
  children?: React.ReactNode;
}) {
  const borderColor = color === "blue" ? "border-blue-500" : "border-green-500";
  const bgColor = color === "blue" ? "bg-blue-50 dark:bg-blue-900/20" : "bg-green-50 dark:bg-green-900/20";

  return (
    <div className={`w-32 min-h-[100px] rounded-lg border-2 ${borderColor} ${bgColor} p-2`}>
      <div className="text-xs font-semibold text-center">{title}</div>
      <div className="text-[10px] text-gray-500 dark:text-gray-400 text-center mb-2">{status}</div>
      {children}
    </div>
  );
}

function ControlButton({ isRunning, onRun }: { isRunning: boolean; onRun: () => void }) {
  return (
    <div className="flex justify-center">
      <button
        onClick={onRun}
        disabled={isRunning}
        className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-medium transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isRunning ? "실행 중..." : "실행하기"}
      </button>
    </div>
  );
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
