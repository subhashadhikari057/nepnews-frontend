"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function FeaturedNewsSlider() {
  const [featuredNews, setFeaturedNews] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetch("http://localhost:8080/api/news?limit=5")
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
    return <p className="text-center text-gray-500">Loading featured news...</p>;
  }

  return (
    <div className="relative w-full max-w-2xl mx-auto py-2 overflow-hidden">
      <div className="relative w-full h-32 md:h-40 lg:h-48 bg-gray-300 rounded-md overflow-hidden">
        <Link href={`/news/${featuredNews[currentIndex].slug}`} className="block">
          <img
            src={featuredNews[currentIndex].imageUrl}
            alt={featuredNews[currentIndex].title}
            className="w-full h-full object-cover object-top rounded-md"
          />
          <div className="absolute bottom-0 w-full bg-gradient-to-t from-black via-transparent to-transparent text-white p-2">
            <h2 className="text-sm md:text-lg font-bold text-white drop-shadow-lg shadow-black bg-black/40 p-1 rounded-md">
              {featuredNews[currentIndex].title}
            </h2>
          </div>
        </Link>
      </div>
    </div>
  );
}
