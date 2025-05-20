"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function VerifyPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState("Verifying your payment...");

  const pidx = searchParams.get("pidx");

  useEffect(() => {
    if (!pidx) return;

    const verifyPayment = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/khalti/verify", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ pidx }),
        });

        const data = await res.json();

        if (data.success) {
          localStorage.setItem("isSubscribed", "true");
          toast.success("🎉 Subscription activated!");
          setStatus("✅ Subscription successful.");
        } else {
          toast.error("❌ Payment failed.");
          setStatus("❌ Payment failed or cancelled.");
        }

        setTimeout(() => {
          router.push("/"); // or any route you prefer
        }, 3000);
      } catch (err) {
        toast.error("Verification failed.");
        setStatus("❌ Could not verify payment.");
      }
    };

    verifyPayment();
  }, [pidx]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center">
        <h1 className="text-xl font-semibold text-gray-800">Verifying Khalti Payment</h1>
        <p className="text-gray-600 mt-2">{status}</p>
      </div>
    </div>
  );
}
