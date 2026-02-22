import { Link } from "@remix-run/react";
import { GNB } from "@rhei/ui";
import { motion } from "motion/react";

import { bounceTransition, tapAnimation } from "~/constants/motion";

export default function NotFoundPage() {
  return (
    <div className="flex min-h-dvh flex-col">
      <header className="content-x">
        <GNB route="/blog" />
      </header>

      <main className="content-x m-auto flex flex-1 flex-col items-center justify-center">
        <h1 className="text-responsive-h1">404: Page Not Found</h1>
        <p className="text-responsive-p text-neutral-600 dark:text-neutral-300">
          존재하지 않는 경로에요.
        </p>
        <Link to="/">
          <motion.div
            whileTap={tapAnimation.small}
            transition={bounceTransition}
            className="bg-reverse text-responsive-p text-reverse mt-4 rounded-full border px-6 py-3 font-semibold"
          >
            블로그 홈으로 이동
          </motion.div>
        </Link>
      </main>
    </div>
  );
}
