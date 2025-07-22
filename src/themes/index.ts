import { wiftTheme } from './wift';

// Define the available theme names
export type ThemeNames = 'wift';

// Define the available theme modes
export type ThemeModes = 'light' | 'dark';

// Theme registry - add new themes here
const themes = {
  wift: wiftTheme,
};

// Function to get a specific theme with mode
export function getTheme(themeName: ThemeNames, mode: ThemeModes) {
  const themeSet = themes[themeName];
  return themeSet[mode];
}

// Export the default theme (wift dark)
export const customTheme = wiftTheme.dark;
