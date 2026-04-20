import React from "react";

function Option({ option, value, selected, showAnswer, correctAnswer }) {
  let bg = "";

  if (showAnswer) {
    if (value === correctAnswer) {
      bg = "bg-green-400";
    } else if (selected) {
      bg = "bg-red-400";
    }
  }
  return (
    <div
      className={`flex flex-row h-[100px] w-[1000px] p-[25px] text-[25px] gap-4 ${bg}`}
    >
      <div className="flex justify-center items-center bg-[#152D4E] h-[50px] w-[60px] text-white">
        {option}
      </div>
      <div>
        <p>{value}</p>
      </div>
    </div>
  );
}

export default Option;
