import { SvgIcon } from '@mui/material';
import type { SvgIconProps } from '@mui/material';

// Custom SVG icons with a hand-drawn, gentle aesthetic

export const FullSeatingIcon = (props: SvgIconProps) => (
  <SvgIcon {...props}>
    <svg viewBox="0 0 24 24" fill="currentColor">
      {/* Round table */}
      <circle cx="12" cy="12" r="4" fill="currentColor" opacity="0.3" />
      {/* Chair-like seats facing the table */}

      {/* Top chair */}
      <g>
        <rect
          x="10.5"
          y="3"
          width="3"
          height="1.5"
          rx="0.3"
          fill="currentColor"
        />
        <rect
          x="11"
          y="1.8"
          width="2"
          height="0.8"
          rx="0.2"
          fill="currentColor"
          opacity="0.9"
        />
      </g>

      {/* Top-right chair */}
      <g transform="rotate(45 17.5 7)">
        <rect
          x="16.5"
          y="6.2"
          width="2"
          height="1.6"
          rx="0.3"
          fill="currentColor"
        />
        <rect
          x="16.8"
          y="5.5"
          width="1.4"
          height="0.6"
          rx="0.2"
          fill="currentColor"
          opacity="0.9"
        />
      </g>

      {/* Right chair */}
      <g transform="rotate(90 19.5 12)">
        <rect
          x="18.5"
          y="11"
          width="2"
          height="1.5"
          rx="0.3"
          fill="currentColor"
        />
        <rect
          x="18.8"
          y="10.2"
          width="1.4"
          height="0.6"
          rx="0.2"
          fill="currentColor"
          opacity="0.9"
        />
      </g>

      {/* Bottom-right chair */}
      <g transform="rotate(135 17.5 17)">
        <rect
          x="16.5"
          y="16.2"
          width="2"
          height="1.6"
          rx="0.3"
          fill="currentColor"
        />
        <rect
          x="16.8"
          y="15.5"
          width="1.4"
          height="0.6"
          rx="0.2"
          fill="currentColor"
          opacity="0.9"
        />
      </g>

      {/* Bottom chair */}
      <g transform="rotate(180 12 20)">
        <rect
          x="10.5"
          y="19.5"
          width="3"
          height="1.5"
          rx="0.3"
          fill="currentColor"
        />
        <rect
          x="11"
          y="20.2"
          width="2"
          height="0.8"
          rx="0.2"
          fill="currentColor"
          opacity="0.9"
        />
      </g>

      {/* Bottom-left chair */}
      <g transform="rotate(225 6.5 17)">
        <rect
          x="5.5"
          y="16.2"
          width="2"
          height="1.6"
          rx="0.3"
          fill="currentColor"
        />
        <rect
          x="5.8"
          y="15.5"
          width="1.4"
          height="0.6"
          rx="0.2"
          fill="currentColor"
          opacity="0.9"
        />
      </g>

      {/* Left chair */}
      <g transform="rotate(270 4.5 12)">
        <rect
          x="3.5"
          y="11"
          width="2"
          height="1.5"
          rx="0.3"
          fill="currentColor"
        />
        <rect
          x="3.8"
          y="10.2"
          width="1.4"
          height="0.6"
          rx="0.2"
          fill="currentColor"
          opacity="0.9"
        />
      </g>

      {/* Top-left chair */}
      <g transform="rotate(315 6.5 7)">
        <rect
          x="5.5"
          y="6.2"
          width="2"
          height="1.6"
          rx="0.3"
          fill="currentColor"
        />
        <rect
          x="5.8"
          y="5.5"
          width="1.4"
          height="0.6"
          rx="0.2"
          fill="currentColor"
          opacity="0.9"
        />
      </g>
    </svg>
  </SvgIcon>
);

