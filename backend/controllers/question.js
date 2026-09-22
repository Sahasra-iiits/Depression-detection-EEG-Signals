const Question = require("../models/question");

async function displayQuestion(req, res) {
  try {
    const phase = req.query.phase || req.body?.phase;
    let matchCondition = {};

    if (phase === "1" || phase === "Phase-1") {
      // Phase 1 → Q_no 1 to 30
      matchCondition = {
        Q_id: { $gte: 1, $lte: 30 },
      };
    } else if (phase === "2" || phase === "Phase-2") {
      // Phase 2 → Q_no 31 to 60
      matchCondition = {
        Q_id: { $gte: 31, $lte: 60 },
      };
    } else {
      return res.status(400).json({
        message: "Invalid phase. Use phase 1 or 2",
      });
    }
    const questions = await Question.aggregate([
      { $match: matchCondition },
      { $sample: { size: 20 } },
    ]);

    res.json(questions);
  } catch (error) {
    console.error("FETCH ERROR:", error);

    res.status(500).json({
      message: "Error fetching questions",
      error: error.message,
    });
  }
}

module.exports = displayQuestion;
