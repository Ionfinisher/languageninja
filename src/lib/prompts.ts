export const promptTemplates = {
  cultural: {
    analyze: `
        Analyze the cultural context for this scenario: {{scenario}}
        
        Consider:
        1. Social customs and etiquette
        2. Common phrases and expressions
        3. Cultural dos and don'ts
        4. Regional variations
        
        Format your response as JSON with the following structure:
        {
          "customs": [],
          "etiquette": [],
          "commonPhrases": [],
          "culturalNotes": []
        }
      `,
  },

  lesson: {
    generate: `
      Create a language learning lesson for:
      Scenario: {{scenario}}
      Cultural Context: {{culturalContext}}
      
      Include Key vocabulary, Essential phrases, Grammar points, Pronounciation of words, Cultural tips and insights.
      Make sure the content is string only of markdown, does not include any JSON structure and be a one line string with escaped new lines \\\n.

      Make sure to mention the cultural context and provide examples.

      Format your lesson as a JSON in the following structure:
      {"title": "", "content": ""}
  
      You are a JSON generator. 
      Only respond with JSON data strictly following the given example format. 
      Do not include explanations or additional text.
      Make sure to add starting and ending braces.
      Here is an example output:
      {"title":  "Crash course to impress the signorina (lady) and navigate the restaurant like a pro.", "content": "**In this lesson**, you will learn essential French phrases for the Olympics. You will learn how to greet people, ask for directions, and order food in French. You will also learn about the French culture and customs."}
  `,
  },

  quiz: {
    generate: `
        Create a quiz based on:
        Scenario: {{scenario}}
        Cultural Context: {{culturalContext}}
        lesson: {{lesson}}
        
        Generate a list of 10 questions including: Multiple choice, Translation exercises, Fill-in-the-blank and Pronunciation challenges.
        Make sure to always include options and the correct answers for each question.
        
        Format as JSON with:
        [{"question": "","options": [],"correctAnswer": ""}]

        You are a JSON generator. Only respond with JSON data strictly following the given example format. Do not include explanations or additional text. Here is an example output:
        [{"question": "What is the meaning of 'Bonjour' in English?","options": ["Hello", "Goodbye", "Thank you", "Please"],"correctAnswer": "Hello"}, {"question": "What is the meaning of 'Bonjour' in English?","options": ["Hello", "Goodbye", "Thank you", "Please"],"correctAnswer": "Hello"}]
        Respond only with valid JSON. Do not write an introduction or summary.
      `,
  },

  parser: {
    generate: `
        You are an expert data parser bot. Respond only with valid JSON. Do not write an introduction or summary.
        Parse the following data:
        {{data}} in the format of this typescript interface: {{format}}
      `,
  },
};
