import OpenAI from "openai";

const client = new OpenAI({
  baseURL: process.env.BASE_URL,
  apiKey: process.env.SAMBANOVA_API_KEY,
});

export default client;
