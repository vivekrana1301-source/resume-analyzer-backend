export const analyzeResumeAI = async (
  resumeText: string,
  jobDesc: string
) => {
  try {
    const prompt = `
You are an ATS system.

Resume:
${resumeText}

Job Description:
${jobDesc}

Return ONLY JSON:
{
  "matchPercentage": 0,
  "skillsMatched": [],
  "skillsMissing": [],
  "learningRecommendations": [],
  "finalFeedback": ""
}
`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyAknpQJFm8NitYcdUQB936Ur9tJBoZNvas`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }]
            }
          ]
        })
      }
    );

    const data = await response.json();

    console.log("FULL RESPONSE:", data);

    if (!data?.candidates?.length) {
      throw new Error(data?.error?.message || "AI failed");
    }

    const text = data.candidates[0].content.parts[0].text;

    const clean = text.replace(/```json|```/g, "").trim();

    return JSON.parse(clean);

  } catch (error: any) {
    console.error("AI ERROR:", error.message);
    
    throw error;
  }
};