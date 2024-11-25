"use client";

import { useEffect, useState } from "react";
import { Loader } from "lucide-react";

const loadingMessages = [
  "Sharpening shurikens...",
  "Summoning ninjas...",
  "Preparing ancient scrolls...",
  "Mastering secret techniques...",
  "Channeling chi energy...",
  "Blending with shadows...",
];

export default function LoadingScreen() {
  const [message, setMessage] = useState(loadingMessages[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessage((prev) => {
        const currentIndex = loadingMessages.indexOf(prev);
        return loadingMessages[(currentIndex + 1) % loadingMessages.length];
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-black/95 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="text-center">
        <Loader className="w-16 h-16 text-red-600 animate-spin-slow mx-auto mb-6" />
        <p className="text-white text-xl font-medium animate-pulse">
          {message}
        </p>
      </div>
    </div>
  );
}
