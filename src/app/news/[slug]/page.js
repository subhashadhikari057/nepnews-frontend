"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import AdBanner from "@/components/AdBanner";
import Link from "next/link";

export default function NewsDetailPage() {
  const { slug } = useParams();
  const router = useRouter();

  const [news, setNews] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchNews = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/news/slug/${slug}`, { cache: "no-store" });
      if (!res.ok) throw new Error("Failed to fetch news.");
      const data = await res.json();
      setNews(data);
      fetchRelated(data.category);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchRelated = async (category) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/news/category/${category}`, { cache: "no-store" });
      if (!res.ok) throw new Error("Failed to fetch related news.");
      const data = await res.json();
      setRelated(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (slug) {
      fetchNews();
    }
  }, [slug]);

  if (loading) return <p className="text-center text-gray-400 py-10">Loading...</p>; // ⬅️ Loading color
  if (error || !news) return <p className="text-center text-red-400 py-10">{error || "News not found."}</p>; // ⬅️ Error color

  return (
    <div className="bg-black text-white min-h-screen"> {/* ⬅️ Background black, text white */}
      <Navbar />
      <AdBanner type={news.category?.toLowerCase() || "default"} />

      <div className="container mx-auto p-6">
        {/* News Content */}
        <div className="bg-black border border-white rounded-lg shadow-md p-6 mb-8"> {/* ⬅️ Black card with white border */}
          <h1 className="text-3xl font-bold">{news.title}</h1>
          <p className="text-sm text-gray-400 mb-4">
            {news.category} • {new Date(news.createdAt).toLocaleDateString()}
          </p>
          <img
            src={news.imageUrl}
            alt={news.title}
            className="w-full max-h-[400px] object-cover rounded-md mb-4"
          />
          <p className="text-white text-lg whitespace-pre-line">
            {news.content}
          </p>
        </div>

        {/* Related News */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Related News</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {related
              .filter((item) => item.slug !== slug)
              .slice(0, 3)
              .map((item) => (
                <Link
                  key={item._id || item.slug}
                  href={`/news/${item.slug}`}
                  className="block bg-black border border-white p-4 rounded-md shadow hover:shadow-lg transition"
                  // ⬆️ Related card: black background + white border
                >
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-32 object-cover rounded-md"
                  />
                  <h3 className="mt-2 text-lg font-bold">{item.title}</h3>
                  <p className="text-sm text-gray-400 mt-1">{item.category}</p> {/* ⬅️ Subtle category text */}
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
