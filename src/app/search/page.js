"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";  // ✅ Import Suspense
import NewsList from "../../components/NewsList";
import AdBanner from "../../components/AdBanner";

export default function SearchPage() {
  return (
    <main className="min-h-screen bg-black-100 dark:bg-black-900">
      <AdBanner type="search" />

      <div className="container mx-auto p-6">
        {/* ✅ Wrap inside Suspense */}
        <Suspense fallback={<p className="text-center text-gray-500">Loading search results...</p>}>
          <SearchContent />
        </Suspense>
      </div>
    </main>
  );
}

// ✅ New child component for search query
function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";

  return (
    <>
      <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white my-6">
        Search Results for &quot;{query}&quot;
      </h1>
      <NewsList searchQuery={query} />
    </>
  );
}
