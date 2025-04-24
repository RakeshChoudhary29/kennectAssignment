import { useState, useEffect } from "react";
import { Post } from "../types";
import { CreatePost } from "../components/posts/CreatePost";
import { SearchBar } from "../components/search/SearchBar";
import { PostsList } from "../components/posts/PostsList";
import { Header } from "../components/layout/Header";
import { LoadingSpinner } from "../components/ui/LoadingSpinner";
import { fetchAllPosts, searchPosts } from "../api/";

export const HomePage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const [isSearchResults, setIsSearchResults] = useState(false);

  const fetchPosts = async () => {
    setIsLoading(true);
    try {
      const data = await fetchAllPosts();
      setPosts(data);
      setIsSearchResults(false);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      fetchPosts();
      return;
    }

    setIsSearching(true);
    try {
      const data = await searchPosts(query);
      setPosts(data);
      setIsSearchResults(true);
    } catch (error) {
      console.error("Error searching:", error);
    } finally {
      setIsSearching(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      <main className="container mx-auto py-6 px-4">
        <SearchBar onSearch={handleSearch} isSearching={isSearching} />

        {isSearchResults && (
          <div className="mb-4">
            <button
              onClick={fetchPosts}
              className="text-teal-600 hover:text-teal-800 flex items-center"
            >
              ← Back to latest posts
            </button>
          </div>
        )}

        {!isSearchResults && <CreatePost onPostCreated={fetchPosts} />}

        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <PostsList
            posts={posts}
            isSearchResults={isSearchResults}
            onRefresh={fetchPosts}
          />
        )}
      </main>
    </div>
  );
};
