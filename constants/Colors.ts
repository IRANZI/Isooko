/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

/**
 * Enhanced color palette for a modern and attractive water quality app
 * The colors are defined for both light and dark modes with improved contrast
 */

const primaryColor = '#4FC3F7'; // Light blue
const secondaryColor = '#81D4FA'; // Lighter blue accent
const successColor = '#4CAF50'; // Green for water quality
const warningColor = '#FF9800'; // Orange for warnings
const errorColor = '#F44336'; // Red for errors

export const Colors = {
  light: {
    text: '#1A1A1A',
    textSecondary: '#666666',
    textTertiary: '#999999',
    background: '#FFFFFF',
    backgroundSecondary: '#F8F9FA',
    backgroundTertiary: '#F1F3F4',
    tint: '#1E88E5',
    icon: '#666666',
    tabIconDefault: '#999999',
    tabIconSelected: '#1E88E5',
    primary: '#1E88E5',
    secondary: '#00BCD4',
    success: '#4CAF50',
    warning: '#FF9800',
    error: '#F44336',
    border: '#E0E0E0',
    shadow: '#000000',
    card: '#FFFFFF',
    overlay: 'rgba(0, 0, 0, 0.5)',
  },
  dark: {
    text: '#FFFFFF',
    textSecondary: '#B0B0B0',
    textTertiary: '#808080',
    background: '#000000',
    backgroundSecondary: '#181A20',
    backgroundTertiary: '#23272F',
    tint: '#4FC3F7',
    icon: '#B0B0B0',
    tabIconDefault: '#808080',
    tabIconSelected: '#4FC3F7',
    primary: '#4FC3F7',
    secondary: '#81D4FA',
    success: '#81C784',
    warning: '#FFB74D',
    error: '#E57373',
    border: '#23272F',
    shadow: '#000000',
    card: '#181A20',
    overlay: 'rgba(255, 255, 255, 0.07)',
  },
};

// Gradient colors for enhanced visual appeal
export const Gradients = {
  primary: ['#1E88E5', '#1565C0'],
  secondary: ['#00BCD4', '#0097A7'],
  success: ['#4CAF50', '#388E3C'],
  warning: ['#FF9800', '#F57C00'],
  error: ['#F44336', '#D32F2F'],
  water: ['#E3F2FD', '#BBDEFB'],
  sunset: ['#FF6B6B', '#FFE66D'],
  ocean: ['#2196F3', '#00BCD4'],
};
