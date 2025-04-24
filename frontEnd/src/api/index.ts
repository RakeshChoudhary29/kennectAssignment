import { Post } from "../types";

const API_BASE_URL = import.meta.env.VITE_BASE_URL;

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

export const fetchAllPosts = async (): Promise<Post[]> => {
  const response = await fetch(`${API_BASE_URL}/posts`, {
    headers: getAuthHeaders(),
  });
  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }
  return response.json();
};

export const createPost = async (
  content: string,
  authorName: string
): Promise<Post> => {
  const response = await fetch(`${API_BASE_URL}/posts`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify({ text: content, authorName }),
  });

  if (!response.ok) {
    throw new Error("Failed to create post");
  }

  return response.json();
};

export const addComment = async (
  postId: string,
  content: string,
  authorName: string
): Promise<Post> => {
  const response = await fetch(`${API_BASE_URL}/posts/${postId}/comments`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify({ text: content, authorName }),
  });

  if (!response.ok) {
    throw new Error("Failed to add comment");
  }

  return response.json();
};

export const searchPosts = async (query: string): Promise<Post[]> => {
  const response = await fetch(
    `${API_BASE_URL}/search?q=${encodeURIComponent(query)}`,
    {
      headers: getAuthHeaders(),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to search posts");
  }

  return response.json();
};
