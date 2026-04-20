import React from "react";

function Leave() {
  return (
    <div className="p-[5px] flex items-center justify-center mr-[30px]">
      <div className="mr-[10px] border border-white rounded-3xl p-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="35"
          height="35"
          viewBox="0 0 40 40"
          fill="none"
        >
          <path
            d="M25 5H31.6667C32.5507 5 33.3986 5.35119 34.0237 5.97631C34.6488 6.60143 35 7.44928 35 8.33333V31.6667C35 32.5507 34.6488 33.3986 34.0237 34.0237C33.3986 34.6488 32.5507 35 31.6667 35H25M13.3333 11.6667L5 20M5 20L13.3333 28.3333M5 20H25"
            stroke="#F5F5F5"
            stroke-width="4"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
      <p className="text-white text-[20px]">Save and Leave</p>
    </div>
  );
}

export default Leave;
