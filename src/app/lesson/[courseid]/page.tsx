"use client";

import Header from "@/components/header";
import React, { useEffect } from "react";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Sword } from "lucide-react";
import { Lesson } from "@/types";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import Link from "next/link";

type Props = {
  params: { courseid: string };
};

const LessonPage = ({ params }: Props) => {
  const { courseid } = params;

  const [lesson, setLesson] = useState<Lesson>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!courseid) return;

    setIsLoading(true);
    fetch(`/api/lesson?courseid=${courseid}`)
      .then((res) => res.json())
      .then((data) => {
        setLesson(data);
        setIsLoading(false);
      });
  }, [courseid]);

  return (
    <>
      <Header type="logged" />
      {isLoading ? (
        <div className="bg-gray-900 flex flex-col items-center justify-center min-h-screen">
          <Image
            className="rounded-full spin"
            src="/ninja-logo.png"
            alt="Loading..."
            width={100}
            height={100}
          />

          <p className="text-white mt-4 text-center">Loading your quiz...</p>
        </div>
      ) : lesson ? (
        <div className="min-h-screen bg-gray-900 pt-24">
          <div className="max-w-4xl mx-auto px-4 py-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-700">
                {lesson.title}
              </h1>
              <div className="flex items-center space-x-4">
                <div className="px-4 py-2 bg-gray-800 rounded-lg border border-gray-700">
                  <div className="flex items-center space-x-2">
                    <Sword className="w-4 h-4 text-red-500" />
                    <span className="text-white font-medium">+100000 AURA</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Lesson Card */}
            <div className="relative bg-gray-800 rounded-lg border border-gray-700 shadow-xl overflow-hidden">
              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-red-500/10 to-transparent transform -skew-x-12"></div>

              {/* Content */}
              <div className="p-8 relative">
                <div className="flex flex-col items-center space-y-8">
                  <ReactMarkdown className="text-white">
                    {`${lesson.content
                      .replace(/\\u([a-fA-F0-9]{4})/g, (_, hex) =>
                        String.fromCharCode(parseInt(hex, 16))
                      )
                      .replace(/\\n\\n/g, "\n\n")
                      .replace(/\\n/g, "\n")}`}
                  </ReactMarkdown>
                </div>
              </div>

              {/* Navigation Controls */}
              <div className="p-6 bg-gray-900 border-t border-gray-700">
                <div className="flex flex-col gap-3 md:justify-between md:flex-row items-center">
                  <Link
                    href="/dashboard"
                    className="flex items-center space-x-2 px-4 py-2 bg-red-600 rounded-lg hover:bg-red-700 transition-colors text-white"
                  >
                    <ChevronLeft className="w-5 h-5" />
                    <span>Dashboard</span>
                  </Link>
                  <Link
                    href={`/quiz/${courseid}`}
                    className="flex items-center space-x-2 px-4 py-2 bg-red-600 rounded-lg hover:bg-red-700 transition-colors text-white"
                  >
                    <span>Take the quiz</span>
                    <ChevronRight className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-gray-900 text-red-500 flex items-center justify-center min-h-screen">
          <p className="text-center">
            Error loading user data. Please try again later.
          </p>
        </div>
      )}
    </>
  );
};

export default LessonPage;
