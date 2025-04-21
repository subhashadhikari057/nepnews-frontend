"use client";

import { useEffect, useState } from "react";
import NewsList from "../components/NewsList";
import AdBanner from "../components/AdBanner";
import FeaturedNewsSlider from "../components/FeaturedNewsSlider";
import Elegant from "../components/Elegant";
import Navbar from "../components/Navbar";  // Assuming you have a Navbar component
import Footer from "../components/Footer";  // Assuming you have a Footer component

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 3000); // 2.5 seconds for the splash screen
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="min-h-screen" style={{ backgroundColor: '#050400' }}>
      {showSplash ? (
        // ✨ Show Elegant splash screen and hide navbar & footer
        <Elegant />
      ) : (
        // 💻 Show the actual homepage content after splash
        <>
          {/* Show Navbar only after splash */}
          <Navbar />

          {/* 🔥 Featured Slider Section (optional, currently commented) */}
          {/* <FeaturedNewsSlider /> */}

          {/* 📢 Advertisement Banner Below Slider */}
          <AdBanner type="home" />

          {/* 📰 Latest News Section */}
          <div className="container mx-auto">
            <h1 className="text-3xl font-bold text-center my-6 text-white-600">
              Latest News 📰
            </h1>

            {/* 🗞️ News Feed with Load More */}
            <NewsList />
          </div>

          {/* Show Footer only after splash */}
          <Footer />
        </>
      )}
    </main>
  );
}
