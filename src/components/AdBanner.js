"use client";

import { useState, useEffect } from "react";

export default function AdBanner({ type = "default" }) {
  // Define ad images for each category
  const getAdImages = () => {
    switch (type) {
      case "home":
        return ["/ads/ad1.png", "/ads/ad2.png"];
      case "search":
        return ["/ads/ad1.png", "/ads/ad2.png"];
      case "national":
        return ["/ads/ad1.png", "/ads/ad2.png"];
      case "international":
        return ["/ads/ad1.png", "/ads/ad2.png"];
      case "politics":
        return ["/ads/ad1.png", "/ads/ad2.png"];
      case "sports":
        return ["/ads/ad1.png", "/ads/ad2.png"];
      case "technology":
        return ["/ads/ad1.png", "/ads/ad2.png"];
      case "entertainment":
        return ["/ads/ad1.png", "/ads/ad2.png"];
      case "finance":
        return ["/ads/ad1.png", "/ads/ad2.png"];
      default:
        return ["/ads/ad1.png", "/ads/ad2.png"];
    }
  };

  const adImages = getAdImages();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);

  // Auto-rotate images with smooth transition
  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false); // Start fading out
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % adImages.length);
        setFade(true); // Fade in the new image
      }, 500); // Wait before changing image
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, [adImages.length]);

  return (
    <div className="relative w-full h-40 md:h-48 lg:h-56 overflow-hidden mt-8">
      <img
        src={adImages[currentIndex]}
        alt="Ad Banner"
        className={`absolute w-full h-full object-cover transition-opacity duration-1000 ${
          fade ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}
