"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function SubscriptionModal({ onClose }) {
  const [show, setShow] = useState(false);
  const [step, setStep] = useState("prompt"); // prompt | input | success
  const [phone, setPhone] = useState("");
  const [pin, setPin] = useState("");
  const [loading, setLoading] = useState(false);

  // ⏱️ Show modal after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleConfirm = () => {
    setStep("input");
  };

  const handlePayment = () => {
    if (phone !== "9800000000" || pin !== "1111") {
      toast.error("Invalid phone or PIN");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      localStorage.setItem("isSubscribed", "true");
      toast.success("🎉 Subscription successful!");
      setStep("success");
      setTimeout(onClose, 2000);
    }, 1500);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-10 right-10 z-50">
      <div className="w-80 bg-[#f4f1fb] rounded-xl shadow-lg border border-gray-300 px-6 py-5 transition-all duration-300">
        {step === "prompt" && (
          <>
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
                onClick={handleConfirm}
                className="px-4 py-1 rounded bg-[#4f45e4] text-white text-sm hover:bg-[#3e36c8]"
              >
                Subscribe
              </button>
            </div>
          </>
        )}

        {step === "input" && (
          <>
            <h2 className="text-lg font-bold text-[#4f45e4] mb-4">Enter Details</h2>
            <input
              type="text"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full mb-3 px-3 py-2 rounded border bg-white text-sm text-gray-800 placeholder-gray-500 outline-none focus:ring focus:ring-[#4f45e4]"
            />
            <input
              type="password"
              placeholder="PIN"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              className="w-full mb-4 px-3 py-2 rounded border bg-white text-sm text-gray-800 placeholder-gray-500 outline-none focus:ring focus:ring-[#4f45e4]"
            />
            <button
              onClick={handlePayment}
              disabled={loading}
              className={`w-full py-2 rounded text-white font-medium transition ${
                loading ? "bg-[#a69fe1]" : "bg-[#4f45e4] hover:bg-[#3e36c8]"
              }`}
            >
              {loading ? "Processing..." : "Pay Rs. 100"}
            </button>
          </>
        )}

        {step === "success" && (
          <div className="text-center text-[#28a745]">
            <p className="text-xl font-bold mb-1">✅ Payment Successful!</p>
            <p className="text-sm text-gray-600">Thank you for subscribing.</p>
          </div>
        )}
      </div>
    </div>
  );
}
