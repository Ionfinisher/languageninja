"use client";

import Header from "@/components/header";
import React, { useEffect } from "react";
import { useState } from "react";
import QuizGame from "@/components/quizGame";
import { QuizItem } from "@/types";
import Image from "next/image";

type Props = {
  params: { courseid: string };
};

const QuizPage = ({ params }: Props) => {
  const { courseid } = params;
  const [quizzes, setQuizzes] = useState<QuizItem[]>([]);
  const [quizScore, setQuizScore] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const handleQuizComplete = (score: number) => {
    setQuizScore(score);
  };

  useEffect(() => {
    if (!courseid) return;

    setIsLoading(true);
    fetch(`/api/quiz?courseid=${courseid}`)
      .then((res) => res.json())
      .then((data) => {
        const { quizzes: quizzes } = data;
        setQuizzes(quizzes);
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
      ) : quizzes ? (
        <QuizGame questions={quizzes} onComplete={handleQuizComplete} />
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

export default QuizPage;
