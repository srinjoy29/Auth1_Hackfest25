import { OpenAI } from "openai";
import dotenv from "dotenv";

dotenv.config();

// 🧠 OpenAI configuration
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// 🎯 Generate Email Function
export const generateEmail = async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ message: "Prompt is required" });
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant that writes professional emails.",
        },
        { role: "user", content: prompt },
      ],
      temperature: 0.7,
    });

    const message = completion.choices[0].message.content;
    res.json({ message });
  } catch (err) {
    console.error("OpenAI error:", err.message);
    res.status(500).json({ message: "Failed to generate email" });
  }
};
