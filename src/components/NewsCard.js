"use client";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";

export default function NewsCard({ article }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "0px 0px -50px 0px" }); // animate every time visible

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="bg-navbar border border-white-500 shadow-md rounded-lg p-4"
    >
      <img
        src={article.imageUrl}
        alt={article.title}
        className="w-full h-40 object-cover rounded-md bg-gray-300"
      />
      <h2 className="text-xl font-bold mt-2 text-white-100">
        {article.title}
      </h2>
      <p className="text-white-800 mt-1">
        {article.content
          ? article.content.length > 300
            ? `${article.content.substring(0, 300)}...`
            : article.content
          : "No content available."}
      </p>
      <Link
        href={`/news/${article.slug}`}
        className="text-blue-500 hover:underline mt-2 block"
      >
        Read More →
      </Link>
    </motion.div>
  );
}
