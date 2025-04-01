import NewsList from "../components/NewsList"; // Import NewsList
import AdBanner from "../components/AdBanner"; // Import Ad Space Component
import FeaturedNewsSlider from "../components/FeaturedNewsSlider"; // Import News Slider

export default function Home() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: '#050400' }}>
      
      {/* 🔥 Featured Slider Section (Top) */}
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
    </main>
  );
}
