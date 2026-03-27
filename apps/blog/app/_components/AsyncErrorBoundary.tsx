import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { type ReactNode, Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

export default function AsyncErrorBoundary({
  children,
  fallbackRender,
  suspenseFallback,
}: {
  children: ReactNode;
  fallbackRender?: (props: { onRetry: () => void }) => ReactNode;
  suspenseFallback?: ReactNode;
}) {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          onReset={reset}
          fallbackRender={({ resetErrorBoundary }) =>
            fallbackRender ? (
              fallbackRender({ onRetry: resetErrorBoundary })
            ) : (
              <div>
                오류가 발생했습니다.
                <button type="button" onClick={resetErrorBoundary}>
                  다시 시도
                </button>
              </div>
            )
          }
        >
          <Suspense fallback={suspenseFallback}>{children}</Suspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}
