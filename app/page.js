import { redirect } from "next/navigation";

// The home page just sends people to the login page
export default function Home() {
  redirect("/login");
}