import React from "react";
import { useTimer } from "react-timer-hook";
import { TypeAnimation } from "react-type-animation";
import { useNavigate } from "react-router-dom";

function MyTimer({ expiryTimestamp, phase }) {
  var audio = new Audio("beep_audio.mp3");
  const navigate = useNavigate();
  const { seconds } = useTimer({
    expiryTimestamp,
    onExpire: () => {
      audio.play();
      if (phase === "Phase-1") navigate("/phase1");
      else if (phase === "Phase-2") navigate("/phase2");
    },
    autoStart: true,
  });
  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
  return (
    <div className="flex justify-center gap-6">
      <TypeAnimation
        cursor={false}
        speed={45}
        sequence={["Let's", 300, "Let's start", 300, `Let's start in `, 300]}
        style={{ fontSize: "7em", textAlign: "center" }}
      />
      <p className="text-[7rem]"> 0:{formattedSeconds}</p>
    </div>
  );
}

function Box1({ onNext, title }) {
  const time = new Date();
  time.setSeconds(time.getSeconds() + 10);
  return (
    <div className="flex place-content-center flex-col justify-center h-[600px]">
      <div>
        <p className="text-center text-4xl mb-2">
          Close your eyes and wait for a beep.
        </p>
        <p className="text-center text-2xl mb-6">Relax and Prepare</p>
      </div>
      <MyTimer expiryTimestamp={time} phase={title} />
    </div>
  );
}

export default Box1;
