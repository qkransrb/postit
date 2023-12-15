import { fetchPosts } from "@/lib/actions/post-actions";
import PostList from "@/components/posts/post-list";
import Link from "next/link";

export default async function Home() {
  const { posts } = await fetchPosts();

  return (
    <div className="max-w-screen-xl mx-auto py-10">
      <div className="flex justify-end">
        <Link
          href="/posts/create"
          className="h-10 bg-black text-white rounded-md flex items-center justify-center px-4 text-sm font-medium"
        >
          New
        </Link>
      </div>
      <PostList posts={posts} />
    </div>
  );
}
