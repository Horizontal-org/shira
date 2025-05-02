const LandscapeIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={25}
    height={25}
    fill="none"
    {...props}
  >
    <mask
      id="a"
      width={25}
      height={25}
      x={0}
      y={0}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: "alpha",
      }}
    >
      <path fill="#D9D9D9" d="M.7.346h24v24H.7z" />
    </mask>
    <g mask="url(#a)">
      <path
        fill="#268DA0"
        d="M7.7 17.346h10c.2 0 .35-.091.45-.275a.44.44 0 0 0-.05-.525l-2.75-3.675a.475.475 0 0 0-.4-.2c-.166 0-.3.067-.4.2l-2.6 3.475-1.85-2.475a.475.475 0 0 0-.4-.2c-.166 0-.3.067-.4.2l-2 2.675a.44.44 0 0 0-.05.525c.1.183.25.275.45.275Zm-2 4c-.55 0-1.02-.195-1.413-.587a1.928 1.928 0 0 1-.587-1.413v-14c0-.55.196-1.02.587-1.413A1.928 1.928 0 0 1 5.7 3.346h14c.55 0 1.021.196 1.413.587.392.392.587.863.587 1.413v14c0 .55-.195 1.021-.587 1.413a1.928 1.928 0 0 1-1.413.587h-14Z"
      />
    </g>
  </svg>
)
export default LandscapeIcon
