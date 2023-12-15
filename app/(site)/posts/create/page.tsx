import { redirect } from "next/navigation";

import { isAuthenticated } from "@/lib/auth";
import CreatePost from "@/components/posts/create-post";

export default async function PostCreate() {
  return (await isAuthenticated()) ? <CreatePost /> : redirect("/sign-in");
}
