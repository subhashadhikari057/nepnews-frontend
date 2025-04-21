'use client';

import { useEffect, useState } from "react";

export default function NepalTimeBar() {
  const [time, setTime] = useState(getNepalTime());
  const [quote, setQuote] = useState('');
  const [weather, setWeather] = useState(null);

  const quotes = [
    "🧠 “The truth is rarely pure and never simple.” – Oscar Wilde",
    "🧠 “Journalism is what we need to make democracy work.” – Walter Cronkite",
    "🧠 “Facts do not cease to exist because they are ignored.” – Aldous Huxley",
    "🧠 “News is what somebody does not want you to print.” – George Orwell",
    "🧠 “Journalism is the first rough draft of history.” – Philip L. Graham",
    "🧠 “A good newspaper is a nation talking to itself.” – Arthur Miller",
    "🧠 “The press was to serve the governed, not the governors.” – Hugo Black",
    "🧠 “The news is the first signal of trouble.” – Walter Lippmann",
    "🧠 “If you don’t read the newspaper, you’re uninformed.” – Mark Twain",
    "🧠 “In seeking truth you have to get both sides of a story.” – Walter Cronkite"
  ];
  

  const goldPrice = "NPR 177,899.33";
  const silverPrice = "NPR 2,035.37";

  // ⏰ Time update every second
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getNepalTime());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // 💬 Rotating quote
  useEffect(() => {
    const quoteInterval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * quotes.length);
      setQuote(quotes[randomIndex]);
    }, 10000);
    setQuote(quotes[0]);
    return () => clearInterval(quoteInterval);
  }, []);

  // 🌤️ Fetch weather from Open-Meteo API
  // useEffect(() => {
  //   const fetchWeather = async () => {
  //     try {
  //       const res = await fetch(
  //         'https://api.open-meteo.com/v1/forecast?latitude=27.7172&longitude=85.3240&hourly=temperature_2m&forecast_days=1'
  //       );

  //       const data = await res.json();

  //       if (data.hourly?.temperature_2m && data.hourly?.time) {
  //         const now = new Date();
  //         const currentHour = now.toISOString().slice(0, 13); // "YYYY-MM-DDTHH"
  //         const index = data.hourly.time.findIndex(t => t.startsWith(currentHour));
  //         const temp = index !== -1 ? Math.round(data.hourly.temperature_2m[index]) + "°C" : "N/A";

  //         setWeather({ temp, condition: "Clear ☀️" });
  //       } else {
  //         console.error("⚠️ Unexpected weather data:", data);
  //         setWeather({ temp: "22°C", condition: "Partly Cloudy ☁️" });
  //       }
  //     } catch (err) {
  //       console.error("❌ Weather API error:", err);
  //       setWeather({ temp: "22°C", condition: "Partly Cloudy ☁️" });
  //     }
  //   };

  //   fetchWeather();
  // }, []);

  function getNepalTime() {
    const now = new Date();
    const nepalOffset = 5 * 60 + 45;
    const localOffset = now.getTimezoneOffset();
    const totalOffset = nepalOffset + localOffset;
    const nepalTime = new Date(now.getTime() + totalOffset * 60000);
    return nepalTime.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  }

  return (
    <div className="w-full bg-black text-white-300 text-sm py-1 px-1 flex flex-wrap justify-center items-center gap-13 text-center">
      <span>🕒 Nepal Time: <span className="font-medium">{time}</span></span>

      <span className="italic whitespace-nowrap">{quote}</span>

      <span>🪙 Gold: <span className="text-yellow-300 font-semibold">{goldPrice}</span></span>

      <span>🥈 Silver: <span className="text-gray-300 font-semibold">{silverPrice}</span></span>

      {weather && (
        <span>🌤️ Kathmandu: <span className="text-blue-300">{weather.temp}</span>, {weather.condition}</span>
      )}
    </div>
  );
}