export const CrescentSeatingIcon = (props: SvgIconProps) => (
  <SvgIcon {...props}>
    <svg viewBox="0 0 24 24" fill="currentColor">
      {/* Round table */}
      <circle cx="12" cy="12" r="4" fill="currentColor" opacity="0.3" />
      {/* Same as Full seating but with top 3 chairs removed (crescent shape) */}

      {/* Bottom-right chair */}
      <g transform="rotate(135 17.5 17)">
        <rect
          x="16.5"
          y="16.2"
          width="2"
          height="1.6"
          rx="0.3"
          fill="currentColor"
        />
        <rect
          x="16.8"
          y="15.5"
          width="1.4"
          height="0.6"
          rx="0.2"
          fill="currentColor"
          opacity="0.9"
        />
      </g>

      {/* Bottom chair */}
      <g transform="rotate(180 12 20)">
        <rect
          x="10.5"
          y="19.5"
          width="3"
          height="1.5"
          rx="0.3"
          fill="currentColor"
        />
        <rect
          x="11"
          y="20.2"
          width="2"
          height="0.8"
          rx="0.2"
          fill="currentColor"
          opacity="0.9"
        />
      </g>

      {/* Bottom-left chair */}
      <g transform="rotate(225 6.5 17)">
        <rect
          x="5.5"
          y="16.2"
          width="2"
          height="1.6"
          rx="0.3"
          fill="currentColor"
        />
        <rect
          x="5.8"
          y="15.5"
          width="1.4"
          height="0.6"
          rx="0.2"
          fill="currentColor"
          opacity="0.9"
        />
      </g>

      {/* Left chair */}
      <g transform="rotate(270 4.5 12)">
        <rect
          x="3.5"
          y="11"
          width="2"
          height="1.5"
          rx="0.3"
          fill="currentColor"
        />
        <rect
          x="3.8"
          y="10.2"
          width="1.4"
          height="0.6"
          rx="0.2"
          fill="currentColor"
          opacity="0.9"
        />
      </g>

      {/* Right chair */}
      <g transform="rotate(90 19.5 12)">
        <rect
          x="18.5"
          y="11"
          width="2"
          height="1.5"
          rx="0.3"
          fill="currentColor"
        />
        <rect
          x="18.8"
          y="10.2"
          width="1.4"
          height="0.6"
          rx="0.2"
          fill="currentColor"
          opacity="0.9"
        />
      </g>
    </svg>
  </SvgIcon>
);

export const ClassroomSeatingIcon = (props: SvgIconProps) => (
  <SvgIcon {...props}>
    <svg viewBox="0 0 24 24" fill="currentColor">
      {/* Classroom rows - larger and more visible */}
      <rect x="2" y="7" width="3" height="2" rx="0.5" fill="currentColor" />
      <rect x="6" y="7" width="3" height="2" rx="0.5" fill="currentColor" />
      <rect x="10" y="7" width="3" height="2" rx="0.5" fill="currentColor" />
      <rect x="14" y="7" width="3" height="2" rx="0.5" fill="currentColor" />
      <rect x="18" y="7" width="3" height="2" rx="0.5" fill="currentColor" />

      <rect x="2" y="11" width="3" height="2" rx="0.5" fill="currentColor" />
      <rect x="6" y="11" width="3" height="2" rx="0.5" fill="currentColor" />
      <rect x="10" y="11" width="3" height="2" rx="0.5" fill="currentColor" />
      <rect x="14" y="11" width="3" height="2" rx="0.5" fill="currentColor" />
      <rect x="18" y="11" width="3" height="2" rx="0.5" fill="currentColor" />

      <rect x="2" y="15" width="3" height="2" rx="0.5" fill="currentColor" />
      <rect x="6" y="15" width="3" height="2" rx="0.5" fill="currentColor" />
      <rect x="10" y="15" width="3" height="2" rx="0.5" fill="currentColor" />
      <rect x="14" y="15" width="3" height="2" rx="0.5" fill="currentColor" />
      <rect x="18" y="15" width="3" height="2" rx="0.5" fill="currentColor" />

      {/* Whiteboard/presentation area */}
      <rect
        x="4"
        y="2"
        width="16"
        height="3"
        rx="0.5"
        fill="currentColor"
        opacity="0.4"
      />
    </svg>
  </SvgIcon>
);

export const TheatreSeatingIcon = (props: SvgIconProps) => (
  <SvgIcon {...props}>
    <svg viewBox="0 0 24 24" fill="currentColor">
      {/* Theatre seating - same as classroom but with middle column removed */}
      <rect x="2" y="7" width="3" height="2" rx="0.5" fill="currentColor" />
      <rect x="6" y="7" width="3" height="2" rx="0.5" fill="currentColor" />
      {/* Column 3 removed for center aisle */}
      <rect x="14" y="7" width="3" height="2" rx="0.5" fill="currentColor" />
      <rect x="18" y="7" width="3" height="2" rx="0.5" fill="currentColor" />

      <rect x="2" y="11" width="3" height="2" rx="0.5" fill="currentColor" />
      <rect x="6" y="11" width="3" height="2" rx="0.5" fill="currentColor" />
      {/* Column 3 removed for center aisle */}
      <rect x="14" y="11" width="3" height="2" rx="0.5" fill="currentColor" />
      <rect x="18" y="11" width="3" height="2" rx="0.5" fill="currentColor" />

      <rect x="2" y="15" width="3" height="2" rx="0.5" fill="currentColor" />
      <rect x="6" y="15" width="3" height="2" rx="0.5" fill="currentColor" />
      {/* Column 3 removed for center aisle */}
      <rect x="14" y="15" width="3" height="2" rx="0.5" fill="currentColor" />
      <rect x="18" y="15" width="3" height="2" rx="0.5" fill="currentColor" />

      {/* Stage area */}
      <rect
        x="4"
        y="2"
        width="16"
        height="3"
        rx="0.5"
        fill="currentColor"
        opacity="0.4"
      />
    </svg>
  </SvgIcon>
);
