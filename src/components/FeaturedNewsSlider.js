"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function FeaturedNewsSlider() {
  const [featuredNews, setFeaturedNews] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetch("${process.env.NEXT_PUBLIC_API_URL}/api/news/published?limit=5")
      .then((res) => res.json())
      .then((data) => setFeaturedNews(data))
      .catch((err) => console.error("Error fetching featured news:", err));
  }, []);

  useEffect(() => {
    if (featuredNews.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % featuredNews.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [featuredNews]);

  if (featuredNews.length === 0) {
    return <p className="text-center text-gray-400 text-sm">Loading featured news...</p>;
  }

  const currentNews = featuredNews[currentIndex];

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-4 mt-8">
      <div className="bg-black text-white rounded-md p-4 shadow-md flex items-center gap-3 transition-all duration-500">
        
        <span className="text-pink-500 text-xl">•</span>
        
        <Link
          href={`/news/${currentNews.slug}`}
          className="text-sm md:text-base font-semibold hover:underline transition duration-300"
        >
          {currentNews.title}
        </Link>
      </div>
    </div>
  );
  
}
