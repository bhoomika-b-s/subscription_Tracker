"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import SubscriptionCard from "@/components/SubscriptionCard";
import { useSubscriptions } from "@/lib/useSubscriptions";
import { daysUntil, monthlyCost } from "@/lib/helpers";

export default function SubscriptionsPage() {
  const { subs, loaded, deleteSub, toggleRarelyUsed, addUse } = useSubscriptions();
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("date");

  if (!loaded) return <Navbar />;

  // 1) filter by search text, 2) sort by chosen option
  const shown = subs
    .filter((s) => s.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) =>
      sortBy === "price"
        ? monthlyCost(b) - monthlyCost(a)
        : daysUntil(a.renewalDate) - daysUntil(b.renewalDate)
    );

  return (
    <>
      <Navbar />
      <main className="max-w-5xl mx-auto p-4 md:p-8">
        <h1 className="text-2xl font-bold mb-6">My Subscriptions</h1>

        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <input
            type="text"
            placeholder="🔍 Search subscriptions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 border border-slate-300 rounded-xl px-4 py-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border border-slate-300 rounded-xl px-4 py-2.5 bg-white"
          >
            <option value="date">Sort: Renewing soonest</option>
            <option value="price">Sort: Most expensive</option>
          </select>
        </div>

        {shown.length === 0 ? (
          <p className="text-center text-slate-500 py-12">No subscriptions found.</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {shown.map((sub) => (
              <SubscriptionCard
  key={sub.id}
  sub={sub}
  onDelete={deleteSub}
  onToggle={toggleRarelyUsed}
  onUse={addUse}
/>
            ))}
          </div>
        )}
      </main>
    </>
  );
}