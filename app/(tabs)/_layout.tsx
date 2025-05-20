// app/(tabs)/_layout.tsx
import { Colors } from "@/constants/Colors";
import Context from "@/context/Context";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { useContext } from "react";

export default function TabLayout() {
  const context = useContext(Context);
  const theme = context?.theme ?? "light";

  const activeTintColor =
    theme === "dark"
      ? Colors.dark.tabIconSelected
      : Colors.light.tabIconSelected;

  const inactiveTintColor =
    theme === "dark" ? Colors.dark.tabIconDefault : Colors.light.tabIconDefault;

  const backgroundColor =
    theme === "dark" ? Colors.dark.background : Colors.light.background;

  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor,
          borderTopWidth: 0,
          height: 70,
          paddingBottom: 6,
        },
        tabBarActiveTintColor: activeTintColor,
        tabBarInactiveTintColor: inactiveTintColor,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
          textTransform: "capitalize",
        },
        tabBarShowLabel: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          switch (route.name) {
            case "home":
              iconName = focused ? "home" : "home-outline";
              break;
            case "profile":
              iconName = focused ? "person" : "person-outline";
              break;
            default:
              iconName = "ellipse-outline";
              break;
          }

          return <Ionicons name={iconName} size={22} color={color} />;
        },
      })}
    >
      <Tabs.Screen
        key="Home"
        name="home"
        options={{
          tabBarLabel: "Home",
        }}
      />
      <Tabs.Screen
        key="Profile"
        name="profile"
        options={{
          tabBarLabel: "Profile",
        }}
      />
    </Tabs>
  );
}
