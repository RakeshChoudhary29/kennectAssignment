import { useState } from "react";
import { Post } from "../../types";
import { CommentForm } from "../comments/CommentForm";
import { CommentsList } from "../comments/CommentsList";

interface PostsListProps {
  posts: Post[];
  isSearchResults: boolean;
  onRefresh: () => void;
}

export const PostsList = ({
  posts,
  isSearchResults,
  onRefresh,
}: PostsListProps) => {
  const [expandedPost, setExpandedPost] = useState<string | null>(null);

  const toggleComments = (postId: string) => {
    setExpandedPost(expandedPost === postId ? null : postId);
  };

  if (posts.length === 0) {
    return (
      <div className="p-6 text-center bg-white rounded-lg shadow">
        <p className="text-gray-600">
          {isSearchResults
            ? "No posts or comments match your search."
            : "No posts yet. Be the first to create one!"}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <div key={post._id} className="p-4 bg-white rounded-lg shadow">
          <div className="mb-2">
            <span className="font-semibold text-teal-700">
              {post.authorName}
            </span>
            <span className="ml-2 text-sm text-gray-500">
              {new Date(post.createdAt).toLocaleString()}
            </span>
          </div>
          <p className="mb-3 whitespace-pre-line">{post.text}</p>

          <div className="flex items-center justify-between mt-4 text-sm">
            <button
              onClick={() => toggleComments(post._id)}
              className="text-teal-600 hover:text-teal-800"
            >
              {expandedPost === post._id
                ? "Hide Comments"
                : `Comments (${post.comments.length})`}
            </button>
          </div>

          {expandedPost === post._id && (
            <div className="mt-4 border-t pt-3">
              <CommentForm postId={post._id} onCommentAdded={onRefresh} />
              <CommentsList comments={post.comments} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
