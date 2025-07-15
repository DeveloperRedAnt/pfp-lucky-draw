import svgPaths from "./svg-base";

export default function Group23() {
  return (
    <div className="relative size-full">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 42 42"
      >
        <g clipPath="url(#clip0_3_250)" id="Group 23">
          <circle
            cx="20.715"
            cy="20.715"
            fill="var(--fill-0, white)"
            id="Ellipse 18"
            r="20.215"
            stroke="var(--stroke-0, #505050)"
          />
          <g clipPath="url(#clip1_3_250)" id="Frame">
            <path
              clipRule="evenodd"
              d={svgPaths.p22999ec0}
              fill="var(--fill-0, white)"
              fillRule="evenodd"
              id="Vector"
            />
            <path
              clipRule="evenodd"
              d={svgPaths.p3b178d80}
              fill="var(--fill-0, #009844)"
              fillRule="evenodd"
              id="Vector_2"
            />
            <path
              clipRule="evenodd"
              d={svgPaths.p32f5af80}
              fill="var(--fill-0, #4AB034)"
              fillRule="evenodd"
              id="Vector_3"
            />
            <path
              d={svgPaths.p21a0dc00}
              fill="var(--fill-0, #595857)"
              id="Vector_4"
            />
            <path
              d={svgPaths.p138d5b70}
              fill="var(--fill-0, #231916)"
              id="Vector_5"
            />
            <path
              d={svgPaths.p246acb80}
              fill="var(--fill-0, #231916)"
              id="Vector_6"
            />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_3_250">
            <rect fill="white" height="41.43" width="41.43" />
          </clipPath>
          <clipPath id="clip1_3_250">
            <rect
              fill="white"
              height="27.62"
              transform="translate(6.905 6.905)"
              width="27.62"
            />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}