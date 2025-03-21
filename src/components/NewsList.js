"use client"; // Required for Next.js App Router (ensures interactivity)

import { useState, useEffect } from "react";
import Link from "next/link";


export default function NewsList({ searchQuery = "" }) {
  const [news, setNews] = useState([]); // News articles
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1); // Track current page
  const [hasMore, setHasMore] = useState(true); // Check if more news exists

  useEffect(() => {
    // Reset state when search changes
    setNews([]);
    setPage(1);
    setHasMore(true);
    setLoading(true);
    fetchNews(1);
  }, [searchQuery]);

  // Fetch news with pagination
  const fetchNews = async (pageNum) => {
    try {
      let url = `http://localhost:8080/api/news?page=${pageNum}&limit=6`;
      if (searchQuery) {
        url += `&search=${searchQuery}`;
      }

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch news");
      }

      const data = await response.json();

      if (data.length === 0) {
        setHasMore(false);
      }

      // Combine and sort news by createdAt (latest first)
      setNews((prevNews) => {
        const combined = [...prevNews, ...data];
        return combined.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Load More button
  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchNews(nextPage);
  };

  // Initial loading state
  if (loading && news.length === 0) {
    return <p className="text-center text-gray-500">Loading news...</p>;
  }

  // Error state
  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="p-6">
      {/* News Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {news.map((article, index) => {
  const key = article._id 
    ? article._id 
    : `${article.title}-${index}`;

  return (
    <div key={key} className="bg-white shadow-md rounded-lg p-4">
      <img
        src={article.imageUrl}
        alt={article.title}
        className="w-full h-40 object-cover rounded-md bg-gray-300"
      />
      <h2 className="text-xl font-bold mt-2 text-gray-900">{article.title}</h2>
      <p className="text-gray-800 mt-1">
        {article.content
          ? article.content.length > 300
            ? `${article.content.substring(0, 300)}...`
            : article.content
          : "No content available."}
      </p>
      <Link
        href={`/news/${article._id}`}
        className="text-blue-500 hover:underline mt-2 block"
      >
        Read More →
      </Link>
    </div>
  );
})}

      </div>

      {/* Load More Button */}
      {hasMore && (
        <div className="text-center mt-6">
          <button
            onClick={handleLoadMore}
            className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
}
