import dotenv from "dotenv";
dotenv.config();
import { GoogleGenAI } from "@google/genai";
import {
  conceptExplainPrompt,
  questionAnswerPrompt,
} from "../utils/prompts.js";

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_AI_API_KEY });

// @desc    Generate interview questions using gemini
// @route   POST /api/ai/generate-questions
// @access  Private

export const generateInterviewquestions = async (req, res) => {
  try {
    const { role, experience, topicsToFocus, numberOfQuestions } = req.body;

    if (!role || !experience || !topicsToFocus || !numberOfQuestions) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const prompt = questionAnswerPrompt(
      role,
      experience,
      topicsToFocus,
      numberOfQuestions
    );

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-lite",
      contents: prompt,
    });

    let rawText = response.text;

    const cleanedText = rawText
      .replace(/^```json\s*/, "")
      .replace(/```$/, " ")
      .trim();

    const data = JSON.parse(cleanedText);
    res.status(200).json(data);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to generate questions", error: error.message });
  }
};

// @desc    Generate explains a interview questions using gemini
// @route   POST /api/ai/generate-explanation
// @access  Private

export const generateConceptExplanation = async (req, res) => {
  try {
    const {question} = req.body;

    if(!question) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const prompt = conceptExplainPrompt(question);

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-lite",
      contents: prompt,
    });

    let rawText = response.text;

    const cleanedText = rawText
      .replace(/^```json\s*/, "")
      .replace(/```$/, " ")
      .trim();

    const data = JSON.parse(cleanedText);
    res.status(200).json(data);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to generate questions", error: error.message });
  }
};
