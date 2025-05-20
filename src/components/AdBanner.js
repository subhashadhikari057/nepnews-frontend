"use client";

import { useState, useEffect } from "react";

export default function AdBanner({ type = "default" }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const [showAd, setShowAd] = useState(false);

  // Check subscription status
  useEffect(() => {
    const isSubscribed = localStorage.getItem("isSubscribed") === "true";
    setShowAd(!isSubscribed); // only show ads if not subscribed
  }, []);

  // Rotate images if ads are showing
  useEffect(() => {
    if (!showAd) return;

    const interval = setInterval(() => {
      setFade(false); // Start fading out
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % adImages.length);
        setFade(true); // Fade in the new image
      }, 500);
    }, 5000);

    return () => clearInterval(interval);
  }, [showAd]);

  // Ad image sets
  const getAdImages = () => {
    switch (type) {
      case "home":
      case "search":
      case "national":
      case "international":
      case "politics":
      case "sports":
      case "technology":
      case "entertainment":
      case "finance":
        return ["/ads/ad1.png", "/ads/ad2.png"];
      default:
        return ["/ads/ad1.png", "/ads/ad2.png"];
    }
  };

  const adImages = getAdImages();

  // ⛔️ Don’t render anything if user is subscribed
  if (!showAd) return null;

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
