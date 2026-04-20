import React from "react";
import "../App.css";
import Leave from "./Leave";

function Navbar() {
  return (
    <>
      <div className="text-2xl flex bg-[#152D4E] h-[70px] flex items-center justify-between">
        <div className="flex items-center">
          <div className="w-[45px] h-[45px] border-white border flex items-center justify-center rounded-[15px] ml-[50px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
            >
              <path
                d="M21.3335 5.33341H24.0002C24.7074 5.33341 25.3857 5.61437 25.8858 6.11446C26.3859 6.61456 26.6668 7.29284 26.6668 8.00008V26.6667C26.6668 27.374 26.3859 28.0523 25.8858 28.5524C25.3857 29.0525 24.7074 29.3334 24.0002 29.3334H8.00016C7.29292 29.3334 6.61464 29.0525 6.11454 28.5524C5.61445 28.0523 5.3335 27.374 5.3335 26.6667V8.00008C5.3335 7.29284 5.61445 6.61456 6.11454 6.11446C6.61464 5.61437 7.29292 5.33341 8.00016 5.33341H10.6668M12.0002 2.66675H20.0002C20.7365 2.66675 21.3335 3.2637 21.3335 4.00008V6.66675C21.3335 7.40313 20.7365 8.00008 20.0002 8.00008H12.0002C11.2638 8.00008 10.6668 7.40313 10.6668 6.66675V4.00008C10.6668 3.2637 11.2638 2.66675 12.0002 2.66675Z"
                stroke="#F3F3F3"
                stroke-width="3"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
          <h2 className="text-white ml-4 font-semibold">
            Depression detection using EEG Signals
          </h2>
        </div>
        {/* {value && <Leave />} */}
      </div>
    </>
  );
}

export default Navbar;
