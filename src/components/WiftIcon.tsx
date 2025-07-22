import { SvgIcon } from '@mui/material';
import type { SvgIconProps } from '@mui/material';

export default function WiftIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props} viewBox="0 0 24 24">
      {/* WIFT Logo with Filled Bottom and Right Angle Hash Marks */}
      <g fill="currentColor">
        {/* W shape outline */}
        <path
          d="M4 6V14C4 16.2091 5.79086 18 8 18L9.85 18"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
        />
        {/* Second U shape (moved right by 22%) */}
        <path
          d="M9.85 6V14C9.85 16.2091 11.6409 18 13.85 18C16.0591 18 17.85 16.2091 17.85 14V6"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
        />
        {/* Filled bottom area (50% narrower, centered) */}
        <rect
          x="7.128"
          y="17"
          width="7.344"
          height="2"
          fill="currentColor"
          rx="1"
        />
      </g>
    </SvgIcon>
  );
}
