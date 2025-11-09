"use client";

import { useEffect, useState } from "react";
import { Activity, Clock } from "lucide-react";

export default function Navbar() {
  const [time, setTime] = useState<string>("");
  const [date, setDate] = useState<string>("");

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString("tr-TR", { hour12: false }));
      setDate(now.toLocaleDateString("tr-TR"));
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <nav className="w-full bg-black bg-opacity-90 text-white py-4 px-8 fixed top-0 flex justify-between items-center">
      <div className="flex items-center space-x-2">
        <Activity className="w-6 h-6 text-red-500" />
        <h1 className="text-lg font-semibold tracking-wide uppercase">
          Türkiye Güncel Deprem Haritası
        </h1>
      </div>

      <div className="flex items-center space-x-2 bg-gray-600 bg-opacity-50 px-3 py-1 rounded-md shadow-md">
        <Clock className="w-5 h-5 text-gray-300" />
        <span className="text-sm">
          {date} - {time}
        </span>
      </div>
    </nav>
  );
}
