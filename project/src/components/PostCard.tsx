import { Heart, MessageCircle } from 'lucide-react';
import { useState } from 'react';
import { Post, useStore } from '../lib/store';

type PostCardProps = {
  post: Post;
};

export function PostCard({ post }: PostCardProps) {
  const { user, likePost, addComment } = useStore();
  const [comment, setComment] = useState('');

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;
    addComment(post.id, comment);
    setComment('');
  };

  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{post.title}</h2>
        <p className="text-gray-700 whitespace-pre-wrap">{post.content}</p>
      </div>

      <div className="px-6 py-4 border-t border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => likePost(post.id)}
            className={`flex items-center gap-2 ${
              user && post.likes.includes(user.id)
                ? 'text-red-500'
                : 'text-gray-500 hover:text-red-500'
            }`}
          >
            <Heart className="w-5 h-5" />
            <span>{post.likes.length}</span>
          </button>
          <div className="flex items-center gap-2 text-gray-500">
            <MessageCircle className="w-5 h-5" />
            <span>{post.comments.length}</span>
          </div>
        </div>

        {user && (
          <form onSubmit={handleAddComment} className="mb-4">
            <input
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add a comment..."
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </form>
        )}

        {post.comments.length > 0 && (
          <div className="space-y-4">
            {post.comments.map((comment) => (
              <div key={comment.id} className="text-sm text-gray-700">
                <p>{comment.content}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}