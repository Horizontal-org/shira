import React from "react";

function Icon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
    >
      <rect width="24" height="23" y="0.5" fill="#D93025" rx="11.5"></rect>
      <path
        stroke="#D93025"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M12 21.583c5.523 0 10-4.29 10-9.584 0-5.292-4.477-9.583-10-9.583S2 6.706 2 11.999s4.477 9.584 10 9.584z"
      ></path>
      <path
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M15 9.125l-6 5.75M9 9.125l6 5.75"
      ></path>
    </svg>
  );
}

export default Icon;
