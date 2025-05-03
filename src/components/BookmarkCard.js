"use client";

import Link from "next/link";
import BookmarkButton from "./BookmarkButton";

export default function BookmarkCard({ article, userId, token, onBookmarkToggle }) {
  const { imageUrl, title, content, slug, id } = article;

  return (
    <div className="relative bg-navbar border border-white shadow-md rounded-lg p-4 mb-4 w-full max-w-xl mx-auto transform transition duration-300 hover:scale-[1.02] hover:shadow-lg">
      {/* ✅ Bottom-right bookmark icon */}
      {userId && token && (
        <div className="absolute bottom-11 right-2 z-10">
          <BookmarkButton
            userId={userId}
            articleId={id}
            token={token}
            onToggle={onBookmarkToggle}
          />
        </div>
      )}

      <img
        src={imageUrl}
        alt={title}
        className="w-full h-40 object-cover rounded-md mb-3 bg-gray-300"
      />
      <h2 className="text-xl font-bold text-white mb-1">{title}</h2>
      <p className="text-white mb-2">
        {content?.length > 150 ? content.slice(0, 150) + "..." : content || "No summary available."}
      </p>
      <Link href={`/news/${slug}`} className="text-blue-400 hover:underline">
        Read More →
      </Link>
    </div>
  );
}
