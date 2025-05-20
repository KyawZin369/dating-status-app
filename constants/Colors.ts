/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = "#FF69B4"; // Hot pink
const tintColorDark = "#FF1493"; // Deep pink

export const Colors = {
  light: {
    text: "#4A154B", // Deep purple
    background: "#FFF0F5", // Lavender blush
    tint: tintColorLight,
    icon: "#DB7093", // Pale violet red
    tabIconDefault: "#DB7093",
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: "#FFB6C1", // Light pink
    background: "#2C001E", // Deep romantic purple
    tint: tintColorDark,
    icon: "#FF69B4", // Hot pink
    tabIconDefault: "#FF69B4",
    tabIconSelected: tintColorDark,
  },
};
