"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function SubscriptionModal({ onClose }) {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  // ⏱️ Show modal after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

const userId = localStorage.getItem("userId");

const handlePayment = async () => {
  const token = localStorage.getItem("token");
  if (!token || token.trim() === "") {
    toast.error("You must be logged in to subscribe.");
    return;
  }

  setLoading(true);

  try {
    const res = await fetch("http://localhost:8080/api/khalti/initiate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        returnUrl: "http://localhost:3000/verify",
        websiteUrl: "http://localhost:3000",
        amount: 10000,
        purchaseOrderId: userId, // 🔄 Replace with real user ID if available
        purchaseOrderName: "NepNews Subscription",
        name: "Test User",
        email: "test@example.com",
        phone: "9800000002"
      })
    });

    const data = await res.json();

    if (data.payment_url) {
      window.location.href = data.payment_url;
    } else {
      toast.error("Failed to initiate payment.");
      setLoading(false);
    }
  } catch (err) {
    toast.error("Something went wrong.");
    setLoading(false);
  }
};

  if (!show) return null;

  return (
    <div className="fixed bottom-10 right-10 z-50">
      <div className="w-80 bg-[#f4f1fb] rounded-xl shadow-lg border border-gray-300 px-6 py-5 transition-all duration-300">
        <h2 className="text-lg font-bold text-[#4f45e4] mb-2">Go Ad-Free</h2>
        <p className="text-sm text-gray-700 mb-4">
          Subscribe to NepNews for Rs. 100 and enjoy an ad-free experience.
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-1 rounded border border-gray-300 text-sm text-gray-600 hover:bg-gray-200"
          >
            Cancel
          </button>
          <button
            onClick={handlePayment}
            disabled={loading}
            className={`px-4 py-1 rounded text-white text-sm font-medium ${
              loading ? "bg-[#a69fe1]" : "bg-[#4f45e4] hover:bg-[#3e36c8]"
            }`}
          >
            {loading ? "Processing..." : "Subscribe"}
          </button>
        </div>
      </div>
    </div>
  );
}
