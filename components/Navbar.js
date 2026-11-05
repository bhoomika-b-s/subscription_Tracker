"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/subscriptions", label: "Subscriptions" },
  { href: "/add", label: "Add New" },
  { href: "/payment", label: "Payment" },
];

export default function Navbar() {
  const pathname = usePathname(); // current page, used to highlight the active link
  const router = useRouter();
  const [user, setUser] = useState("");

  // If nobody is logged in, send them to the login page
  useEffect(() => {
    const name = localStorage.getItem("user");
    if (!name) router.push("/login");
    else setUser(name);
  }, [router]);

  function logout() {
    localStorage.removeItem("user");
    router.push("/login");
  }

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-10">
      <div className="max-w-5xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-3">
        <span className="text-xl font-bold text-indigo-600">💳 SubTrack</span>

        <div className="flex gap-1">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                pathname === link.href
                  ? "bg-indigo-100 text-indigo-700"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3 text-sm">
          <span className="text-slate-500">Hi, {user}</span>
          <button onClick={logout} className="text-red-500 hover:underline">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}