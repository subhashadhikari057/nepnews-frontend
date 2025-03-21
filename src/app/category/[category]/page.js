"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import AdBanner from "@/components/AdBanner"; // ✅ Importing enhanced AdBanner

export default function CategoryPage() {
  const { category } = useParams();
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!category) return;

    const fetchNewsByCategory = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/news/category/${category}`);
        if (!response.ok) throw new Error("Failed to fetch news.");

        const data = await response.json();
        setNews(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNewsByCategory();
  }, [category]);

  if (loading) return <p className="text-center text-gray-500">Loading news...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen">
      <Navbar />
      <AdBanner type={category} /> {/* ✅ Show category-specific ad */}
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white text-center capitalize">
          {category} News 📰
        </h1>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {news.map((article, index) => (
            <div key={article._id || index} className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4">
              <img
                src={article.imageUrl}
                alt={article.title}
                className="w-full h-40 object-cover rounded-md bg-gray-300"
              />
              <h2 className="text-xl font-bold mt-2 text-gray-900 dark:text-white">{article.title}</h2>
              <p className="text-gray-800 dark:text-gray-300 mt-1">
                {article.content
                  ? article.content.length > 300
                    ? `${article.content.substring(0, 300)}...`
                    : article.content
                  : "No content available."}
              </p>
              <a href={`/news/${article._id}`} className="text-blue-500 hover:underline mt-2 block">
                Read More →
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
