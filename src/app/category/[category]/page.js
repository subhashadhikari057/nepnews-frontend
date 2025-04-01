"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import AdBanner from "@/components/AdBanner";

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

  if (loading) return <p className="text-center text-gray-400 py-10">Loading news...</p>;
  if (error) return <p className="text-center text-red-500 py-10">{error}</p>;

  return (
    // 🔧 Background set to black with white text for dark theme consistency
    <div className="bg-black text-white min-h-screen">
      <Navbar />
      <AdBanner type={category} />

      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold text-center capitalize text-whitenpm r-500 mb-6">
          {category} News 📰
        </h1>

        {/* 🗞 News Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.map((article, index) => (
            <div key={article._id || index} className="bg-black shadow-md rounded-lg p-4 border border-white-600">
              <img
                src={article.imageUrl}
                alt={article.title}
                className="w-full h-40 object-cover rounded-md bg-gray-300"
              />
              <h2 className="text-xl font-bold mt-2 text-white">{article.title}</h2>
              <p className="text-gray-300 mt-1">
                {article.content
                  ? article.content.length > 300
                    ? `${article.content.substring(0, 300)}...`
                    : article.content
                  : "No content available."}
              </p>
              <Link
                href={`/news/${article.slug}`}
                className="text-blue-400 hover:underline mt-2 block"
              >
                Read More →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
