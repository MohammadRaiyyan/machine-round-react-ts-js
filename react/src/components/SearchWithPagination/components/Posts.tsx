import { type Post as PostType } from "../types/posts";
import Post from "./Post";

function Posts({ posts }: { posts: PostType[] }) {
  return (
    <div>
      <h2>Posts</h2>
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
}

export default Posts;
