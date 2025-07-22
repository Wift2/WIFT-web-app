# WIFT Theme

A professional, modern theme featuring blue gradients and green accents. The WIFT theme provides a distinct brand identity for the WIFT application with clean, contemporary design principles.

## Overview

The WIFT theme is built on Material-UI's theming system and provides both light and dark modes. It features a blue-to-green gradient system, ensuring visual consistency throughout the application.

## Features

- **Dual Mode Support**: Light and dark themes
- **Blue Gradient System**: Primary blue (#0369a1) to light blue (#0ea5e9)
- **Green Accents**: Vibrant green (#11b83a), teal (#14b8a6), and complementary colors
- **Modern Typography**: Roboto font family for clean, professional text
- **Consistent Spacing**: 12px base border radius with thoughtful component spacing
- **Gradient Shadows**: Blue-tinted shadows for cohesive visual depth
- **Zero Border Radius**: Drawer and toolbar components with sharp, modern edges

## Color Palette

### Primary Colors
- **Primary Blue**: `#0369a1` (Main brand color)
- **Primary Blue Light**: `#0ea5e9` (Hover states, accents)
- **Primary Blue Dark**: `#075985` (Active states)
- **Primary Blue Deep**: `#0c4a6e` (Deep accents)

### Secondary Colors
- **Secondary Green**: `#11b83a` (Secondary brand color)
- **Secondary Green Light**: `#10B981` (Light accents)
- **Secondary Green Dark**: `#15803d` (Dark accents)

### Accent Colors
- **Accent Cyan**: `#06b6d4` (Info states)
- **Energy Orange**: `#f97316` (Warning states)
- **Vibrant Teal**: `#14b8a6` (Success states)
- **Electric Yellow**: `#eab308` (Attention-grabbing accents)

## Typography

The WIFT theme uses the Roboto font family with a well-defined hierarchy:

- **Headlines (H1-H6)**: Bold weights (500-700) with gradient text effects on H1
- **Body Text**: Regular weight (400) with good contrast ratios
- **Buttons**: Semi-bold (600) with no text transformation
- **Font Stack**: `"Roboto", "Helvetica", "Arial", sans-serif`

## Component Styling

### Buttons
- **Border Radius**: 12px for modern rounded appearance
- **Gradient Backgrounds**: Blue-to-darker-blue gradients on primary buttons
- **Hover Effects**: Subtle lift animation with enhanced blue shadows
- **Typography**: Semi-bold with no text transformation

### Cards
- **Border Radius**: 16px for distinctive card appearance
- **Borders**: Light borders with subtle blue-tinted shadows
- **Hover Effects**: Lift animation with enhanced blue-tinted shadows
- **Background**: Clean white (light) or dark secondary (dark) backgrounds

### Navigation
- **Drawer**: Zero border radius for modern, sharp edges
- **Selected States**: Blue-green gradient backgrounds with left border indicators
- **Hover Effects**: Subtle blue background tints

### Form Elements
- **Text Fields**: 12px border radius with blue focus states
- **Focus Indicators**: Blue glow effects with 2px shadow rings
- **Validation**: Color-coded borders for different states

## Usage Examples

### Basic Theme Application
```tsx
import { ThemeProvider } from '@mui/material/styles';
import { wiftTheme } from './themes/wift';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  
  return (
    <ThemeProvider theme={darkMode ? wiftTheme.dark : wiftTheme.light}>
      {/* Your app content */}
    </ThemeProvider>
  );
}
```

### Component Styling
```tsx
import { Button, Card, CardContent } from '@mui/material';

function WiftComponents() {
  return (
    <Card>
      <CardContent>
        <Button variant="contained" color="primary">
          WIFT Button
        </Button>
        <Button variant="outlined" color="secondary">
          Secondary Action
        </Button>
      </CardContent>
    </Card>
  );
}
```

## Dark Mode

The dark mode variant maintains the same color relationships while adapting to dark backgrounds:

- **Background**: Deep navy (#010716) with secondary dark backgrounds
- **Text**: High contrast white text with muted secondary text
- **Accents**: Lighter blue variants for better dark mode visibility
- **Shadows**: Darker, more prominent shadows for depth

## Accessibility

The WIFT theme is designed with accessibility in mind:

- **Contrast Ratios**: All text meets WCAG AA standards
- **Focus Indicators**: Clear blue focus rings on interactive elements
- **Color Independence**: Important information isn't conveyed through color alone
- **Touch Targets**: Minimum 44px touch targets for mobile accessibility

## Customization

### Extending the Theme
```tsx
import { wiftTheme } from './themes/wift';
import { createTheme } from '@mui/material/styles';

const customWiftTheme = createTheme({
  ...wiftTheme.light,
  palette: {
    ...wiftTheme.light.palette,
    // Add your custom colors here
  },
});
```

### Component Overrides
```tsx
const wiftThemeWithOverrides = createTheme({
  ...wiftTheme.light,
  components: {
    ...wiftTheme.light.components,
    MuiButton: {
      styleOverrides: {
        root: {
          // Your custom button styles
        },
      },
    },
  },
});
```

## Best Practices

1. **Consistent Usage**: Use theme colors instead of hardcoded hex values
2. **Mode Support**: Always test components in both light and dark modes
3. **Gradient Application**: Use gradients sparingly for maximum impact
4. **Typography Hierarchy**: Respect the established font weights and sizes
5. **Spacing**: Use theme spacing units for consistent layouts
6. **Testing**: Verify accessibility and contrast ratios in both modes

## Design Philosophy

The WIFT theme follows modern design principles, featuring:

- Blue-to-green gradient color system
- Clean typography scale and Roboto font family
- Consistent component styling patterns
- Unified border radius and spacing systems

This design approach ensures that components work seamlessly together throughout the application.
