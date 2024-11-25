// src/types.ts
export interface Lesson {
  title: string;
  content: string;
}

export interface QuizItem {
  question: string;
  options?: string[];
  correctAnswer: string;
}

export interface Course {
  id?: string;
  userid: string;
  title: string;
  content: string;
  quizzes: QuizItem[];
}

export interface AgentConfig {
  model: string;
  temperature?: number;
  maxTokens: number;
  top_p?: number;
}
