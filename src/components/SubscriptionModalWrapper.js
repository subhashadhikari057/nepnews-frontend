"use client";

import { useEffect, useState } from "react";
import SubscriptionModal from "./SubscriptionModal";

export default function SubscriptionModalWrapper() {
  const [shouldShow, setShouldShow] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const token = localStorage.getItem("token");
    const isSubscribed = localStorage.getItem("isSubscribed") === "true";

    // ✅ Explicitly check for valid non-empty token
    const isLoggedIn = !!token && token.trim() !== "";

    if (isLoggedIn && !isSubscribed) {
      setShouldShow(true);
    }
  }, []);

  if (!shouldShow) return null;

  return <SubscriptionModal onClose={() => setShouldShow(false)} />;
}
