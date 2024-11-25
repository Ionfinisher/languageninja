export const agentConfig = {
  cultural: {
    model: "Meta-Llama-3.2-1B-Instruct",
    temperature: 0.6,
    maxTokens: 1000,
    top_p: 0.9,
  },

  lesson: {
    model: "Meta-Llama-3.1-70B-Instruct",
    temperature: 0.7,
    maxTokens: 2000,
    top_p: 0.9,
  },

  quiz: {
    model: "Meta-Llama-3.1-70B-Instruct",
    temperature: 0.6,
    maxTokens: 2500,
    top_p: 0.95,
  },

  parser: {
    model: "Meta-Llama-3.2-1B-Instruct",
    maxTokens: 2000,
  },
};
