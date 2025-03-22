"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [scrolling, setScrolling] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showMenu, setShowMenu] = useState(false); // Mobile menu toggle
  const router = useRouter();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolling(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle search submission
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?query=${searchQuery}`);
    }
  };

  // Toggle mobile menu visibility
  const toggleMenu = () => {
    setShowMenu((prev) => !prev);
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolling ? "shadow-md py-3" : "py-5"
      } bg-white`}
    >
      <div className="container mx-auto flex flex-wrap justify-between items-center px-6">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-blue-600">
          NepNews 📰
        </Link>

        {/* Hamburger Icon for Mobile (visible on small screens only) */}
        <div className="flex md:hidden">
          <button onClick={toggleMenu} className="text-gray-800 focus:outline-none">
            {/* Simple hamburger icon (you can replace with an SVG/icon library) */}
            ☰
          </button>
        </div>

        {/* Nav Links (visible on md and above) */}
        <div className="hidden md:flex flex-wrap items-center space-x-4 lg:space-x-6">
          <Link href="/" className="text-gray-800 hover:text-blue-600">
            Home
          </Link>
          {[
            "national",
            "international",
            "politics",
            "sports",
            "technology",
            "entertainment",
            "finance",
          ].map((category) => (
            <Link
              key={category}
              href={`/category/${category}`}
              className="text-gray-800 hover:text-blue-600 capitalize"
            >
              {category}
            </Link>
          ))}
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="relative mt-2 md:mt-0">
          <input
            type="text"
            placeholder="Search news..."
            className="border border-gray-300 bg-white text-black rounded-md px-3 py-1 focus:outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="absolute right-2 top-1 text-gray-600">
            🔍
          </button>
        </form>

        {/* Right Section (Login/Profile) */}
        <div className="flex items-center space-x-4 mt-2 md:mt-0">
          {isLoggedIn ? (
            <>
              <Link href="/collections" className="text-gray-800 hover:text-blue-600">
                📌 Collections
              </Link>
              <Link href="/profile" className="text-gray-800 hover:text-blue-600">
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
              <Link href="/login" className="text-gray-800 hover:text-blue-600">
                Login
              </Link>
              <Link
                href="/signup"
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu: Category Links (visible when showMenu is true) */}
        {showMenu && (
          <div className="w-full md:hidden mt-4">
            <div className="flex flex-col items-start space-y-2 px-2">
              <Link href="/" className="text-gray-800 hover:text-blue-600">
                Home
              </Link>
              {[
                "national",
                "international",
                "politics",
                "sports",
                "technology",
                "entertainment",
                "finance",
              ].map((category) => (
                <Link
                  key={category}
                  href={`/category/${category}`}
                  className="text-gray-800 hover:text-blue-600 capitalize"
                  onClick={() => setShowMenu(false)} // close menu after selection
                >
                  {category}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
