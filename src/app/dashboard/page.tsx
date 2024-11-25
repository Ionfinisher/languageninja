"use client";

import { useEffect, useState } from "react";
import CourseCard from "@/components/courseCard";
import { useUserData } from "@/hooks/useUserData";
import { Course } from "@/types";
import Image from "next/image";
import { getLocalStorage, setLocalStorage } from "@/lib/localStorage";
import Header from "@/components/header";
import Link from "next/link";
import { useRouter } from "next/navigation";

// interface Course {
//   id: number;
//   title: string;
//   description: string;
//   difficulty: "Beginner" | "Intermediate" | "Advanced";
// }

export default function Dashboard() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoadingList, setIsLoadingList] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [userid, setUserid] = useState(() => {
    // Initialize from localStorage if available
    if (typeof window !== "undefined") {
      return getLocalStorage("userid") || "";
    }
    return "";
  });

  const router = useRouter();
  const { id, loading: userDataLoading, error: userDataError } = useUserData();

  useEffect(() => {
    if (id) {
      setUserid(id);
      // Store in localStorage when id changes
      setLocalStorage("userid", id);
    }
  }, [id]);

  useEffect(() => {
    if (!userid) return;

    setIsLoadingList(true);
    fetch(`/api/courses?userid=${userid}`)
      .then((res) => res.json())
      .then((data) => {
        setCourses(data);
        setIsLoadingList(false);
      });
  }, [userid]);

  //   const [courses] = useState<Course[]>([
  //     {
  //       id: "course1",
  //       userid: "user123",
  //       title: "Introduction to JavaScript",
  //       content: "Learn the basics of JavaScript, the language of the web.",
  //       quizzes: [
  //         {
  //           question: "What does `typeof null` return in JavaScript?",
  //           options: ["'null'", "'object'", "'undefined'", "'number'"],
  //           correctAnswer: "'object'",
  //         },
  //         {
  //           question:
  //             "Which of these is a valid way to declare a variable in JavaScript?",
  //           options: [
  //             "let x = 10;",
  //             "var x = 10;",
  //             "const x = 10;",
  //             "All of the above",
  //           ],
  //           correctAnswer: "All of the above",
  //         },
  //       ],
  //     },
  //     {
  //       id: "course2",
  //       userid: "user456",
  //       title: "Advanced React Patterns",
  //       content:
  //         "Master advanced patterns in React, including hooks, context, and higher-order components.",
  //       quizzes: [
  //         {
  //           question: "What is the purpose of React's Context API?",
  //           options: [
  //             "To manage global state",
  //             "To pass data through the component tree without props",
  //             "To manage routing in React",
  //             "Both 'To manage global state' and 'To pass data through the component tree without props'",
  //           ],
  //           correctAnswer:
  //             "Both 'To manage global state' and 'To pass data through the component tree without props'",
  //         },
  //         {
  //           question:
  //             "What hook should you use for side effects in functional components?",
  //           options: ["useState", "useContext", "useEffect", "useReducer"],
  //           correctAnswer: "useEffect",
  //         },
  //       ],
  //     },
  //     {
  //       id: "course3",
  //       userid: "user789",
  //       title: "Introduction to Machine Learning",
  //       content:
  //         "This course covers the basics of machine learning, including supervised and unsupervised learning.",
  //       quizzes: [
  //         {
  //           question: "What is the main goal of supervised learning?",
  //           options: [
  //             "Clustering data",
  //             "Predicting labels based on input data",
  //             "Reducing dimensionality",
  //             "Generating random data",
  //           ],
  //           correctAnswer: "Predicting labels based on input data",
  //         },
  //         {
  //           question:
  //             "Which algorithm is commonly used for classification tasks?",
  //           options: [
  //             "Linear Regression",
  //             "K-Means Clustering",
  //             "Support Vector Machines",
  //             "Principal Component Analysis",
  //           ],
  //           correctAnswer: "Support Vector Machines",
  //         },
  //       ],
  //     },
  //   ]);

  //   const [courses] = useState<Course[]>([
  //     {
  //       title: "Basic Greetings",
  //       content:
  //         "Master essential greetings and introductions in your target language.",

  //     },
  //     {
  //       id: 2,
  //       title: "Daily Conversations",
  //       description:
  //         "Learn common phrases for everyday situations and small talk.",
  //       difficulty: "Beginner",
  //     },
  //     {
  //       id: 3,
  //       title: "Business Communication",
  //       description: "Professional vocabulary and formal language structures.",
  //       difficulty: "Intermediate",
  //     },
  //     {
  //       id: 4,
  //       title: "Cultural Idioms",
  //       description: "Understanding and using popular expressions and idioms.",
  //       difficulty: "Advanced",
  //     },
  //     {
  //       id: 5,
  //       title: "Advanced Grammar",
  //       description: "Complex sentence structures and advanced grammar patterns.",
  //       difficulty: "Advanced",
  //     },
  //     {
  //       id: 6,
  //       title: "Casual Speech",
  //       description: "Informal language and slang used by native speakers.",
  //       difficulty: "Intermediate",
  //     },
  //   ]);

  const handleViewLesson = (courseid: string) => {
    console.log(`Viewing lesson ${courseid}`);
    router.push(`/lesson/${courseid}`);
  };

  const handleTakeQuiz = (courseid: string) => {
    console.log(`Taking quiz for lesson ${courseid}`);
    router.push(`/quiz/${courseid}`);
  };

  return (
    <>
      <Header type="logged" />
      <div className="min-h-screen bg-gray-900 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        {userDataLoading || isLoadingList ? (
          <div className="flex flex-col items-center justify-center min-h-screen">
            <Image
              className="rounded-full spin"
              src="/ninja-logo.png"
              alt="Loading..."
              width={100}
              height={100}
            />

            <p className="text-white mt-4 text-center">
              Loading your courses...
            </p>
          </div>
        ) : userDataError ? (
          <div className="text-red-500 flex items-center justify-center min-h-screen">
            <p className="text-center">
              Error loading user data. Please try again later.
            </p>
          </div>
        ) : courses.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-white min-h-screen">
            <p className="text-xl mb-4 text-center">
              You haven't created any courses yet
            </p>
            <Link
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              href="/create-course"
            >
              Let's create one!
            </Link>
          </div>
        ) : (
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-16 md:mb-12">
              <div className="flex flex-col gap-4 md:flex-row md:justify-between md:gap-0 justify-center items-center w-full">
                <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-700">
                  Your Courses
                </h1>
                <Link
                  href="/create-course"
                  className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                  Create new Course
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {courses.map((course) => (
                <CourseCard
                  key={course.id}
                  title={course.title}
                  onViewCourse={() => handleViewLesson(course.id || "")}
                  onTakeQuiz={() => handleTakeQuiz(course.id || "")}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
