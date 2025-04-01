"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import dynamic from "next/dynamic";

const NepalTimeBar = dynamic(() => import("./NepalTimeBar"), { ssr: false });

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [userRole, setUserRole] = useState('');
  const [scrolling, setScrolling] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
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
      setIsLoading(false);
    };
    checkLogin();
    window.addEventListener('userLoggedIn', checkLogin);
    return () => window.removeEventListener('userLoggedIn', checkLogin);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolling(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setUserName('');
    setUserRole('');
    setShowDropdown(false);
    router.push('/');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?query=${searchQuery}`);
    }
  };

  const toggleMenu = () => setShowMenu((prev) => !prev);
  const toggleDropdown = () => setShowDropdown((prev) => !prev);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolling ? "shadow-md py-2" : "py-3"} bg-black text-white-400 font-serif`}>
      <NepalTimeBar />
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <div className="inline-block rounded overflow-hidden" style={{ backgroundColor: 'black', lineHeight: 0 }}>
              <Image src="/ads/logo.png" alt="NepNews Logo" width={120} height={40} priority />
            </div>
          </Link>

          {/* Mobile Menu Icon */}
          <button onClick={toggleMenu} className="md:hidden p-2 text-white-300 hover:text-pink-400 focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6 ml-6">
            <Link href="/" className="hover:text-pink-400 transition">Home</Link>
            {["national", "international", "politics", "sports", "technology", "entertainment", "finance"].map((category) => (
              <Link
                key={category}
                href={`/category/${category}`}
                className="capitalize hover:text-pink-400 transition"
              >
                {category}
              </Link>
            ))}

            {/* Search */}
            <form onSubmit={handleSearch} className="relative flex items-center border border-white-500 rounded-md px-2 bg-black">
              <input
                type="text"
                placeholder="Search news..."
                className="bg-black text-white-200 px-2 py-1 w-40 focus:outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="ml-2 text-pink-300 hover:text-white">🔍</button>
            </form>

            {/* Login/Signup or User */}
            {!isLoading && (
              isLoggedIn ? (
                <div className="relative">
                  <button onClick={toggleDropdown} className="hover:text-pink-400 transition cursor-pointer">
                    👤 {userName.split(" ")[0]}
                  </button>
                  {showDropdown && (
                    <div className="absolute right-0 mt-2 bg-black border border-white-300 rounded shadow-md w-40 z-10">
                      {(userRole === 'ADMIN' || userRole === 'EDITOR' || userRole === 'AUTHOR') && (
                        <Link href={`/${userRole.toLowerCase()}/dashboard`} className="block px-4 py-2 text-sm hover:text-pink-400 transition" onClick={() => setShowDropdown(false)}>
                          Dashboard
                        </Link>
                      )}
                      <Link href="/profile" className="block px-4 py-2 text-sm hover:text-pink-400 transition" onClick={() => setShowDropdown(false)}>
                        Profile
                      </Link>
                      <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm text-white-400 hover:text-pink-400 transition">
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-4 ml-4">
                  <Link
                    href="/login"
                    className="text-white text-base font-medium hover:text-pink-400 transition"
                  >
                    Login
                  </Link>
                  <Link
                    href="/signup"
                    className="text-white text-base font-medium px-4 py-1.5 rounded-lg hover:text-pink-400 transition"
                  >
                    SignUp
                  </Link>
                </div>
              )
            )}
          </div>
        </div>

        {/* Mobile Nav */}
        {showMenu && (
          <div className="md:hidden mt-4 space-y-4">
            <Link href="/" className="block hover:text-pink-400 transition">Home</Link>
            {["national", "international", "politics", "sports", "technology", "entertainment", "finance"].map((category) => (
              <Link
                key={category}
                href={`/category/${category}`}
                className="block capitalize hover:text-pink-400 transition"
              >
                {category}
              </Link>
            ))}

            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search news..."
                className="w-full border border-white-300 bg-black text-white-200 rounded-md px-3 py-1 focus:outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="absolute right-3 top-1 text-pink-300 hover:text-white">🔍</button>
            </form>

            {!isLoading && isLoggedIn && (
              <>
                {(userRole === 'ADMIN' || userRole === 'EDITOR' || userRole === 'AUTHOR') && (
                  <Link href={`/${userRole.toLowerCase()}/dashboard`} className="block hover:text-pink-400 transition">
                    📊 Dashboard
                  </Link>
                )}
                <Link href="/profile" className="block hover:text-pink-400 transition">👤 Profile</Link>
                <button onClick={handleLogout} className="block text-left text-white hover:text-pink-400 transition">Logout</button>
              </>
            )}

            {!isLoggedIn && !isLoading && (
              <>
                <Link href="/login" className="block hover:text-pink-400 transition">Login</Link>
                <Link href="/signup" className="block border border-pink-600 text-white px-4 py-2 rounded-md hover:text-pink-400 transition">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
