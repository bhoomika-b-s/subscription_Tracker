"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import { useSubscriptions } from "@/lib/useSubscriptions";
import { categories } from "@/lib/helpers";

const inputStyle =
  "w-full border border-slate-300 rounded-xl px-4 py-2.5 mb-4 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400";

export default function AddPage() {
  const router = useRouter();
  const { addSub } = useSubscriptions();

  // One object holds the whole form
  const [form, setForm] = useState({
    name: "",
    price: "",
    billing: "monthly",
    category: "Entertainment",
    renewalDate: "",
  });

  // Works for every input because each input has a "name"
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    addSub({ ...form, price: Number(form.price), rarelyUsed: false });
    router.push("/subscriptions");
  }

  return (
    <>
      <Navbar />
      <main className="max-w-lg mx-auto p-4 md:p-8">
        <h1 className="text-2xl font-bold mb-6">Add a Subscription</h1>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <label className="block text-sm font-medium mb-1">Name</label>
          <input name="name" required value={form.name} onChange={handleChange} placeholder="e.g. Netflix" className={inputStyle} />

          <label className="block text-sm font-medium mb-1">Price (₹)</label>
          <input name="price" type="number" min="1" required value={form.price} onChange={handleChange} placeholder="649" className={inputStyle} />

          <label className="block text-sm font-medium mb-1">Billing</label>
          <select name="billing" value={form.billing} onChange={handleChange} className={inputStyle}>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>

          <label className="block text-sm font-medium mb-1">Category</label>
          <select name="category" value={form.category} onChange={handleChange} className={inputStyle}>
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          <label className="block text-sm font-medium mb-1">Next renewal date</label>
          <input name="renewalDate" type="date" required value={form.renewalDate} onChange={handleChange} className={inputStyle} />

          <button type="submit" className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-xl hover:bg-indigo-700 transition">
            Save Subscription
          </button>
        </form>
      </main>
    </>
  );
}