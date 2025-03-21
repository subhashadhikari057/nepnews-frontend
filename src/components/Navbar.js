"use client"; // Ensures interactivity in Next.js App Router

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Placeholder for auth logic
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") === "dark";
    }
    return false;
  });

  const [scrolling, setScrolling] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // Search input state
  const router = useRouter();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolling(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark", !darkMode);
    localStorage.setItem("theme", darkMode ? "light" : "dark");
  };

  // Handle search submission
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?query=${searchQuery}`);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolling ? "shadow-md py-3" : "py-5"
      } bg-white dark:bg-gray-900`}
    >
      <div className="container mx-auto flex justify-between items-center px-6">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-blue-600 dark:text-white">
          NepNews 📰
        </Link>

        {/* Nav Links */}
        <div className="hidden md:flex space-x-6">
          <Link href="/" className="text-gray-700 dark:text-gray-300 hover:text-blue-500">
            Home
          </Link>
          {["national", "international", "politics", "sports", "technology", "entertainment", "finance"].map((category) => (
            <Link
              key={category}
              href={`/category/${category}`}
              className="text-gray-700 dark:text-gray-300 hover:text-blue-500 capitalize"
            >
              {category}
            </Link>
          ))}
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="relative">
          <input
            type="text"
            placeholder="Search news..."
            className="border border-gray-400 dark:border-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white rounded-md px-3 py-1 focus:outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="absolute right-2 top-1 text-gray-600 dark:text-gray-300">🔍</button>
        </form>

        {/* Right Section (Login/Profile & Dark Mode) */}
        <div className="flex items-center space-x-4">
          {isLoggedIn ? (
            <>
              <Link href="/collections" className="text-gray-700 dark:text-gray-300 hover:text-blue-500">
                📌 Collections
              </Link>
              <Link href="/profile" className="text-gray-700 dark:text-gray-300 hover:text-blue-500">
                👤 Profile
              </Link>
              <button
                onClick={() => setIsLoggedIn(false)}
                className="text-red-500 hover:text-red-700"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="text-gray-700 dark:text-gray-300 hover:text-blue-500">
                Login
              </Link>
              <Link href="/signup" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                Sign Up
              </Link>
            </>
          )}

          {/* Dark Mode Toggle */}
          <button onClick={toggleDarkMode} className="ml-4">
            {darkMode ? "🌞" : "🌙"}
          </button>
        </div>
      </div>
    </nav>
  );
}
