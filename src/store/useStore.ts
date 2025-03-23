import { create } from 'zustand';
import { User, Post, Option, Comment } from '../types';

interface Store {
  users: User[];
  currentUser: User | null;
  addPost: (post: Post) => void;
  addOption: (postId: string, option: Option) => void;
  likeOption: (postId: string, optionId: string) => void;
  shareOption: (postId: string, optionId: string) => void;
  addComment: (postId: string, optionId: string, comment: Comment) => void;
}

const useStore = create<Store>((set) => ({
  users: [
    {
      id: '1',
      name: 'Demo User',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
      totalLikes: 0,
      posts: [],
    },
  ],
  currentUser: {
    id: '1',
    name: 'Demo User',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
    totalLikes: 0,
    posts: [],
  },
  addPost: (post) =>
    set((state) => {
      const updatedUsers = state.users.map((user) => {
        if (user.id === post.userId) {
          return { ...user, posts: [post, ...user.posts] };
        }
        return user;
      });
      return { users: updatedUsers };
    }),
  addOption: (postId, option) =>
    set((state) => {
      const updatedUsers = state.users.map((user) => ({
        ...user,
        posts: user.posts.map((post) =>
          post.id === postId
            ? { ...post, options: [...post.options, option] }
            : post
        ),
      }));
      return { users: updatedUsers };
    }),
  likeOption: (postId, optionId) =>
    set((state) => {
      const updatedUsers = state.users.map((user) => ({
        ...user,
        posts: user.posts.map((post) =>
          post.id === postId
            ? {
                ...post,
                options: post.options.map((opt) =>
                  opt.id === optionId
                    ? { ...opt, likes: opt.likes + 1 }
                    : opt
                ),
              }
            : post
        ),
        totalLikes:
          user.posts.some((post) => post.id === postId)
            ? user.totalLikes + 1
            : user.totalLikes,
      }));
      return { users: updatedUsers.sort((a, b) => a.totalLikes - b.totalLikes) };
    }),
  shareOption: (postId, optionId) =>
    set((state) => {
      const updatedUsers = state.users.map((user) => ({
        ...user,
        posts: user.posts.map((post) =>
          post.id === postId
            ? {
                ...post,
                options: post.options.map((opt) =>
                  opt.id === optionId
                    ? { ...opt, shares: opt.shares + 1 }
                    : opt
                ),
              }
            : post
        ),
      }));
      return { users: updatedUsers };
    }),
  addComment: (postId, optionId, comment) =>
    set((state) => {
      const updatedUsers = state.users.map((user) => ({
        ...user,
        posts: user.posts.map((post) =>
          post.id === postId
            ? {
                ...post,
                options: post.options.map((opt) =>
                  opt.id === optionId
                    ? { ...opt, comments: [comment, ...opt.comments] }
                    : opt
                ),
              }
            : post
        ),
      }));
      return { users: updatedUsers };
    }),
}));

export default useStore;