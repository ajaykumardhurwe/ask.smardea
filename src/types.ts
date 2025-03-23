export interface Option {
  id: string;
  text: string;
  likes: number;
  shares: number;
  comments: Comment[];
}

export interface Post {
  id: string;
  userId: string;
  title: string;
  options: Option[];
  createdAt: Date;
}

export interface User {
  id: string;
  name: string;
  avatar: string;
  totalLikes: number;
  posts: Post[];
}

export interface Comment {
  id: string;
  userId: string;
  text: string;
  createdAt: Date;
}