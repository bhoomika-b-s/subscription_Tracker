"use client";
import { useState, useEffect } from "react";
import { getMonthKey } from "@/lib/helpers";

const starterData = [
  { id: 1, name: "Netflix", price: 649, billing: "monthly", category: "Entertainment", renewalDate: "2026-11-12", rarelyUsed: false },
  { id: 2, name: "Spotify", price: 119, billing: "monthly", category: "Music", renewalDate: "2026-11-08", rarelyUsed: false },
  { id: 3, name: "Adobe Creative Cloud", price: 1675, billing: "monthly", category: "Productivity", renewalDate: "2026-11-25", rarelyUsed: true },
  { id: 4, name: "Gym Membership", price: 6000, billing: "yearly", category: "Fitness", renewalDate: "2027-01-15", rarelyUsed: true },
];

export function useSubscriptions() {
  const [subs, setSubs] = useState([]);
  const [loaded, setLoaded] = useState(false);

  // Runs once: load saved data from the browser
  useEffect(() => {
    const saved = localStorage.getItem("subs");
    const month = getMonthKey();

    // Give every subscription the new fields. Old saved data won't have them,
    // so we add defaults first, then let the saved values override.
    const list = (saved ? JSON.parse(saved) : starterData).map((s) => ({
      usage: 0, // how many times used this month
      usageMonth: month, // which month that count belongs to
      noStreak: 0, // how many check-ins in a row you said "No"
      lastCheckIn: "", // last month we asked you
      ...s,
    }));

    // If a new month has started, reset the usage counter to 0
    setSubs(
      list.map((s) => (s.usageMonth === month ? s : { ...s, usage: 0, usageMonth: month }))
    );
    setLoaded(true);
  }, []);

  // Runs every time subs changes: save to the browser
  useEffect(() => {
    if (loaded) localStorage.setItem("subs", JSON.stringify(subs));
  }, [subs, loaded]);

  function addSub(newSub) {
    setSubs([
      ...subs,
      {
        usage: 0,
        usageMonth: getMonthKey(),
        noStreak: 0,
        lastCheckIn: getMonthKey(), // so a brand new subscription isn't asked about right away
        ...newSub,
        id: Date.now(),
      },
    ]);
  }

  function deleteSub(id) {
    setSubs(subs.filter((s) => s.id !== id));
  }

  function toggleRarelyUsed(id) {
    setSubs(subs.map((s) => (s.id === id ? { ...s, rarelyUsed: !s.rarelyUsed } : s)));
  }

  // NEW: the "+1 I used it" button
  function addUse(id) {
    setSubs(subs.map((s) => (s.id === id ? { ...s, usage: s.usage + 1 } : s)));
  }

  // NEW: answer the monthly check-in. used = true (Yes) or false (No)
  function answerCheckIn(id, used) {
    setSubs(
      subs.map((s) => {
        if (s.id !== id) return s;
        const streak = used ? 0 : s.noStreak + 1; // "No" adds 1, "Yes" resets to 0
        return {
          ...s,
          noStreak: streak,
          lastCheckIn: getMonthKey(),
          rarelyUsed: streak >= 2 ? true : s.rarelyUsed, // two "No"s in a row = flag it
        };
      })
    );
  }

  return { subs, loaded, addSub, deleteSub, toggleRarelyUsed, addUse, answerCheckIn };
}