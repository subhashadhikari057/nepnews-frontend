import NewsList from "../components/NewsList"; // Import NewsList component
import AdBanner from "../components/AdBanner"; // Import Ad Space Component

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Ad Space Above Latest News */}
      <AdBanner />

      {/* Latest News Section */}
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-center my-6 text-blue-600 dark:text-white">
          Latest News 📰
        </h1>
        <NewsList /> {/* Display News */}
      </div>
    </main>
  );
}
