export interface Post {
  _id: string;
  text: string;
  authorName: string;
  createdAt: string;
  comments: Comment[];
}

export interface Comment {
  _id: string;
  text: string;
  authorName: string;
  postId: string;
  createdAt: string;
}

export interface UserContextType {
  userName: string;
  setUserName: (name: string) => void;
}
