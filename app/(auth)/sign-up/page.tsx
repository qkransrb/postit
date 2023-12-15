import { redirect } from "next/navigation";

import { isAuthenticated } from "@/lib/auth";
import Register from "@/components/auth/register";

export default async function SignUp() {
  return (await isAuthenticated()) ? redirect("/") : <Register />;
}
