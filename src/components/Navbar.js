"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
  const [isMobile, setIsMobile] = useState(false);

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
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolling(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (showMenu) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [showMenu]);

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setUserName('');
    setUserRole('');
    setShowDropdown(false);
    router.push('/');
    setShowMenu(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?query=${searchQuery}`);
      setShowMenu(false);
    }
  };

  const toggleMenu = () => setShowMenu((prev) => !prev);
  const toggleDropdown = () => setShowDropdown((prev) => !prev);

  return (
    <nav className={`fixed top-0 left-0 w-full z-30 transition-all duration-300 ${scrolling ? "shadow-md py-2" : "py-2"} backdrop-blur-md bg-[rgba(12,15,26,0.7)] text-white`}>
      
      {/* NepalTimeBar on desktop */}
      {!scrolling && !isMobile && (
        <div className="pb-1">
          <NepalTimeBar />
        </div>
      )}

      <div className="container mx-auto px-4 flex justify-between items-center">
        
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <span className="text-white text-xl font-bold">NepNews</span>
        </Link>

        {/* Hamburger */}
        <button onClick={toggleMenu} className="md:hidden p-2 text-white hover:text-blue-400 focus:outline-none">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6 ml-8">
          {["national", "international", "politics", "sports", "technology", "entertainment", "finance"].map((category) => (
            <Link key={category} href={`/category/${category}`} className="capitalize hover:text-blue-400 transition">
              {category}
            </Link>
          ))}

          {/* Search Desktop */}
          <form onSubmit={handleSearch} className="relative flex items-center border border-white-500 rounded-md px-2 bg-navbar">
            <input
              type="text"
              placeholder="Search news..."
              className="bg-navbar text-white px-2 py-1 w-40 focus:outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="ml-2 text-blue-300 hover:text-white">🔍</button>
          </form>

          {/* User Desktop */}
          {!isLoading && (
            isLoggedIn ? (
              <div className="relative ml-4">
                <button onClick={toggleDropdown} className="hover:text-blue-400 transition cursor-pointer">
                  👤 {userName.split(" ")[0]}
                </button>
                {showDropdown && (
                  <div className="absolute right-0 mt-2 bg-black border border-white-300 rounded shadow-md w-40 z-10">
                    {(userRole === 'ADMIN' || userRole === 'EDITOR' || userRole === 'AUTHOR') && (
                      <Link href={`/${userRole.toLowerCase()}/dashboard`} onClick={() => setShowDropdown(false)} className="block px-4 py-2 text-sm hover:text-blue-400 transition">
                        Dashboard
                      </Link>
                    )}
                    <Link href="/profile" onClick={() => setShowDropdown(false)} className="block px-4 py-2 text-sm hover:text-blue-400 transition">
                      Profile
                    </Link>
                    <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm text-white-400 hover:text-blue-400 transition">
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-4 ml-4">
                <Link href="/login" className="text-white text-base font-medium hover:text-blue-400 transition">Login</Link>
                <Link href="/signup" className="text-white text-base font-medium px-4 py-1.5 rounded-lg hover:text-blue-400 transition">SignUp</Link>
              </div>
            )
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {showMenu && (
        <div className="fixed top-0 left-0 w-full h-[60vh] bg-black bg-opacity-90 z-40 flex flex-col animate-slide-down">
          {/* Top (Menu + X) */}
          <div className="flex items-center justify-between p-4 border-b border-white">
            <span className="text-lg font-bold">Menu</span>
            <button onClick={toggleMenu} className="text-white hover:text-blue-400 text-2xl">✖</button>
          </div>

          {/* Mobile Menu Content */}
          <div className="flex flex-col gap-6 p-6 overflow-y-auto flex-grow">
            
            {/* Search at Top */}
            <form onSubmit={(e) => { handleSearch(e); toggleMenu(); }} className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Search news..."
                className="w-[160px] border border-white-300 bg-black text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="text-white hover:text-blue-400 text-xl">🔍</button>
            </form>

            {/* Categories */}
            {["national", "international", "politics", "sports", "technology", "entertainment", "finance"].map((category) => (
              <Link key={category} href={`/category/${category}`} onClick={toggleMenu} className="capitalize text-white hover:text-blue-400 transition">
                {category}
              </Link>
            ))}

            {/* Profile Links */}
            {!isLoading && isLoggedIn && (
              <>
                {(userRole === 'ADMIN' || userRole === 'EDITOR' || userRole === 'AUTHOR') && (
                  <Link href={`/${userRole.toLowerCase()}/dashboard`} onClick={toggleMenu} className="hover:text-blue-400 transition">📊 Dashboard</Link>
                )}
                <Link href="/profile" onClick={toggleMenu} className="hover:text-blue-400 transition">👤 Profile</Link>
                <button onClick={() => { handleLogout(); }} className="text-left hover:text-blue-400 transition">Logout</button>
              </>
            )}
            {!isLoggedIn && !isLoading && (
              <Link href="/login" onClick={toggleMenu} className="hover:text-blue-400 transition">Login</Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
