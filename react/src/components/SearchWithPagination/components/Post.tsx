import type { Post } from "../types/posts";

function PostItem({ post }: { post: Post }) {
  return (
    <div>
      <h2>
        #{post.id}
        {post.title}
      </h2>
    </div>
  );
}

export default PostItem;
