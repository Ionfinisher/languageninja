import { NextResponse, NextRequest } from "next/server";
import { getCourseQuizzes } from "@/lib/firestore";

// GET: Retrieve a lesson for a specific user
export async function GET(req: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(req.url);
  const courseid = searchParams.get("courseid");

  if (!courseid) {
    return NextResponse.json(
      { error: "courseid is required" },
      { status: 400 }
    );
  }

  try {
    const quizzes = await getCourseQuizzes(courseid);
    return NextResponse.json(quizzes, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to retrieve quizzes" },
      { status: 500 }
    );
  }
}
