import { Typography } from '@mui/material';
import type { TypographyProps } from '@mui/material';
import { useTheme } from '@mui/material/styles';

interface GradientTitleProps extends Omit<TypographyProps, 'variant'> {
  children: React.ReactNode;
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

const GradientTitle = ({
  children,
  variant = 'h1',
  sx = {},
  ...props
}: GradientTitleProps) => {
  const theme = useTheme();

  // Get the theme's primary and secondary colors for the gradient
  const primaryColor = theme.palette.primary.main;
  const secondaryColor = theme.palette.secondary.main;

  return (
    <Typography
      variant={variant}
      sx={{
        fontWeight: 700,
        background: `linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%)`,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        // Fallback for browsers that don't support background-clip: text
        '@supports not (background-clip: text)': {
          color: primaryColor,
        },
        ...sx,
      }}
      {...props}
    >
      {children}
    </Typography>
  );
};

export default GradientTitle;
