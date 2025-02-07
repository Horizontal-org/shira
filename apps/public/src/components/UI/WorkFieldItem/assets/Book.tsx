import React from "react";

function Icon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="40"
      height="40"
      fill="none"
      viewBox="0 0 40 40"
    >
      <path
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M3.333 5h10A6.667 6.667 0 0120 11.667V35a5 5 0 00-5-5H3.333V5z"
      ></path>
      <path
        stroke="#111"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M36.667 5h-10A6.667 6.667 0 0020 11.667V35a5 5 0 015-5h11.667V5z"
      ></path>
    </svg>
  );
}

export default Icon;
