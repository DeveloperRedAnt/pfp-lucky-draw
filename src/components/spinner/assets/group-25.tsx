import svgPaths from "./svg-base";

export default function Group25() {
  return (
    <div className="relative size-full">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 41 35"
      >
        <g clipPath="url(#clip0_3_19)" id="Group 25">
          <g filter="url(#filter0_dd_3_19)" id="Vector 1">
            <path d={svgPaths.p2b7a3e80} fill="var(--fill-0, #009844)" />
          </g>
          <path
            d={svgPaths.p32004e00}
            fill="var(--fill-0, #0E6B37)"
            id="Vector 56"
          />
        </g>
        <defs>
          <filter
            colorInterpolationFilters="sRGB"
            filterUnits="userSpaceOnUse"
            height="47"
            id="filter0_dd_3_19"
            width="53"
            x="-6"
            y="-6"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              result="hardAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            />
            <feOffset dy="4" />
            <feGaussianBlur stdDeviation="2" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.3 0"
            />
            <feBlend
              in2="BackgroundImageFix"
              mode="normal"
              result="effect1_dropShadow_3_19"
            />
            <feColorMatrix
              in="SourceAlpha"
              result="hardAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            />
            <feMorphology
              in="SourceAlpha"
              operator="dilate"
              radius="6"
              result="effect2_dropShadow_3_19"
            />
            <feOffset dy="8" />
            <feGaussianBlur stdDeviation="6" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"
            />
            <feBlend
              in2="effect1_dropShadow_3_19"
              mode="normal"
              result="effect2_dropShadow_3_19"
            />
            <feBlend
              in="SourceGraphic"
              in2="effect2_dropShadow_3_19"
              mode="normal"
              result="shape"
            />
          </filter>
          <clipPath id="clip0_3_19">
            <rect fill="white" height="35" width="41" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}