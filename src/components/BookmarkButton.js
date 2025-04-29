"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { toast } from "react-hot-toast";

export default function BookmarkButton({ userId, articleId, token }) {
  const [bookmarked, setBookmarked] = useState(false);
  const [loading, setLoading] = useState(false);

  // ✅ Fetch bookmark status initially
  useEffect(() => {
    const fetchBookmarkStatus = async () => {
      if (!userId || !articleId || !token) return;

      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/bookmarks/${userId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const bookmarks = res.data;
        const isBookmarked = bookmarks.some(
          (b) => b.article.id === articleId
        );
        setBookmarked(isBookmarked);
      } catch (err) {
        console.error("Error fetching bookmarks:", err);
      }
    };

    fetchBookmarkStatus();
  }, [userId, articleId, token]);

  // ✅ Handle bookmark toggle
  const toggleBookmark = async () => {
    if (!userId || !articleId || !token) return;
  
    setLoading(true);
  
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/bookmarks/toggle`,
        {},
        {
          params: { userId, articleId },
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );
  
      const newState = !bookmarked;
      setBookmarked(newState);
  
      toast.success(
        newState ? "Bookmark saved!" : "Bookmark removed!"
      );
    } catch (error) {
      console.error("Bookmark toggle failed:", error);
      toast.error("Failed to update bookmark. Please try again.");
    }
  
    setLoading(false);
  };

  return (
    <button
      onClick={toggleBookmark}
      className="absolute top-2 right-2 text-white hover:text-blue-500 z-10 cursor-pointer"
      disabled={loading}
      title={bookmarked ? "Remove bookmark" : "Save this article"}
    >
      {bookmarked ? <BookmarkCheck size={20} /> : <Bookmark size={20} />}
    </button>
  );
}
