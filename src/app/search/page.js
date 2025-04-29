"use client"; // Ensures this is a client component

import { useSearchParams } from "next/navigation";
import NewsList from "../../components/NewsList";
import AdBanner from "../../components/AdBanner"; // Import Ad Space Component

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";

  return (
    <main className="min-h-screen bg-black-100 dark:bg-black-900">
      {/* Ad Space Above Search Results */}
      <AdBanner type="search" />  

      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white my-6">
        Search Results for &quot;{query}&quot;
        </h1>
        <NewsList searchQuery={query} /> {/* Pass query to NewsList */}
      </div>
    </main>
  );
}
