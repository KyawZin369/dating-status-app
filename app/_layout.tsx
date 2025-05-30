import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  useFonts,
} from "@expo-google-fonts/inter";
import { Stack } from "expo-router";
import React, { useState } from "react";
import { StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Header from "../components/Header";
import Context from "../context/Context";
import type { ContextType } from "../model/ContextType";

const RootLayout = () => {
  // State to hold the focused tab name
  const [focusedTabName, setFocusedTabName] = useState("Home");
  const [theme, setTheme] = useState("dark");

  const contextValue: ContextType = {
    user: null,
    token: null,
    theme: theme,
  };

  const [fontsLoaded] = useFonts({
    Inter: Inter_400Regular,
    "Inter-Medium": Inter_500Medium,
    "Inter-SemiBold": Inter_600SemiBold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <Context.Provider value={contextValue}>
        {/* Pass the focused tab name to the Header */}
        <Header tabName={focusedTabName} setTheme={setTheme} />

        <Stack>
          <Stack.Screen
            name="(tabs)"
            options={{ headerShown: false }}
            listeners={{
              state: (e) => {
                const route = e.data.state.routes[e.data.state.index];
                const activeKey =
                  route.state?.routes?.[route.state?.index ?? 0]?.key || "home";
                const activeName = activeKey.split("-")[0];
                setFocusedTabName(
                  activeName.charAt(0).toUpperCase() + activeName.slice(1)
                );
                // console.log("Active Tab Name:", activeName);
              },
            }}
          />
        </Stack>
        <StatusBar barStyle="dark-content" />
      </Context.Provider>
    </SafeAreaProvider>
  );
};

export default RootLayout;
