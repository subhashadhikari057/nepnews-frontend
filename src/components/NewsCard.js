"use client";

import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { useRef, useEffect, useState } from "react";
import BookmarkButton from "./BookmarkButton";

export default function NewsCard({ article }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "0px 0px -50px 0px", once: true });

  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    const storedToken = localStorage.getItem("token");
    setUserId(storedUserId);
    setToken(storedToken);
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      whileHover={{
        scale: 1.015,
        transition: { type: "spring", stiffness: 200, damping: 20 }
      }}
      className="relative bg-navbar border border-white shadow-md hover:shadow-lg rounded-lg p-4"
    >
      {/* ✅ Bottom-right bookmark icon */}
      {userId && token && (
        <div className="absolute bottom-11 right-2 z-10">
          <BookmarkButton
            userId={userId}
            articleId={article.id}
            token={token}
          />
        </div>
      )}

      <img
        src={article.imageUrl}
        alt={article.title}
        className="w-full h-40 object-cover rounded-md bg-gray-300"
      />
      <h2 className="text-xl font-bold mt-2 text-white">{article.title}</h2>
      <p className="text-white mt-1">
        {article.content?.length > 300
          ? `${article.content.substring(0, 300)}...`
          : article.content || "No content available."}
      </p>
      <Link
        href={`/news/${article.slug}`}
        className="text-blue-500 hover:underline mt-3 block"
      >
        Read More →
      </Link>
    </motion.div>
  );
}
