import { redirect } from "next/navigation";

import { isAuthenticated } from "@/lib/auth";
import Login from "@/components/auth/login";

export default async function SignIn() {
  return (await isAuthenticated()) ? redirect("/") : <Login />;
}
