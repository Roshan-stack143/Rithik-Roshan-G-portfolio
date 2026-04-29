import { GoogleGenAI, Type } from "@google/genai";

export async function generateProfileFromResume(resumeText: string, linkedinUrl?: string, githubUrl?: string) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn("No GEMINI_API_KEY found, returning mock data");
    throw new Error("Missing API Key");
  }

  const ai = new GoogleGenAI({ apiKey });

  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-pro',
        contents: `I have uploaded my resume text and some links. Please generate a highly professional, cinematic personal portfolio profile based on this data. Make the tone sound like an epic, accomplished professional journey. Extract technical skills and group them into logical categories. Describe past experiences as 'projects' or 'milestones'.

Resume Text:
${resumeText}

LinkedIn: ${linkedinUrl}
GitHub: ${githubUrl}
`,
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    about: { type: Type.STRING, description: "A cinematic, travel-inspired professional summary paragraph. About 3-4 sentences." },
                    skills: {
                        type: Type.ARRAY,
                        description: "List of skill categories",
                        items: {
                           type: Type.OBJECT,
                           properties: {
                               name: { type: Type.STRING, description: "Category name, e.g. AI & ML, Web Development" },
                               skills: { type: Type.ARRAY, items: { type: Type.STRING }, description: "List of specific technologies" }
                           }
                        }
                    }
                }
            }
        }
    });

    if (response.text) {
        return JSON.parse(response.text);
    }
    return null;
  } catch (error) {
    console.error("Failed to generate AI profile:", error);
    throw error;
  }
}

export async function enhanceText(text: string, style: 'cinematic' | 'professional' | 'concise' = 'cinematic'): Promise<string> {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) return text;
    
    const ai = new GoogleGenAI({ apiKey });
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash', // Faster for simple text transforms
            contents: `Rewrite the following text to sound more ${style}. 
            
            Original text:
            ${text}
            
            Return ONLY the rewritten text, with no markdown formatting around it.`
        });
        return response.text || text;
    } catch(err) {
        return text;
    }
}
