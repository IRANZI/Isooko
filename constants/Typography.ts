import { Platform } from 'react-native';

// Font families for different platforms
const fontFamily = Platform.select({
  ios: 'System',
  android: 'Roboto',
  default: 'System',
});

// Font weights
export const FontWeights = {
  light: '300' as const,
  regular: '400' as const,
  medium: '500' as const,
  semiBold: '600' as const,
  bold: '700' as const,
  extraBold: '800' as const,
};

// Typography scale (mobile-friendly)
export const Typography = {
  // Display styles
  displayLarge: {
    fontFamily,
    fontSize: 32,
    fontWeight: FontWeights.light,
    lineHeight: 38,
    letterSpacing: -0.25,
  },
  displayMedium: {
    fontFamily,
    fontSize: 28,
    fontWeight: FontWeights.regular,
    lineHeight: 34,
    letterSpacing: 0,
  },
  displaySmall: {
    fontFamily,
    fontSize: 24,
    fontWeight: FontWeights.regular,
    lineHeight: 30,
    letterSpacing: 0,
  },

  // Headline styles
  headlineLarge: {
    fontFamily,
    fontSize: 22,
    fontWeight: FontWeights.regular,
    lineHeight: 28,
    letterSpacing: 0,
  },
  headlineMedium: {
    fontFamily,
    fontSize: 20,
    fontWeight: FontWeights.regular,
    lineHeight: 26,
    letterSpacing: 0,
  },
  headlineSmall: {
    fontFamily,
    fontSize: 18,
    fontWeight: FontWeights.regular,
    lineHeight: 24,
    letterSpacing: 0,
  },

  // Title styles
  titleLarge: {
    fontFamily,
    fontSize: 17,
    fontWeight: FontWeights.medium,
    lineHeight: 22,
    letterSpacing: 0,
  },
  titleMedium: {
    fontFamily,
    fontSize: 16,
    fontWeight: FontWeights.medium,
    lineHeight: 20,
    letterSpacing: 0.15,
  },
  titleSmall: {
    fontFamily,
    fontSize: 15,
    fontWeight: FontWeights.medium,
    lineHeight: 18,
    letterSpacing: 0.1,
  },

  // Body styles
  bodyLarge: {
    fontFamily,
    fontSize: 16,
    fontWeight: FontWeights.regular,
    lineHeight: 20,
    letterSpacing: 0.5,
  },
  bodyMedium: {
    fontFamily,
    fontSize: 15,
    fontWeight: FontWeights.regular,
    lineHeight: 18,
    letterSpacing: 0.25,
  },
  bodySmall: {
    fontFamily,
    fontSize: 13,
    fontWeight: FontWeights.regular,
    lineHeight: 16,
    letterSpacing: 0.4,
  },

  // Label styles
  labelLarge: {
    fontFamily,
    fontSize: 14,
    fontWeight: FontWeights.medium,
    lineHeight: 18,
    letterSpacing: 0.1,
  },
  labelMedium: {
    fontFamily,
    fontSize: 13,
    fontWeight: FontWeights.medium,
    lineHeight: 16,
    letterSpacing: 0.5,
  },
  labelSmall: {
    fontFamily,
    fontSize: 12,
    fontWeight: FontWeights.medium,
    lineHeight: 14,
    letterSpacing: 0.5,
  },
};

// Custom text styles for specific use cases
export const TextStyles = {
  // Navigation and headers
  navTitle: {
    ...Typography.titleLarge,
    fontWeight: FontWeights.semiBold,
  },
  pageTitle: {
    ...Typography.headlineMedium,
    fontWeight: FontWeights.bold,
  },
  sectionTitle: {
    ...Typography.titleLarge,
    fontWeight: FontWeights.semiBold,
  },

  // Content
  contentTitle: {
    ...Typography.titleMedium,
    fontWeight: FontWeights.medium,
  },
  contentBody: {
    ...Typography.bodyMedium,
  },
  contentCaption: {
    ...Typography.bodySmall,
  },

  // Interactive elements
  buttonText: {
    ...Typography.labelLarge,
    fontWeight: FontWeights.semiBold,
  },
  inputLabel: {
    ...Typography.labelMedium,
    fontWeight: FontWeights.medium,
  },
  inputText: {
    ...Typography.bodyLarge,
  },

  // Status and notifications
  statusText: {
    ...Typography.labelMedium,
    fontWeight: FontWeights.medium,
  },
  notificationText: {
    ...Typography.bodySmall,
  },

  // Water quality specific
  qualityTitle: {
    ...Typography.titleLarge,
    fontWeight: FontWeights.bold,
  },
  qualityValue: {
    ...Typography.displaySmall,
    fontWeight: FontWeights.bold,
  },
  qualityLabel: {
    ...Typography.labelLarge,
    fontWeight: FontWeights.medium,
  },
}; 