import { useStore } from '../lib/store';
import { PostCard } from '../components/PostCard';

export function HomePage() {
  const { posts } = useStore();

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="space-y-8">
        {posts.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold text-gray-900">No posts yet</h2>
            <p className="mt-2 text-gray-600">Be the first to share your thoughts!</p>
          </div>
        ) : (
          posts.map((post) => <PostCard key={post.id} post={post} />)
        )}
      </div>
    </div>
  );
}