"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin(e) {
    e.preventDefault(); // stop the page from refreshing
    // This is a FAKE login for learning. We just remember the name.
    // Later you can replace this with a real login (NextAuth, Firebase, etc.)
    localStorage.setItem("user", email.split("@")[0]);
    router.push("/dashboard");
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-linear-to-br from-indigo-500 via-purple-500 to-pink-500 p-4">
      <form
        onSubmit={handleLogin}
        className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-8"
      >
        <div className="text-center mb-8">
          <div className="text-5xl mb-2">💳</div>
          <h1 className="text-2xl font-bold">Welcome to SubTrack</h1>
          <p className="text-slate-500 text-sm mt-1">
            Never miss a renewal again
          </p>
        </div>

        <label className="block text-sm font-medium mb-1">Email</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="w-full border border-slate-300 rounded-xl px-4 py-2.5 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />

        <label className="block text-sm font-medium mb-1">Password</label>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          className="w-full border border-slate-300 rounded-xl px-4 py-2.5 mb-6 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-xl hover:bg-indigo-700 transition"
        >
          Log In
        </button>
      </form>
    </main>
  );
}