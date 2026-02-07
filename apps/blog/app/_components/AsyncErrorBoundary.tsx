import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { ReactNode, Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

export default function AsyncErrorBoundary({
  children,
  fallbackRender,
}: {
  children: ReactNode;
  fallbackRender?: (props: { onRetry: () => void }) => ReactNode;
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
              <div>Error!</div>
            )
          }
        >
          <Suspense>{children}</Suspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}
