import { daysUntil, monthlyCost, costPerUse, formatMoney } from "@/lib/helpers";

export default function SubscriptionCard({ sub, onDelete, onToggle, onUse }) {
  const days = daysUntil(sub.renewalDate);
  const perUse = costPerUse(sub); // null if not used yet this month

  // Pick a colour and text depending on how soon it renews
  let badgeColor = "bg-green-100 text-green-700";
  let badgeText = `Renews in ${days} days`;

  if (days < 0) {
    badgeColor = "bg-slate-100 text-slate-500";
    badgeText = "Date passed";
  } else if (days === 0) {
    badgeColor = "bg-red-100 text-red-700";
    badgeText = "Renews today!";
  } else if (days <= 3) {
    badgeColor = "bg-red-100 text-red-700";
  } else if (days <= 7) {
    badgeColor = "bg-amber-100 text-amber-700";
  }

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 hover:shadow-md transition">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-linear-to-br from-indigo-500 to-purple-500 text-white flex items-center justify-center font-bold text-lg">
            {sub.name[0].toUpperCase()}
          </div>
          <div>
            <h3 className="font-semibold">{sub.name}</h3>
            <span className="text-xs text-slate-500">{sub.category}</span>
          </div>
        </div>

        <div className="text-right">
          <p className="font-bold text-lg">{formatMoney(sub.price)}</p>
          <p className="text-xs text-slate-500">
            {sub.billing === "yearly" ? `per year (${formatMoney(monthlyCost(sub))}/mo)` : "per month"}
          </p>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${badgeColor}`}>
          {badgeText}
        </span>
        <span className="text-xs text-slate-400">{sub.renewalDate}</span>
      </div>

      {/* NEW: usage and cost per use */}
      <div className="mt-4 bg-slate-50 rounded-xl p-3 flex items-center justify-between">
        <div>
          <p className="text-xs text-slate-500">Used {sub.usage} time(s) this month</p>
          {perUse === null ? (
            <p className="text-sm font-semibold text-red-500">Not used yet. Paying for nothing!</p>
          ) : (
            <p className="text-sm font-semibold text-indigo-600">
              {formatMoney(perUse)} per use
            </p>
          )}
        </div>
        <button
          onClick={() => onUse(sub.id)}
          className="bg-indigo-600 text-white text-sm px-3 py-1.5 rounded-lg hover:bg-indigo-700 transition"
        >
          +1 I used it
        </button>
      </div>

      <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
        <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
          <input
            type="checkbox"
            checked={sub.rarelyUsed}
            onChange={() => onToggle(sub.id)}
            className="w-4 h-4 accent-indigo-600"
          />
          I rarely use this
        </label>
        <button
          onClick={() => onDelete(sub.id)}
          className="text-sm text-red-500 hover:underline"
        >
          Delete
        </button>
      </div>
    </div>
  );
}