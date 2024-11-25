"use client";

import { useState } from "react";
import LoadingScreen from "@/components/loadingScreen";
import Header from "@/components/header";
import { getLocalStorage } from "@/lib/localStorage";
import { useRouter } from "next/navigation";

export default function CreateCourse() {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [userid, setUserid] = useState(() => {
    // Initialize from localStorage if available
    if (typeof window !== "undefined") {
      return getLocalStorage("userid") || "";
    }
    return "";
  });

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (input.trim() !== "" && userid !== "") {
      const res = await fetch("/api/generate-learning-content", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ topic: input, userid }),
      });
      if (res.status === 200) {
        const data = await res.json();
        setIsLoading(false);
        router.push(`/lesson/${data.courseid}`);
      } else {
        setIsLoading(false);
        setIsError(true);
        // console.error("Error creating course:", res.statusText);
      }
    } else {
      setIsLoading(false);
      setIsError(true);
    }

    setInput("");
  };

  return (
    <>
      <Header type="logged" />
      <div className="min-h-screen bg-gray-900 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="relative pt-12">
          <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
            <div className="relative">
              <textarea
                rows={10}
                cols={5}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ex: I'm going to china for a tech conference"
                required
                className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg
              text-white placeholder-gray-400 focus:outline-none focus:border-red-500
              focus:ring-2 focus:ring-red-500/20 transition-all"
              />
            </div>
            <button
              type="submit"
              className="w-full px-6 py-3 bg-red-600 text-white rounded-lg font-medium
            hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500/20
            transition-all transform hover:-translate-y-0.5"
            >
              Let's train Ninja!
            </button>
            {isError && (
              <p className="text-red-500 text-sm text-center">
                Error creating course. Please try again.
              </p>
            )}
          </form>

          {isLoading && <LoadingScreen />}
        </div>
      </div>
    </>
  );
}
