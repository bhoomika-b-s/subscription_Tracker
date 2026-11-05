import "./globals.css";

export const metadata = {
  title: "SubTrack",
  description: "Track all your subscriptions in one place",
};

// This wraps every page in the app
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-slate-50 text-slate-800">{children}</body>
    </html>
  );
}