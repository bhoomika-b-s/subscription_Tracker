"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";

const inputStyle =
  "w-full border border-slate-300 rounded-xl px-4 py-2.5 mb-4 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400";

export default function PaymentPage() {
  const [cardNumber, setCardNumber] = useState("");
  const [name, setName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [done, setDone] = useState(false);

  // Keep only digits, max 16, and add a space after every 4 digits
  function handleCardNumber(e) {
    const digits = e.target.value.replace(/\D/g, "").slice(0, 16);
    setCardNumber(digits.replace(/(.{4})/g, "$1 ").trim());
  }

  function handleSubmit(e) {
    e.preventDefault();
    // DEMO ONLY: we do not store or send card details anywhere.
    // Real payments need a provider like Stripe or Razorpay.
    setDone(true);
  }

  return (
    <>
      <Navbar />
      <main className="max-w-lg mx-auto p-4 md:p-8">
        <h1 className="text-2xl font-bold mb-6">Payment Method</h1>

        {/* Live card preview: updates as you type */}
        <div className="bg-linear-to-br from-slate-800 via-indigo-800 to-purple-700 text-white rounded-2xl p-6 shadow-xl mb-6 h-48 flex flex-col justify-between">
          <p className="text-sm opacity-70">💳 SubTrack Card</p>
          <p className="text-2xl tracking-widest font-mono">
            {cardNumber || "•••• •••• •••• ••••"}
          </p>
          <div className="flex justify-between text-sm">
            <span className="uppercase">{name || "YOUR NAME"}</span>
            <span>{expiry || "MM/YY"}</span>
          </div>
        </div>

        {done ? (
          <div className="bg-green-50 border border-green-200 text-green-700 rounded-2xl p-6 text-center">
            ✅ Payment method saved (demo)!
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <label className="block text-sm font-medium mb-1">Card number</label>
            <input required value={cardNumber} onChange={handleCardNumber} placeholder="1234 5678 9012 3456" className={inputStyle} />

            <label className="block text-sm font-medium mb-1">Name on card</label>
            <input required value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" className={inputStyle} />

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Expiry</label>
                <input required maxLength={5} value={expiry} onChange={(e) => setExpiry(e.target.value)} placeholder="MM/YY" className={inputStyle} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">CVV</label>
                <input required type="password" maxLength={3} value={cvv} onChange={(e) => setCvv(e.target.value)} placeholder="•••" className={inputStyle} />
              </div>
            </div>

            <button type="submit" className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-xl hover:bg-indigo-700 transition">
              Save Payment Method
            </button>
          </form>
        )}
      </main>
    </>
  );
}