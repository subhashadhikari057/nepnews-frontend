"use client"; // Required for Next.js App Router (ensures interactivity)

import { useState, useEffect } from "react";
import Link from "next/link";

export default function NewsList({ searchQuery = "" }) {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    // Full reset and fetch fresh news on search or mount
    const resetAndFetch = async () => {
      setLoading(true);
      setNews([]);
      setPage(1);
      setHasMore(true);
      await fetchNews(1, true); // reset = true
    };
    resetAndFetch();
  }, [searchQuery]);

  const fetchNews = async (pageNum, reset = false) => {
    try {
      let url = `http://localhost:8080/api/news/published?page=${pageNum}&limit=9`;
      if (searchQuery) {
        url += `&search=${searchQuery}`;
      }

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch news");
      }

      const data = await response.json();

      console.log("Fetching page:", pageNum);
      console.log("New news titles:", data.map(item => item.title));
      console.log("News count before:", news.length);

      if (data.length === 0) {
        setHasMore(false);
      }

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
    console.log("Loading more... Next page:", nextPage);
    fetchNews(nextPage); // data is inside this function only
    setPage(nextPage);
  };

  if (loading && news.length === 0) {
    return <p className="text-center text-gray-500">Loading news...</p>; // ⬅️ Loading text color
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>; // ⬅️ Error text color
  }

  return (
    <div className="p-6">
      {/* News Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {news.map((article, index) => {
          const key = article._id ? article._id : `${article.title}-${index}`;
          return (
            <div
              key={key}
              className="bg-black border border-white-500 shadow-md rounded-lg p-4"
              // ⬆️ bg-black = card background
              // ⬆️ border-pink-500 = card border
            >
              <img
                src={article.imageUrl}
                alt={article.title}
                className="w-full h-40 object-cover rounded-md bg-gray-300"
                // ⬆️ bg-gray-300 = fallback background behind image
              />
              <h2 className="text-xl font-bold mt-2 text-white-100">
                {article.title}
              </h2>
              <p className="text-white-800 mt-1">
                {article.content
                  ? article.content.length > 300
                    ? `${article.content.substring(0, 300)}...`
                    : article.content
                  : "No content available."}
              </p>
              <Link
                href={`/news/${article.slug}`}
                className="text-blue-500 hover:underline mt-2 block"
                // ⬆️ link color = blue
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
            className="bg-gray-900 text-white px-10 py-2 rounded-md hover:bg-gray-400 cursor-pointer"
            // ⬆️ button background color and hover effect
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
}
