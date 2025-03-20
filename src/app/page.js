import NewsList from "../components/NewsList"; // Import NewsList component

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100">
      <div className="container mx-auto">
      <h1 className="text-3xl font-bold text-center my-6 text-blue-600">Latest News 📰</h1>
        <NewsList /> {/* Display News */}
      </div>
    </main>
  );
}
