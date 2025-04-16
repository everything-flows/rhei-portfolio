import { GNB } from "@rhei/ui";

import { createClient } from "@/utils/supabase-server";

export default async function GNBWrapper() {
  try {
    const supabase = await createClient();

    const {
      data: { session },
    } = await supabase.auth.getSession();

    return (
      <header className="content-x">
        <GNB isLoggedIn={!!session?.user} />
      </header>
    );
  } catch {
    return (
      <header className="content-x">
        <GNB />
      </header>
    );
  }
}
