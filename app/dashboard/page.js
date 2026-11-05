"use client";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import CheckInCard from "@/components/CheckInCard";
import { useSubscriptions } from "@/lib/useSubscriptions";
import { daysUntil, monthlyCost, costPerUse, getMonthKey, formatMoney } from "@/lib/helpers";

export default function DashboardPage() {
  const { subs, loaded, answerCheckIn } = useSubscriptions();

  if (!loaded) return <Navbar />;

  // --- Calculations ---
  const monthlyTotal = subs.reduce((sum, s) => sum + monthlyCost(s), 0);
  const yearlyTotal = monthlyTotal * 12;

  const upcoming = subs
    .filter((s) => daysUntil(s.renewalDate) >= 0 && daysUntil(s.renewalDate) <= 7)
    .sort((a, b) => daysUntil(a.renewalDate) - daysUntil(b.renewalDate));

  const rarelyUsed = subs.filter((s) => s.rarelyUsed);
  const yearlySavings = rarelyUsed.reduce((sum, s) => sum + monthlyCost(s) * 12, 0);

  const byCategory = {};
  subs.forEach((s) => {
    byCategory[s.category] = (byCategory[s.category] || 0) + monthlyCost(s);
  });

  // NEW: subscriptions we haven't asked about this month
  const pendingCheckIns = subs.filter((s) => s.lastCheckIn !== getMonthKey());

  // NEW: worst value first. Unused ones (null) count as the worst.
  const rankedByValue = [...subs].sort(
    (a, b) => (costPerUse(b) ?? Infinity) - (costPerUse(a) ?? Infinity)
  );

  return (
    <>
      <Navbar />
      <main className="max-w-5xl mx-auto p-4 md:p-8">
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

        {/* NEW: shows one check-in question at a time */}
        {pendingCheckIns.length > 0 && (
          <CheckInCard
            sub={pendingCheckIns[0]}
            remaining={pendingCheckIns.length}
            onAnswer={answerCheckIn}
          />
        )}

        {/* Three summary cards */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div className="bg-linear-to-br from-indigo-500 to-purple-600 text-white rounded-2xl p-6 shadow">
            <p className="text-sm opacity-80">Monthly spend</p>
            <p className="text-3xl font-bold mt-1">{formatMoney(monthlyTotal)}</p>
          </div>
          <div className="bg-linear-to-br from-pink-500 to-rose-500 text-white rounded-2xl p-6 shadow">
            <p className="text-sm opacity-80">Yearly spend</p>
            <p className="text-3xl font-bold mt-1">{formatMoney(yearlyTotal)}</p>
          </div>
          <div className="bg-linear-to-br from-emerald-500 to-teal-500 text-white rounded-2xl p-6 shadow">
            <p className="text-sm opacity-80">Active subscriptions</p>
            <p className="text-3xl font-bold mt-1">{subs.length}</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Upcoming renewals */}
          <section className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <h2 className="font-semibold mb-4">⏰ Renewing this week</h2>
            {upcoming.length === 0 ? (
              <p className="text-slate-500 text-sm">Nothing renews in the next 7 days 🎉</p>
            ) : (
              <ul className="space-y-3">
                {upcoming.map((s) => (
                  <li key={s.id} className="flex justify-between text-sm">
                    <span className="font-medium">{s.name}</span>
                    <span className="text-slate-500">
                      {daysUntil(s.renewalDate) === 0 ? "Today" : `in ${daysUntil(s.renewalDate)} days`} · {formatMoney(s.price)}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </section>

          {/* Savings calculator */}
          <section className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
            <h2 className="font-semibold mb-2">💡 Smart saving tip</h2>
            {rarelyUsed.length === 0 ? (
              <p className="text-sm text-slate-600">
                Mark subscriptions you rarely use and we&apos;ll show how much you could save.
              </p>
            ) : (
              <>
                <p className="text-sm text-slate-600">
                  You have {rarelyUsed.length} subscription(s) marked as rarely used. Cancelling them saves:
                </p>
                <p className="text-3xl font-bold text-amber-600 my-2">
                  {formatMoney(yearlySavings)} / year
                </p>
                <p className="text-sm text-slate-500">
                  {rarelyUsed.map((s) => s.name).join(", ")}
                </p>
              </>
            )}
          </section>
        </div>

        {/* NEW: cost per use ranking */}
        <section className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mt-6">
          <h2 className="font-semibold mb-1">💸 Value for money this month</h2>
          <p className="text-xs text-slate-500 mb-4">Worst value first. Tap &quot;+1 I used it&quot; on the Subscriptions page to update.</p>
          <ul className="space-y-3">
            {rankedByValue.map((s) => (
              <li key={s.id} className="flex justify-between text-sm">
                <span className="font-medium">{s.name}</span>
                {costPerUse(s) === null ? (
                  <span className="text-red-500 font-medium">Unused</span>
                ) : (
                  <span className="text-slate-600">{formatMoney(costPerUse(s))} per use</span>
                )}
              </li>
            ))}
          </ul>
        </section>

        {/* Category bars */}
        <section className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mt-6">
          <h2 className="font-semibold mb-4">📊 Spending by category (monthly)</h2>
          <div className="space-y-4">
            {Object.entries(byCategory).map(([category, amount]) => (
              <div key={category}>
                <div className="flex justify-between text-sm mb-1">
                  <span>{category}</span>
                  <span className="text-slate-500">{formatMoney(amount)}</span>
                </div>
                <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-linear-to-r from-indigo-500 to-purple-500 rounded-full"
                    style={{ width: `${(amount / monthlyTotal) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="text-center mt-8">
          <Link
            href="/add"
            className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-indigo-700 transition"
          >
            + Add a subscription
          </Link>
        </div>
      </main>
    </>
  );
}