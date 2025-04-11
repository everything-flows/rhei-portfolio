import { GNB } from "@rhei/ui";

import { createClient } from "@/utils/supabase-server";

export default async function Home() {
  const supabase = await createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const user = session?.user;

  return (
    <>
      <header className="content-x">
        <GNB isLoggedIn={!!user} />
      </header>

      <main className="content-x">
        <section className="mx-auto max-w-6xl">section</section>
        <section className="mx-auto max-w-6xl">section</section>
        <section className="mx-auto max-w-6xl">section</section>
        <section className="mx-auto max-w-6xl">section</section>
      </main>
    </>
  );
}
