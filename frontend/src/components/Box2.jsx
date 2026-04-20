import React from "react";
import { TypeAnimation } from "react-type-animation";
import { useNavigate } from "react-router-dom";

function Box2({ title }) {
  const navigate = useNavigate();
  const final_path = title === "Phase-1" ? "phase1" : "phase2";
  return (
    <div className="flex items-center flex-col justify-center h-[600px] gap-4">
      <TypeAnimation
        cursor={false}
        speed={2}
        sequence={[`${title}`]}
        style={{ fontSize: "7rem", textAlign: "center" }}
      />
      <button
        onClick={() => navigate(`/${final_path}/questions`)}
        className="border-black border-2 w-[120px] h-[40px] flex justify-center items-center rounded-[10px] mb-[20px] hover:bg-black hover:text-white cursor-pointer"
      >
        Click to Start
      </button>
      <div className="bg-[#D9D9D9] h-[150px] w-[900px] p-4 text-lg rounded-[10px] shadow-md">
        <h1 className="mb-[5px] font-semibold">Instructions:</h1>
        <p>1. Questions appear as you answer current question.</p>
        <p>2. Place your fingers on keyboard as shown in the image</p>
        <p>
          3. While answering the questions, Click 1 to select Option A, 2 to
          select Option B and 3 to select Option C
        </p>
      </div>
      <div className="w-[400px] h-[200px] fixed top-[150px] right-[100px]">
        <img src="ins.jpeg" alt="" />
      </div>
    </div>
  );
}

export default Box2;
