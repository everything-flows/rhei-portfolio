"use client";

import { GNB } from "@rhei/ui";

export default function GNBClientWrapper({
  isLoggedIn = false,
}: {
  isLoggedIn?: boolean;
}) {
  return (
    <header className="content-x">
      <GNB isLoggedIn={isLoggedIn} />
    </header>
  );
}
