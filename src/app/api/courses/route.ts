import { NextResponse, NextRequest } from "next/server";
import { getCourses } from "@/lib/firestore";

// GET: Retrieve all courses for a specific user
export async function GET(req: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(req.url);
  const userid = searchParams.get("userid");

  if (!userid) {
    return NextResponse.json({ error: "Userid is required" }, { status: 400 });
  }

  const courses = await getCourses(userid);
  return NextResponse.json(courses, { status: 200 });
}
