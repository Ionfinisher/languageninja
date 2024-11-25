import { NextResponse, NextRequest } from "next/server";
import { NinjaAgent } from "@/agents/agent";
import { agentConfig } from "@/config/agentConfig";
import { Course } from "@/types";
import { saveCourse } from "@/lib/firestore";

export async function POST(request: NextRequest): Promise<NextResponse> {
  const { topic, userid } = await request.json();

  //   Make sure the 'topic' parameter is provided
  if (!topic || typeof topic !== "string") {
    return NextResponse.json(
      { error: "Missing or invalid 'topic' parameter" },
      { status: 400 }
    );
  }

  if (!userid || typeof userid !== "string") {
    return NextResponse.json(
      { error: "Missing or invalid 'userid' parameter" },
      { status: 400 }
    );
  }

  // Initialize the NinjaAgent with the required configurations
  const ninjaAgent = new NinjaAgent({
    cultural: {
      model: agentConfig.cultural.model,
      temperature: agentConfig.cultural.temperature,
      maxTokens: agentConfig.cultural.maxTokens,
      top_p: agentConfig.cultural.top_p,
    },
    lesson: {
      model: agentConfig.lesson.model,
      temperature: agentConfig.lesson.temperature,
      maxTokens: agentConfig.lesson.maxTokens,
      top_p: agentConfig.lesson.top_p,
    },
    quiz: {
      model: agentConfig.quiz.model,
      temperature: agentConfig.quiz.temperature,
      maxTokens: agentConfig.quiz.maxTokens,
      top_p: agentConfig.quiz.top_p,
    },
  });

  // Generate learning content for the provided topic
  const learningContent = await ninjaAgent.generateLearningContent(topic);

  // Parse the response into Course object
  const course = {
    userid: userid as string,
    title: learningContent.lesson.title,
    content: learningContent.lesson.content,
    quizzes: learningContent.quiz,
  } as Course;

  // Save the course to the database
  try {
    const courseid = await saveCourse(course);
    return NextResponse.json({ courseid: courseid }, { status: 200 });
  } catch (error) {
    console.error("Failed to save course:", error);
    return NextResponse.json(
      { error: "Failed to save course to database" },
      { status: 500 }
    );
  }
}
