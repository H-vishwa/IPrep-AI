import Session from "../models/Session.js";
import Question from "../models/Question.js";

// @desc    Add additional question to the existing session
// @route   POST /api/questions/add
// @access  Private

export const addQuestionstoSession = async (req, res) => {
  try {
    const { sessionId, questions } = req.body;

    if (!sessionId || !questions || !Array.isArray(questions)) {
      return res.status(400).json({ message: "Invalid Input data" });
    }

    const session = await Session.findById(sessionId);
    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    //Create ne questions
    const newQuestions = await Question.insertMany(
      questions.map((q) => ({
        session: sessionId,
        question: q.question,
        answer: q.answer,
      }))
    );

    //Update the session with new questions
    session.questions.push(...newQuestions.map((q) => q._id));
    await session.save();

    res.status(201).json(newQuestions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Pin or unpin a question
// @route   POST /api/questions/:id/pin
// @access  Private

export const togglePinQuestion = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);

    if (!question) {
      return res.status(400).json({ message: "Question not found" });
    }

    question.isPinned = !question.isPinned;
    await question.save();

    res.status(201).json({ success: true, question });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Update a note for question
// @route   POST /api/questions/:id/note
// @access  Private

export const updateQuestionNote = async (req, res) => {
  try {
    const {note} = req.body;
    const question = await Question.findById(req.params.id);

     if (!question) {
      return res.status(400).json({ message: "Question not found" });
    }

    question.note = note || "";
    await question.save();

    res.status(201).json({ success: true, question });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
