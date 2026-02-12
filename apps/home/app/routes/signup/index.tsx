import { useLoaderData, useNavigate } from "@remix-run/react";
import { createBrowserClient } from "@supabase/ssr";
import { useState } from "react";

export { default as loader } from "./_utils/loader";

export default function SignUp() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { env } = useLoaderData();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    const supabase = createBrowserClient(
      env.SUPABASE_URL,
      env.SUPABASE_ANON_KEY,
    );

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      navigate("/signin");
    }
  };

  return (
    <main className="mx-auto mt-20 max-w-sm">
      <h1 className="mb-4 text-2xl font-bold">회원가입</h1>
      <form onSubmit={handleSignUp} className="space-y-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="이메일"
          className="w-full rounded border p-2"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호"
          className="w-full rounded border p-2"
          required
        />
        {error && <p className="text-red-500">{error}</p>}
        <button
          type="submit"
          className="w-full rounded bg-green-600 py-2 text-white hover:bg-green-700"
        >
          회원가입
        </button>
      </form>
    </main>
  );
}
