"use client";

import { useState, useEffect } from "react";
import NewsCard from "./NewsCard";

export default function NewsList({ searchQuery = "" }) {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const resetAndFetch = async () => {
      setLoading(true);
      setNews([]);
      setPage(1);
      setHasMore(true);
      await fetchNews(1, true);
    };
    resetAndFetch();
  }, [searchQuery]);

  const fetchNews = async (pageNum, reset = false) => {
    try {
      let url = `http://localhost:8080/api/news/published?page=${pageNum}&limit=12`;
      if (searchQuery) url += `&search=${searchQuery}`;
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch news");
      const data = await response.json();

      if (data.length === 0) setHasMore(false);

      setNews((prevNews) => {
        const existingSlugs = new Set(prevNews.map((item) => item.slug));
        const uniqueNews = data.filter((item) => !existingSlugs.has(item.slug));
        const combined = reset ? [...data] : [...prevNews, ...uniqueNews];
        return combined.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    const nextPage = page + 1;
    fetchNews(nextPage);
    setPage(nextPage);
  };

  if (loading && news.length === 0) {
    return <p className="text-center text-gray-500">Loading news...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="p-6">
      {/* News Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {news.map((article, index) => {
          const key = article._id || `${article.title}-${index}`;
          return <NewsCard key={key} article={article} />;
        })}
      </div>

      {/* Load More Button */}
      {hasMore && (
        <div className="text-center mt-6">
          <button
            onClick={handleLoadMore}
            className="bg-gray-900 text-white px-10 py-2 rounded-md hover:bg-gray-400 cursor-pointer"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
}
