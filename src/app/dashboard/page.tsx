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
