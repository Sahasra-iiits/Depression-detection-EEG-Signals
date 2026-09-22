import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

function End() {
  const API_URL = import.meta.env.VITE_API_URL;
  const [phase1Correct, setPhase1Correct] = useState(0);
  const [phase1Wrong, setPhase1Wrong] = useState(0);
  const [phase2Correct, setPhase2Correct] = useState(0);
  const [phase2Wrong, setPhase2Wrong] = useState(0);
  const [phase1Unattempted, setPhase1Unattempted] = useState(0);
  const [phase2Unattempted, setPhase2Unattempted] = useState(0);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchResults() {
      try {
        const res = await axios.get(`${API_URL}/api/results`, {
          withCredentials: true,
        });

        setPhase1Correct(res.data.phase1Correct || 0);
        setPhase1Wrong(res.data.phase1Wrong || 0);
        setPhase1Unattempted(res.data.phase1Unattempted || 0);

        setPhase2Correct(res.data.phase2Correct || 0);
        setPhase2Wrong(res.data.phase2Wrong || 0);
        setPhase2Unattempted(res.data.phase2Unattempted || 0);
      } catch (err) {
        console.error("Failed to fetch results", err);
      } finally {
        setLoading(false);
      }
    }

    fetchResults();
  }, [loading]);

  const phase1Total = phase1Correct + phase1Wrong + phase1Unattempted;

  const phase2Total = phase2Correct + phase2Wrong + phase2Unattempted;

  const phase1Accuracy =
    phase1Total > 0 ? ((phase1Correct / phase1Total) * 100).toFixed(2) : 0;

  const phase2Accuracy =
    phase2Total > 0 ? ((phase2Correct / phase2Total) * 100).toFixed(2) : 0;

  if (loading) {
    return (
      <div className="flex flex-col h-screen p-[30px] items-center justify-center">
        <h2 className="text-[30px] font-semibold">Loading Results...</h2>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen p-[30px] items-center">
      <h2 className="text-[40px] font-semibold">Results</h2>
      <p className="text-[22px] mb-[20px] text-green-800">
        You have completed both phases of the assessment. Review your
        performance.
      </p>

      <div className="flex flex-row justify-between gap-8 p-[25px]">
        {/* Phase 1 */}

        <div className="flex flex-col items-center p-[25px] w-[450px]">
          <h3 className="text-6xl font-semibold mb-[20px]">Phase 1</h3>

          <p className="text-[20px]">
            Correct:
            <span className="font-bold ml-[10px]">{phase1Correct}</span>
          </p>

          <p className="text-[20px] mt-[10px]">
            Wrong:
            <span className="font-bold ml-[10px]">{phase1Wrong}</span>
          </p>
          <p className="text-[20px] mt-[10px]">
            Unattempted:
            <span className="font-bold ml-[10px]">{phase1Unattempted}</span>
          </p>

          <p className="text-[20px] mt-[10px]">
            Accuracy:
            <span className="font-bold ml-[10px]">{phase1Accuracy}%</span>
          </p>
        </div>

        <div className="border-1"></div>

        {/* Phase 2 */}

        <div className="flex flex-col items-center p-[25px] w-[450px]">
          <h3 className="text-6xl font-semibold mb-[20px]">Phase 2</h3>

          <p className="text-[20px]">
            Correct:
            <span className="font-bold ml-[10px]">{phase2Correct}</span>
          </p>

          <p className="text-[20px] mt-[10px]">
            Wrong:
            <span className="font-bold ml-[10px]">{phase2Wrong}</span>
          </p>

          <p className="text-[20px] mt-[10px]">
            Unattempted:
            <span className="font-bold ml-[10px]">{phase2Unattempted}</span>
          </p>

          <p className="text-[20px] mt-[10px]">
            Accuracy:
            <span className="font-bold ml-[10px]">{phase2Accuracy}%</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default End;
