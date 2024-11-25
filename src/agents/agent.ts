import OpenAI from "openai";
import client from "@/lib/sambanovaClient";
import { promptTemplates } from "@/lib/prompts";
import { AgentConfig, QuizItem, Lesson } from "@/types";

export class NinjaAgent {
  private client: OpenAI;
  private culturalConfig: AgentConfig;
  private lessonConfig: AgentConfig;
  private quizConfig: AgentConfig;

  constructor(configs: {
    cultural: AgentConfig;
    lesson: AgentConfig;
    quiz: AgentConfig;
  }) {
    this.client = client;
    this.culturalConfig = configs.cultural;
    this.lessonConfig = configs.lesson;
    this.quizConfig = configs.quiz;
  }

  async generateLearningContent(scenario: string) {
    // Generate lesson context and quiz
    try {
      const culturalContext = await this.analyzeCulturalContext(scenario);
      const lesson = await this.generateLesson(scenario, culturalContext);
      const quiz = await this.generateQuiz(
        scenario,
        culturalContext,
        `${lesson.title} \n ${lesson.content}`
      );

      return {
        lesson,
        quiz,
      };
    } catch (error) {
      console.error("Error generating learning content:", error);
      throw error;
    }
  }

  private async analyzeCulturalContext(scenario: string): Promise<string> {
    try {
      const response = await this.client.chat.completions.create({
        model: this.culturalConfig.model,
        temperature: this.culturalConfig.temperature,
        max_tokens: this.culturalConfig.maxTokens,
        top_p: this.culturalConfig.top_p,
        messages: [
          {
            role: "system",
            content: promptTemplates.cultural.analyze.replace(
              "{{scenario}}",
              scenario
            ),
          },
        ],
      });

      return this.extractContent(response, "analyze cultural context");
    } catch (error) {
      console.error("Cultural analysis failed:", error);
      throw error;
    }
  }

  private async generateLesson(
    scenario: string,
    culturalContext: string
  ): Promise<Lesson> {
    try {
      const response = await this.client.chat.completions.create({
        model: this.lessonConfig.model,
        temperature: this.lessonConfig.temperature,
        max_tokens: this.lessonConfig.maxTokens,
        top_p: this.lessonConfig.top_p,
        messages: [
          {
            role: "system",
            content: promptTemplates.lesson.generate
              .replace("{{scenario}}", scenario)
              .replace("{{culturalContext}}", culturalContext),
          },
        ],
      });

      const content = this.extractContent(response, "generate lesson content");
      console.log(content);
      return JSON.parse(content) as Lesson;
    } catch (error) {
      console.error("Lesson Gen failed:", error);
      throw error;
    }
  }

  private async generateQuiz(
    scenario: string,
    culturalContext: string,
    lesson: string
  ): Promise<QuizItem[]> {
    try {
      const response = await this.client.chat.completions.create({
        model: this.quizConfig.model,
        temperature: this.quizConfig.temperature,
        max_tokens: this.quizConfig.maxTokens,
        top_p: this.quizConfig.top_p,
        messages: [
          {
            role: "system",
            content: promptTemplates.quiz.generate
              .replace("{{scenario}}", scenario)
              .replace("{{culturalContext}}", culturalContext)
              .replace("{{lesson}}", lesson),
          },
        ],
      });

      const content = this.extractContent(response, "generate quiz");
      console.log(content);
      return JSON.parse(content) as QuizItem[];
    } catch (error) {
      console.error("Quiz Gen failed:", error);
      throw error;
    }
  }

  private extractContent(
    response: OpenAI.Chat.Completions.ChatCompletion,
    operation: string
  ): string {
    const content = response.choices[0].message.content;
    if (!content) {
      throw new Error(`Failed to ${operation} with the error: ${response}`);
    }
    return content;
  }
}
