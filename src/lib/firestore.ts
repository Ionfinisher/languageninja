import { db } from "@/config/firebaseConfig";
import { collection, addDoc, getDocs, getDoc, doc } from "firebase/firestore";
import { Course, QuizItem, Lesson } from "@/types";

export const saveCourse = async (course: Course) => {
  try {
    const courseRef = await addDoc(collection(db, "courses"), course);
    return courseRef.id;
  } catch (error) {
    console.error("Error saving course:", error);
    throw new Error("Failed to save course.");
  }
};

export const getCourses = async (userid: string) => {
  try {
    const coursesCollection = collection(db, "courses");
    const querySnapshot = await getDocs(coursesCollection);
    // Filter courses by userId after fetching
    return querySnapshot.docs
      .map(
        (doc) =>
          ({
            id: doc.id,
            ...doc.data(),
          } as Course)
      )
      .filter((course) => course.userid === userid);
  } catch (error) {
    console.error("Error fetching courses:", error);
    throw new Error("Failed to fetch courses.");
  }
};

export const getCourseById = async (
  courseid: string
): Promise<Course | null> => {
  try {
    const courseDoc = doc(db, "courses", courseid);
    const courseSnapshot = await getDoc(courseDoc);

    if (!courseSnapshot.exists()) {
      return null;
    }

    return {
      id: courseSnapshot.id,
      ...courseSnapshot.data(),
    } as Course;
  } catch (error) {
    console.error("Error fetching course:", error);
    throw new Error("Failed to fetch course");
  }
};

export const getCourseQuizzes = async (
  courseid: string
): Promise<{
  title: string;
  quizzes: QuizItem[];
} | null> => {
  const course = await getCourseById(courseid);
  if (!course) return null;

  return {
    title: course.title,
    quizzes: course.quizzes,
  };
};

export const getCourseLesson = async (
  courseid: string
): Promise<Lesson | null> => {
  const course = await getCourseById(courseid);
  if (!course) return null;

  return {
    title: course.title,
    content: course.content,
  };
};
