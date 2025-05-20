"use client";

import { useEffect, useState } from "react";
import NewsList from "../components/NewsList";
import AdBanner from "../components/AdBanner";
import SubscriptionModal from "../components/SubscriptionModal";

export default function Home() {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const isSubscribed = localStorage.getItem("isSubscribed") === "true";
    if (!isSubscribed) {
      setShowModal(true);
    }
  }, []);

  return (
    <main className="min-h-screen" style={{ backgroundColor: '#0C0F1A' }}>
      {showModal && <SubscriptionModal onClose={() => setShowModal(false)} />}

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
