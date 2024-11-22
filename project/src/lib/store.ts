import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type User = {
  id: string;
  name: string;
  email: string;
  avatar: string;
};

export type Post = {
  id: string;
  title: string;
  content: string;
  authorId: string;
  createdAt: string;
  likes: string[];
  comments: Comment[];
};

export type Comment = {
  id: string;
  content: string;
  authorId: string;
  createdAt: string;
};

type Store = {
  user: User | null;
  posts: Post[];
  login: (email: string, password: string) => void;
  logout: () => void;
  addPost: (title: string, content: string) => void;
  likePost: (postId: string) => void;
  addComment: (postId: string, content: string) => void;
};

export const useStore = create<Store>()(
  persist(
    (set) => ({
      user: null,
      posts: [],
      login: (email, password) => {
        // In a real app, this would make an API call
        const mockUser = {
          id: '1',
          name: 'John Doe',
          email,
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
        };
        set({ user: mockUser });
      },
      logout: () => set({ user: null }),
      addPost: (title, content) =>
        set((state) => {
          if (!state.user) return state;
          const newPost: Post = {
            id: Math.random().toString(36).slice(2),
            title,
            content,
            authorId: state.user.id,
            createdAt: new Date().toISOString(),
            likes: [],
            comments: [],
          };
          return { posts: [newPost, ...state.posts] };
        }),
      likePost: (postId) =>
        set((state) => {
          if (!state.user) return state;
          const posts = state.posts.map((post) => {
            if (post.id !== postId) return post;
            const likes = post.likes.includes(state.user!.id)
              ? post.likes.filter((id) => id !== state.user!.id)
              : [...post.likes, state.user!.id];
            return { ...post, likes };
          });
          return { posts };
        }),
      addComment: (postId, content) =>
        set((state) => {
          if (!state.user) return state;
          const posts = state.posts.map((post) => {
            if (post.id !== postId) return post;
            const newComment: Comment = {
              id: Math.random().toString(36).slice(2),
              content,
              authorId: state.user!.id,
              createdAt: new Date().toISOString(),
            };
            return { ...post, comments: [...post.comments, newComment] };
          });
          return { posts };
        }),
    }),
    {
      name: 'blog-storage',
    }
  )
);