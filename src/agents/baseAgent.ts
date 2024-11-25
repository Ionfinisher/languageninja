import { AgentConfig } from "@/types";

export abstract class BaseAgent {
  protected client: any;
  protected config: AgentConfig;

  constructor(config: AgentConfig) {
    this.config = config;
  }

  protected async generateResponse(prompt: string): Promise<any> {
    const startTime = Date.now();

    try {
      const response = await this.client.chat.completions.create(
        this.config.model,
        prompt,
        this.config.temperature,
        this.config.maxTokens,
        this.config.top_p
      );

      return {
        content: response.content,
        metadata: {
          confidence: response.confidence || 1.0,
          processingTime: Date.now() - startTime,
          modelUsed: this.config.model,
        },
      };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";
      throw new Error(`Agent processing failed: ${errorMessage}`);
    }
  }

  abstract process(input: any): Promise<any>;
}
