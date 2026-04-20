import React, { useEffect } from "react";
import { TypeAnimation } from "react-type-animation";
import { useNavigate } from "react-router-dom";

function NextPhase() {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/next");
    }, 5000);
  }, []);
  return (
    <div className="flex justify-center items-center h-[600px]">
      <TypeAnimation
        cursor={false}
        speed={5}
        sequence={["Phase-1 Completed..."]}
        style={{ fontSize: "5rem" }}
      />
    </div>
  );
}

export default NextPhase;
