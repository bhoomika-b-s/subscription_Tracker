export const categories = [
  "Entertainment",
  "Music",
  "Productivity",
  "Shopping",
  "Fitness",
  "Other",
];

// How many days until the renewal date? (negative = date already passed)
export function daysUntil(dateString) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const renewal = new Date(dateString + "T00:00:00");
  return Math.round((renewal - today) / (1000 * 60 * 60 * 24));
}

// Turn yearly prices into a monthly cost so we can compare fairly
export function monthlyCost(sub) {
  return sub.billing === "yearly" ? sub.price / 12 : sub.price;
}

export function formatMoney(amount) {
  return "₹" + Math.round(amount).toLocaleString("en-IN");
}

// NEW: gives the current month like "2026-11". We use it to know when a new month starts.
export function getMonthKey() {
  const d = new Date();
  return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0");
}

// NEW: what did each use cost this month? Returns null if never used.
export function costPerUse(sub) {
  if (sub.usage === 0) return null;
  return monthlyCost(sub) / sub.usage;
}