/**
 * Utility functions for the WIFT AI WebApp
 */

/**
 * Format a number with thousand separators
 */
export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat().format(num);
};

/**
 * Debounce function to limit function calls
 */
export const debounce = <T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

/**
 * Simple function to generate a random ID
 */
export const generateId = (): string => {
  return Math.random().toString(36).slice(2, 15);
};

/**
 * Check if we're running in development mode
 */
export const isDevelopment = (): boolean => {
  return import.meta.env.DEV;
};
