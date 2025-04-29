"use client";

import NewsList from "../components/NewsList";
import AdBanner from "../components/AdBanner";

export default function Home() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: '#0C0F1A' }}>
      <AdBanner type="home" />

      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-center my-6 text-white">
          Latest News 📰
        </h1>

        <NewsList />
      </div>
    </main>
  );
}
