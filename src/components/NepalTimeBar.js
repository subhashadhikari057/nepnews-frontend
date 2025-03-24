// components/NepalTimeBar.js
'use client';

import { useEffect, useState } from "react";

export default function NepalTimeBar() {
  const [time, setTime] = useState(getNepalTime());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getNepalTime());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  function getNepalTime() {
    const now = new Date();
    // Convert UTC to Nepal Time (UTC+5:45)
    const nepalOffset = 5 * 60 + 45; // in minutes
    const localOffset = now.getTimezoneOffset(); // in minutes
    const totalOffset = nepalOffset + localOffset; // difference from local time

    const nepalTime = new Date(now.getTime() + totalOffset * 60000);
    return nepalTime.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  }

  return (
    <div className="w-full bg-gray-100 text-center text-sm py-1 text-red-700">
      🕒 Nepal Time: {time}
    </div>
  );
}
