import { NextResponse, NextRequest } from "next/server";
import { getCourseLesson } from "@/lib/firestore";

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

  const lesson = await getCourseLesson(courseid);
  return NextResponse.json(lesson, { status: 200 });
}
