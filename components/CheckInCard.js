// Asks one question at a time: "Did you use X?"
export default function CheckInCard({ sub, remaining, onAnswer }) {
  return (
    <div className="bg-indigo-50 border border-indigo-200 rounded-2xl p-6 mb-6">
      <p className="text-xs font-semibold text-indigo-600 mb-1">
        📝 MONTHLY CHECK-IN · {remaining} left
      </p>
      <h2 className="text-lg font-semibold mb-4">
        Did you use {sub.name} in the last month?
      </h2>

      <div className="flex gap-3">
        <button
          onClick={() => onAnswer(sub.id, true)}
          className="bg-green-500 text-white px-5 py-2 rounded-xl font-medium hover:bg-green-600 transition"
        >
          Yes, I did
        </button>
        <button
          onClick={() => onAnswer(sub.id, false)}
          className="bg-white border border-slate-300 px-5 py-2 rounded-xl font-medium hover:bg-slate-100 transition"
        >
          No, I didn&apos;t
        </button>
      </div>

      {sub.noStreak >= 1 && (
        <p className="text-xs text-amber-600 mt-3">
          You skipped it last time too. Say no again and we&apos;ll mark it as a cancel candidate.
        </p>
      )}
    </div>
  );
}