const userResponses = require("../models/userResponses");

async function recordResponse(req, res) {
  const id = req.cookies?.uid;
  const { Q_id, isCorrect, phase_no, status, responseTime } = req.body;
  await userResponses.create({
    user: id,
    Q_id: Q_id,
    isCorrect: isCorrect,
    phase: phase_no,
    status: status,
    responseTime: responseTime,
  });
}

async function getResults(req, res) {
  try {
    const id = req.cookies?.uid;

    const responses = await userResponses.find({
      user: id,
    });

    let phase1Correct = 0;
    let phase1Wrong = 0;
    let phase1Unattempted = 0;

    let phase2Correct = 0;
    let phase2Wrong = 0;
    let phase2Unattempted = 0;

    responses.forEach((r) => {
      if (r.phase === "1") {
        if (r.status === "unattempted") {
          phase1Unattempted++;
        } else if (r.isCorrect) {
          phase1Correct++;
        } else {
          phase1Wrong++;
        }
      }

      if (r.phase === "2") {
        if (r.status === "unattempted") {
          phase2Unattempted++;
        } else if (r.isCorrect) {
          phase2Correct++;
        } else {
          phase2Wrong++;
        }
      }
    });

    res.json({
      phase1Correct,
      phase1Wrong,
      phase1Unattempted,

      phase2Correct,
      phase2Wrong,
      phase2Unattempted,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch results",
    });
  }
}

module.exports = {
  recordResponse,
  getResults,
};
