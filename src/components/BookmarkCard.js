"use client";

import Link from "next/link";

export default function BookmarkCard({ article }) {
  const { imageUrl, title, content, slug } = article;

  return (
    <div className="bg-navbar border border-white shadow-md rounded-lg p-4 mb-4 w-full max-w-xl mx-auto transform transition duration-300 hover:scale-[1.02] hover:shadow-lg">
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-40 object-cover rounded-md mb-3 bg-gray-300"
      />
      <h2 className="text-xl font-bold text-white mb-1">
        {title}
      </h2>
      <p className="text-white mb-2">
        {content
          ? content.length > 150
            ? content.slice(0, 150) + "..."
            : content
          : "No summary available."}
      </p>
      <Link
        href={`/news/${slug}`}
        className="text-blue-400 hover:underline"
      >
        Read More →
      </Link>
    </div>
  );
}
