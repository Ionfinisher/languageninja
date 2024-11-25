"use client";

import { useState, useEffect } from "react";
import { CheckCircle2, XCircle, Timer, Trophy, ArrowRight } from "lucide-react";
import { QuizItem } from "@/types";
import Link from "next/link";

interface QuizGameProps {
  questions: QuizItem[];
  onComplete: (score: number) => void;
}

export default function QuizGame({ questions, onComplete }: QuizGameProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isCompleted, setIsCompleted] = useState(false);

  console.log("Quesions from the quizgame", questions);
  useEffect(() => {
    if (!isAnswered && !isCompleted) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            handleAnswer("");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [currentQuestion, isAnswered]);

  const handleAnswer = (answer: string) => {
    if (isAnswered) return;

    setSelectedAnswer(answer);
    setIsAnswered(true);

    if (answer === questions[currentQuestion].correctAnswer) {
      setScore(score + Math.ceil(timeLeft / 3));
    }
  };

  const nextQuestion = () => {
    if (currentQuestion === questions.length - 1) {
      setIsCompleted(true);
      onComplete(score);
      return;
    }

    setCurrentQuestion(currentQuestion + 1);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setTimeLeft(30);
  };

  const getOptionStyle = (option: string) => {
    if (!isAnswered) {
      return "border-gray-700 hover:border-red-500 hover:shadow-red-500/20";
    }
    if (option === questions[currentQuestion].correctAnswer) {
      return "border-green-500 bg-green-500/10 shadow-green-500/20";
    }
    if (option === selectedAnswer) {
      return "border-red-500 bg-red-500/10 shadow-red-500/20";
    }
    return "border-gray-700 opacity-50";
  };

  return (
    <div className="min-h-screen bg-gray-900 pt-20 pb-14 px-4">
      <div className="max-w-3xl mx-auto">
        {!isCompleted ? (
          <>
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center space-x-4">
                <span className="text-xl text-white font-bold">
                  Question {currentQuestion + 1}/{questions.length}
                </span>
                <div className="flex items-center space-x-2 px-4 py-2 bg-gray-800 rounded-lg">
                  <Timer className="w-5 h-5 text-red-500" />
                  <span className="text-white font-medium">{timeLeft}s</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Link
                  href="/dashboard"
                  className="flex items-center space-x-2 px-6 py-3 bg-red-600 rounded-lg
                    hover:bg-red-700 transition-colors text-white font-medium"
                >
                  Quit
                </Link>
                <div className="flex items-center space-x-2 px-4 py-2 bg-gray-800 rounded-lg">
                  <Trophy className="w-5 h-5 text-yellow-500" />
                  <span className="text-white font-medium">{score} pts</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg border border-gray-700 shadow-xl p-8 mb-8">
              <h2 className="text-2xl text-white font-bold mb-8">
                {questions[currentQuestion].question}
              </h2>

              <div className="grid grid-cols-1 gap-4">
                {questions[currentQuestion].options?.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(option)}
                    disabled={isAnswered}
                    className={`relative flex items-center justify-between p-4 border-2 
                      rounded-lg transition-all duration-300 ${getOptionStyle(
                        option
                      )}
                      ${
                        !isAnswered
                          ? "hover:transform hover:-translate-y-1"
                          : ""
                      }`}
                  >
                    <span className="text-white font-medium">{option}</span>
                    {isAnswered &&
                      option === questions[currentQuestion].correctAnswer && (
                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                      )}
                    {isAnswered &&
                      option === selectedAnswer &&
                      option !== questions[currentQuestion].correctAnswer && (
                        <XCircle className="w-5 h-5 text-red-500" />
                      )}
                  </button>
                ))}
              </div>
            </div>

            {/* Navigation */}
            {isAnswered && (
              <div className="flex justify-end">
                <button
                  onClick={nextQuestion}
                  className="flex items-center space-x-2 px-6 py-3 bg-red-600 rounded-lg
                    hover:bg-red-700 transition-colors text-white font-medium"
                >
                  <span>
                    {currentQuestion === questions.length - 1
                      ? "Finish"
                      : "Next"}
                  </span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Quiz Completed!
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              You scored {score} points
            </p>
            <Link
              href="/dashboard"
              className="px-6 py-3 bg-red-600 rounded-lg hover:bg-red-700
                transition-colors text-white font-medium"
            >
              Go Home
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
