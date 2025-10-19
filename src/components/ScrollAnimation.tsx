import React from "react";

const ScrollAnimation: React.FC = () => {
  const size = 40;
  const stroke = "#0F1537";
  const accent = "#00A58A";
  const strokeWidth = 8;
  const ariaLabel = "Scroll to explore";
  const durationSec = 1.6;
  
  const sizeValue = `${size}px`;
  const dur = `${durationSec}s`;
  const arrowStrokeWidth = strokeWidth * 0.8;

  return (
    <div
      role="img"
      aria-label={ariaLabel}
      style={{
        width: sizeValue,
        height: sizeValue,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "0 auto",
      }}
    >
      <style>{`
        @keyframes smi-up {
          0%   { transform: translateY(8%); opacity: 0; }
          15%  { opacity: 1; }
          85%  { opacity: 1; }
          100% { transform: translateY(-8%); opacity: 0; }
        }
        @keyframes smi-down {
          0%   { transform: translateY(-8%); opacity: 0; }
          15%  { opacity: 1; }
          85%  { opacity: 1; }
          100% { transform: translateY(8%); opacity: 0; }
        }
        @keyframes smi-wheel {
          0% { transform: translateY(0); }
          50% { transform: translateY(20px); }
          100% { transform: translateY(0); }
        }
        .smi-up   { animation: smi-up ${dur} ease-in-out infinite; }
        .smi-down { animation: smi-down ${dur} ease-in-out infinite; }
        .smi-wheel { animation: smi-wheel ${dur} ease-in-out infinite; }
      `}</style>

      <svg
        viewBox="0 0 400 400"
        width={sizeValue}
        height={sizeValue}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g className="smi-up" style={{ transformOrigin: "200px 48px" }}>
          <path
            d="M176 64 L200 40 L224 64"
            stroke={accent}
            strokeWidth={arrowStrokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>

        <g>
          <path
            d="M268 116c0-37.556-30.444-68-68-68s-68 30.444-68 68l-6 130c0 41.973 32.027 86 74 86s74-44.027 74-86l-6-130Z"
            stroke={stroke}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <line
            x1="200"
            y1="48"
            x2="200"
            y2="170"
            stroke={stroke}
            strokeWidth={strokeWidth * 0.75}
            strokeLinecap="round"
          />

          <path
            d="M132 168c17 12 46 18 68 18s51-6 68-18"
            stroke={stroke}
            strokeWidth={strokeWidth * 0.75}
            strokeLinecap="round"
          />

          <rect
            className="smi-wheel"
            x="184"
            y="108"
            width="32"
            height="56"
            rx="12"
            stroke={accent}
            strokeWidth={strokeWidth * 0.8}
          />
        </g>

        <g className="smi-down" style={{ transformOrigin: "200px 352px" }}>
          <path
            d="M176 336 L200 360 L224 336"
            stroke={accent}
            strokeWidth={arrowStrokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </svg>
    </div>
  );
};

export default ScrollAnimation;