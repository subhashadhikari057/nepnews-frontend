"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [userRole, setUserRole] = useState('');
  const [scrolling, setScrolling] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // ⬅️ NEW
  const router = useRouter();

  useEffect(() => {
    const checkLogin = () => {
      const token = localStorage.getItem('token');
      const name = localStorage.getItem('name');
      const role = localStorage.getItem('role');

      if (token) {
        setIsLoggedIn(true);
        setUserName(name || '');
        setUserRole(role || '');
      } else {
        setIsLoggedIn(false);
      }

      setIsLoading(false); // ⬅️ Mark loading complete
    };

    checkLogin();
    window.addEventListener('userLoggedIn', checkLogin);
    return () => {
      window.removeEventListener('userLoggedIn', checkLogin);
    };
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setUserName('');
    setUserRole('');
    setShowDropdown(false);
    router.push('/');
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolling(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?query=${searchQuery}`);
    }
  };

  const toggleMenu = () => setShowMenu((prev) => !prev);
  const toggleDropdown = () => setShowDropdown((prev) => !prev);

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

        {/* Hamburger Icon */}
        <div className="flex md:hidden">
          <button onClick={toggleMenu} className="text-gray-800 focus:outline-none">
            ☰
          </button>
        </div>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex flex-wrap items-center space-x-4 lg:space-x-6">
          <Link href="/" className="text-gray-800 hover:text-blue-600">Home</Link>
          {[
            "national", "international", "politics",
            "sports", "technology", "entertainment", "finance",
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

        {/* Right Section: Profile or Login/Signup */}
        {!isLoading && (
          <div className="flex items-center space-x-4 mt-2 md:mt-0">
            {isLoggedIn ? (
              <div className="relative">
                <button onClick={toggleDropdown} className="text-gray-800 hover:text-blue-600">
                  👤 {userName.split(" ")[0]}
                </button>
                {showDropdown && (
                  <div className="absolute right-0 mt-2 bg-white border rounded shadow-md w-40 z-10">
                    <Link
                      href="/profile"
                      className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100"
                      onClick={() => setShowDropdown(false)}
                    >
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
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
        )}

        {/* Mobile Menu */}
        {showMenu && (
          <div className="w-full md:hidden mt-4">
            <div className="flex flex-col items-start space-y-2 px-2">
              <Link href="/" className="text-gray-800 hover:text-blue-600">Home</Link>
              {[
                "national", "international", "politics",
                "sports", "technology", "entertainment", "finance",
              ].map((category) => (
                <Link
                  key={category}
                  href={`/category/${category}`}
                  className="text-gray-800 hover:text-blue-600 capitalize"
                  onClick={() => setShowMenu(false)}
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
