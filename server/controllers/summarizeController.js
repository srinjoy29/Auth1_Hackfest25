import { OpenAI } from "openai";
import dotenv from "dotenv";

dotenv.config();

// 🧠 OpenAI configuration
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// ✨ Summarize Email Function
export const summarizeEmail = async (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ message: "Text is required for summarization." });
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are an assistant that summarizes emails clearly and concisely.",
        },
        {
          role: "user",
          content: `Summarize this email:\n\n${text}`,
        },
      ],
      max_tokens: 150,
      temperature: 0.7,
    });

    const summary = completion.choices[0].message.content.trim();
    res.json({ summary });
  } catch (err) {
    console.error("OpenAI error:", err.message);
    res.status(500).json({ message: "Failed to summarize email" });
  }
};
