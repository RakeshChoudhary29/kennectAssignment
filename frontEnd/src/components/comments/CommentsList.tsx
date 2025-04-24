import { Comment } from "../../types";

interface CommentsListProps {
  comments: Comment[];
}

export const CommentsList = ({ comments }: CommentsListProps) => {
  if (comments.length === 0) {
    return <p className="mt-3 text-sm text-gray-500">No comments yet.</p>;
  }

  return (
    <div className="mt-4 space-y-3">
      {comments.map((comment) => (
        <div key={comment._id} className="p-3 bg-gray-50 rounded">
          <div className="mb-1">
            <span className="font-semibold text-teal-700">
              {comment.authorName}
            </span>
            <span className="ml-2 text-xs text-gray-500">
              {new Date(comment.createdAt).toLocaleString()}
            </span>
          </div>
          <p className="text-sm whitespace-pre-line">{comment.text}</p>
        </div>
      ))}
    </div>
  );
};
