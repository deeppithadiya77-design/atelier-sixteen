import React from 'react';
import { motion } from 'framer-motion';
import { EDITORIAL_EASE } from '../utils/motion';

/**
 * 15 active cells in a 4x4 grid; index 10 (row 3, col 3 — 11th square)
 * is intentionally omitted to represent architectural negative space.
 */
const GRID_CELLS = Array.from({ length: 16 }, (_, index) => {
  const row = Math.floor(index / 4);
  const col = index % 4;
  return {
    index,
    row,
    col,
    isVoid: row === 2 && col === 2, // 11th square (row 3, col 3)
  };
});

export function LogoGridMark({
  size = 36,
  tone = 'dark',
  animated = false,
  className = '',
}) {
  const fill = tone === 'light' ? '#F6F4F0' : '#141414';
  const cellSize = 6.5;
  const gap = 2.5;
  // Total viewBox: 4*6.5 + 3*2.5 = 26 + 7.5 = 33.5
  const viewBoxSize = 33.5;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {GRID_CELLS.map(({ index, row, col, isVoid }) => {
        if (isVoid) return null;
        const x = col * (cellSize + gap);
        const y = row * (cellSize + gap);

        if (animated) {
          return (
            <motion.rect
              key={index}
              x={x}
              y={y}
              width={cellSize}
              height={cellSize}
              rx={1.35}
              fill={fill}
              initial={{ opacity: 0, scale: 0.45 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.42,
                delay: 0.038 * (row + col * 0.85),
                ease: EDITORIAL_EASE,
              }}
              style={{ transformOrigin: `${x + cellSize / 2}px ${y + cellSize / 2}px` }}
            />
          );
        }

        return (
          <rect
            key={index}
            x={x}
            y={y}
            width={cellSize}
            height={cellSize}
            rx={1.35}
            fill={fill}
          />
        );
      })}
    </svg>
  );
}

export default function AtelierLogo({
  tone = 'dark',
  size = 34,
  showTagline = true,
  className = '',
}) {
  const textColor = tone === 'light' ? 'text-[#F6F4F0]' : 'text-[#141414]';
  const subTextColor =
    tone === 'light' ? 'text-[#F6F4F0]/75' : 'text-[#7A7267]';

  return (
    <div className={`inline-flex items-center gap-3.5 ${className}`}>
      <LogoGridMark size={size} tone={tone} className="shrink-0 transition-colors duration-500" />
      <div className="flex flex-col leading-none text-left">
        <span
          className={`font-sans text-[11px] sm:text-xs font-medium tracking-[0.28em] uppercase transition-colors duration-500 ${textColor}`}
        >
          ATELIER SIXTEEN
        </span>
        {showTagline && (
          <span
            className={`mt-1.5 font-sans text-[8.5px] sm:text-[9px] font-normal tracking-[0.22em] uppercase transition-colors duration-500 ${subTextColor}`}
          >
            INTERIOR | ARCHITECTURE | LANDSCAPE
          </span>
        )}
      </div>
    </div>
  );
}
