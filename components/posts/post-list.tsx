import Link from "next/link";

interface Props {
  posts: {
    id: string;
    title: string;
    body: string;
    user: {
      id: string;
      name: string;
    };
  }[];
}

const PostList = ({ posts }: Props) => {
  return (
    <div>
      <ul>
        {posts.map((post) => (
          <li key={`post-${post.id}`} className="py-2">
            <Link href={`/posts/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostList;
