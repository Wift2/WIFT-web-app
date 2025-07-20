import { Box, Typography } from '@mui/material';

interface TablePreviewProps {
  tableSize: string;
  numberOfSeats: string;
}

const TablePreview = ({ tableSize, numberOfSeats }: TablePreviewProps) => {
  // Calculate table radius based on size
  const getTableRadius = () => {
    switch (tableSize) {
      case '60': {
        return 3;
      }
      case '66': {
        return 3.5;
      }
      case '72': {
        return 4;
      }
      default: {
        return 3.5;
      }
    }
  };

  // Generate seat positions around the table
  const generateSeatPositions = () => {
    const seats = Number.parseInt(numberOfSeats, 10) || 8;
    const radius = getTableRadius();
    const centerX = 12;
    const centerY = 12;
    const seatDistance = radius + 2.5; // Distance from table center to seats

    const positions = [];
    for (let i = 0; i < seats; i++) {
      const angle = (i * 2 * Math.PI) / seats - Math.PI / 2; // Start from top
      const x = centerX + seatDistance * Math.cos(angle);
      const y = centerY + seatDistance * Math.sin(angle);
      positions.push({ x, y, angle });
    }
    return positions;
  };

  const tableRadius = getTableRadius();
  const seatPositions = generateSeatPositions();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 1,
        p: 2,
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 1,
        bgcolor: 'background.paper',
        minWidth: 200,
      }}
    >
      <Typography variant="caption" color="text.secondary">
        Table Preview
      </Typography>

      <Box
        sx={{
          position: 'relative',
          width: 120,
          height: 120,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <svg
          width="120"
          height="120"
          viewBox="0 0 24 24"
          style={{ border: '1px solid #e0e0e0', borderRadius: '4px' }}
        >
          {/* Round table */}
          <circle
            cx="12"
            cy="12"
            r={tableRadius}
            fill="currentColor"
            opacity="0.3"
          />

          {/* Table size label */}
          <text
            x="12"
            y="12"
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="2"
            fill="currentColor"
            opacity="0.7"
          >
            {tableSize}"
          </text>

          {/* Seats positioned around the table */}
          {seatPositions.map((position, index) => {
            // Calculate rotation for chair back to face the table
            const rotationAngle = (position.angle * 180) / Math.PI + 90;

            return (
              <g
                key={index}
                transform={`rotate(${rotationAngle} ${position.x} ${position.y})`}
              >
                {/* Chair seat (main part) */}
                <rect
                  x={position.x - 0.7}
                  y={position.y - 0.6}
                  width="1.4"
                  height="1.2"
                  rx="0.3"
                  fill="currentColor"
                  opacity="0.8"
                />
                {/* Chair back (smaller rectangle at the back) */}
                <rect
                  x={position.x - 0.5}
                  y={position.y - 0.9}
                  width="1.0"
                  height="0.4"
                  rx="0.2"
                  fill="currentColor"
                  opacity="0.9"
                />
              </g>
            );
          })}
        </svg>
      </Box>

      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="caption" color="text.secondary">
          {tableSize}" Round Table
        </Typography>
        <br />
        <Typography variant="caption" color="text.secondary">
          {numberOfSeats} Seats
        </Typography>
      </Box>
    </Box>
  );
};

export default TablePreview;
