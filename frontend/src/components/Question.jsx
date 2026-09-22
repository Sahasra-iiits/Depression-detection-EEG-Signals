import React from "react";
import Option from "./Option";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { feedbacks } from "../data/feedbacks";

function Question({ phase }) {
  const WORLD_AVG = 62;
  const API_URL = import.meta.env.VITE_API_URL;

  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [unattemptedCount, setUnattemptedCount] = useState(0);
  const totalAnswered = correctCount + wrongCount + unattemptedCount;
  const [userAccuracy, setUserAccuracy] = useState(0);
  const isAhead = userAccuracy >= WORLD_AVG;

  useEffect(() => {
    const totalAnswered = correctCount + wrongCount + unattemptedCount;
    if (totalAnswered === 0) {
      setUserAccuracy(0);
      return;
    }
    const accuracy = Math.round((correctCount / totalAnswered) * 100);
    setUserAccuracy(accuracy);
  }, [correctCount, wrongCount, unattemptedCount]);

  const [index, setIndex] = useState(0);
  const [questions, setQuestions] = useState([]);
  const navigate = useNavigate();
  const timerRef = useRef(null);
  const startTimeRef = useRef(null);
  const lastFeedbackIndexRef = useRef(null);

  const [timeLeft, setTimeLeft] = useState(0);

  const [selected, setSelected] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);

  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    if (questions.length === 0) return;
    const currentQuestion = questions[index];
    setTimeLeft(currentQuestion.timer);

    startTimeRef.current = Date.now();
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          handleTimeout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [index, questions]);

  useEffect(() => {
    if (!phase) return;

    fetch(`${API_URL}/api/questions?phase=${phase}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched questions:", data);
        setQuestions(data);
      })
      .catch((err) => console.log(err));
  }, [phase]);

  // keyboard selection
  useEffect(() => {
    function handleKey(e) {
      if (showAnswer) return;

      if (e.key === "1") selectOption(0);
      if (e.key === "2") selectOption(1);
      if (e.key === "3") selectOption(2);
    }

    window.addEventListener("keydown", handleKey);

    return () => {
      window.removeEventListener("keydown", handleKey);
    };
  }, [index, showAnswer, questions]);

  function getResponseTime() {
    const endTime = Date.now();
    const seconds = Math.floor((endTime - startTimeRef.current) / 1000);
    return seconds;
  }
  function handleTimeout() {
    const currentQuestion = questions[index];
    const responseTime = getResponseTime();
    setFeedback(getRandomFeedback(phase, false));
    setUnattemptedCount((prev) => prev + 1);

    try {
      axios.post(
        `${API_URL}/api/userResponse`,
        {
          Q_id: currentQuestion.Q_id,
          selectedOption: null,
          isCorrect: false,
          phase_no: phase,
          status: "unattempted",
          responseTime: responseTime,
        },
        {
          withCredentials: true,
        },
      );
    } catch (error) {
      console.error("Failed to save timeout:", error);
    }
    let nextQues = 2000;
    if (phase === "1") nextQues = 2000;
    else if (phase === "2") nextQues = 3000;
    setTimeout(() => {
      moveToNextQuestion();
    }, nextQues);
  }

  function selectOption(optionIndex) {
    clearInterval(timerRef.current);
    const responseTime = getResponseTime();

    const currentQuestion = questions[index];
    const correctAnswer = currentQuestion.correctOption;
    const selectedValue = currentQuestion.options[optionIndex];

    let correctFlag;
    setSelected(optionIndex);
    setShowAnswer(true);

    if (selectedValue === correctAnswer) {
      setIsCorrect(true);
      correctFlag = true;

      setCorrectCount((prev) => prev + 1);
    } else {
      setIsCorrect(false);
      correctFlag = false;

      setWrongCount((prev) => prev + 1);
    }
    setFeedback(getRandomFeedback(phase, correctFlag));

    try {
      axios.post(
        `${API_URL}/api/userResponse`,
        {
          Q_id: currentQuestion.Q_id,
          selectedOption: selectedValue,
          isCorrect: correctFlag,
          phase_no: phase,
          status: "attempted",
          responseTime: responseTime,
        },
        {
          withCredentials: true,
        },
      );
    } catch (error) {
      console.error("Failed to save response:", error);
    }

    setTimeout(() => {
      setSelected(null);
      setShowAnswer(false);
      setIsCorrect(null);

      moveToNextQuestion();
    }, 3000);
  }

  function moveToNextQuestion() {
    setFeedback(null);
    if (index < questions.length - 1) {
      setIndex((prev) => prev + 1);
    } else {
      if (phase === "1") navigate("/next_phase");
      else if (phase === "2") navigate("/end");
    }
  }

  if (questions.length === 0) {
    return <div>Loading...</div>;
  }

  function getRandomFeedback(phase, isCorrect) {
    let list;
    if (phase === "1" && isCorrect) list = feedbacks.phase1Correct;
    else if (phase === "1" && !isCorrect) list = feedbacks.phase1Wrong;
    else if (phase === "2" && isCorrect) list = feedbacks.phase2Correct;
    else list = feedbacks.phase2Wrong;
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * list.length);
    } while (randomIndex === lastFeedbackIndexRef.current);

    lastFeedbackIndexRef.current = randomIndex;
    return list[randomIndex];
  }

  return (
    <div className="flex items-center flex-row justify-between h-[650px] gap-4 items-center">
      <div className="flex items-center flex-col justify-center h-[600px] gap-6  ml-[25px] ">
        <div className="w-[1000px] h-[50px] bg-gray-200 rounded-[25px] relative overflow-hidden">
          <div
            className="h-full transition-all duration-500"
            style={{
              width: `${Math.max(userAccuracy, 2)}%`,
              background: isAhead
                ? "linear-gradient(to right, #facc15, #16a34a)"
                : "linear-gradient(to right, #facc15, #dc2626)",
            }}
          />
          <div
            className="absolute top-0 bottom-0 w-[3px] bg-black"
            style={{
              left: `${WORLD_AVG}%`,
            }}
          />
          <div className="absolute inset-0 flex justify-center items-center font-semibold text-black">
            You: {userAccuracy}%{" | "}
            World Avg: {WORLD_AVG}%
          </div>
        </div>
        <div className="h-[550px] w-[1100px] border-black border-2 p-[30px]">
          <div className="flex justify-between items-center">
            <div className="flex gap-4">
              <p className="p-[3px] border-black border rounded-[5px] w-[100px] h-[25px] flex justify-center items-center">
                Question {index + 1}
              </p>

              <p className="p-[3px] border-black border rounded-[5px] w-[70px] h-[25px] flex justify-center items-center capitalize">
                {questions[index].difficultyLevel}
              </p>
            </div>
            <div>
              <p className=" text-4xl font-semibold border border-black p-[10px] rounded-[5px] w-[120px] h-[55px] flex justify-center items-center">
                {timeLeft}
                <span className="text-[15px] font-thin"> seconds left</span>
              </p>
            </div>
          </div>

          <div>
            <p className="text-[28px] m-[15px]">{questions[index].question}</p>
          </div>

          <div>
            <Option
              option={"A"}
              value={questions[index].options[0]}
              selected={selected === 0}
              showAnswer={showAnswer}
              correctAnswer={questions[index].correctOption}
            />

            <Option
              option={"B"}
              value={questions[index].options[1]}
              selected={selected === 1}
              showAnswer={showAnswer}
              correctAnswer={questions[index].correctOption}
            />

            <Option
              option={"C"}
              value={questions[index].options[2]}
              selected={selected === 2}
              showAnswer={showAnswer}
              correctAnswer={questions[index].correctOption}
            />
          </div>
        </div>
      </div>

      {/* RIGHT PANEL MESSAGE */}
      <div className="h-[600px] w-[400px] bg-gradient-to-b from-[#B44242] to-[#152D4E] mt-[15px] mr-[15px] p-[20px] text-white text-[30px] flex flex-col justify-center">
        {showAnswer && feedback && (
          <>
            <p>{feedback.message}</p>
            <br />
            <p className="text-[22px] opacity-90">{feedback.stat}</p>
          </>
        )}
      </div>
    </div>
  );
}

export default Question;
