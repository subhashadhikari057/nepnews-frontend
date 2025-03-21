"use client";

export default function AdBanner({ type = "default" }) {
  const getAdContent = () => {
    switch (type) {
      case "home":
        return {
          text: "🏠 Welcome to NepNews - Place Your Homepage Ad Here!",
          img: "/ads/home-ad.jpg",
        };
      case "search":
        return {
          text: "🔍 Searching for Something? Advertise on Search Page!",
          img: "/ads/search-ad.jpg",
        };
      case "tech":
        return {
          text: "💻 Tech Enthusiasts Visit Often – Advertise in Tech!",
          img: "/ads/tech-ad.jpg",
        };
      case "sports":
        return {
          text: "⚽ Sports Lovers are Here – Show Your Brand!",
          img: "/ads/sports-ad.jpg",
        };
      case "politics":
        return {
          text: "🏛️ Political Insights? Place Your Political Ad!",
          img: "/ads/politics-ad.jpg",
        };
      case "entertainment":
        return {
          text: "🎬 Entertain with Ads on the Entertainment Page!",
          img: "/ads/entertainment-ad.jpg",
        };
      case "finance":
        return {
          text: "💰 Reach Investors – Advertise on Finance News!",
          img: "/ads/finance-ad.jpg",
        };
      default:
        return {
          text: "📢 Advertise Here - Your Ad Could Be Here! 📢",
          img: "/ads/default.jpg",
        };
    }
  };

  const ad = getAdContent();

  return (
    <div className="w-full bg-gray-200 dark:bg-gray-800 py-4">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4 gap-4">
        <p className="text-gray-700 dark:text-gray-300 text-lg font-semibold text-center md:text-left">
          {ad.text}
        </p>
        <img
          src={ad.img}
          alt="Ad Banner"
          className="w-full md:w-64 h-24 object-cover rounded-md"
        />
      </div>
    </div>
  );
}
