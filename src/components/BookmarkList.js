"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import BookmarkCard from "./BookmarkCard";

export default function BookmarkList() {
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);

  const userId = typeof window !== "undefined" ? localStorage.getItem("userId") : null;
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  useEffect(() => {
    const fetchBookmarks = async () => {
      if (!userId || !token) {
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/bookmarks/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setBookmarks(res.data);
      } catch (error) {
        console.error("❌ Failed to fetch bookmarks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookmarks();
  }, [userId, token]);

  if (loading) {
    return <p className="text-white">Loading bookmarks...</p>;
  }

  if (bookmarks.length === 0) {
    return <p className="text-white">😔 You haven’t saved any articles yet.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {bookmarks.map((item, index) => (
        <BookmarkCard
          key={index}
          article={item.article}
          userId={userId}
          token={token}
          onBookmarkToggle={() => {
            setBookmarks((prev) =>
              prev.filter((b) => b.article.id !== item.article.id)
            );
          }}
        />
      ))}
    </div>
  );
}
