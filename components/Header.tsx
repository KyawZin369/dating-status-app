import { Colors } from "@/constants/Colors";
import Context from "@/context/Context";
import { Ionicons } from "@expo/vector-icons";
import { useContext } from "react";
import { Platform, SafeAreaView, StyleSheet, Text, View } from "react-native";

export default function CustomHeader({
  tabName,
  setTheme,
}: {
  tabName: string;
  setTheme: (theme: string) => void;
}) {
  const context = useContext(Context);
  const theme = context?.theme ?? "light";

  const backgroundColor =
    theme === "dark" ? Colors.dark.background : Colors.light.background;
  const textColor = theme === "dark" ? Colors.dark.text : Colors.light.text;

  return (
    <SafeAreaView style={[styles.headerContainer, { backgroundColor }]}>
      <View style={styles.headerContent}>
        <View style={styles.left}>
          {theme === "dark" ? (
            <Ionicons
              name="sunny-sharp"
              size={20}
              color={textColor}
              onPress={() => setTheme("light")}
            />
          ) : (
            <Ionicons
              name="moon-sharp"
              size={20}
              color={textColor}
              onPress={() => setTheme("dark")}
            />
          )}
        </View>
        <View style={styles.left}>
          <Text style={[styles.tabText, { color: textColor }]}>{tabName}</Text>
        </View>
        <View style={styles.left}>
          <Ionicons name="notifications" size={24} color={textColor} />
          {/* <Ionicons name="person-circle-sharp" size={24} color={textColor} /> */}
          <Ionicons
            name="ellipsis-vertical-sharp"
            size={20}
            color={textColor}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    paddingTop: Platform.OS === "android" ? 10 : 0,
    paddingBottom: Platform.OS === "android" ? 5 : 20,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  tabText: {
    fontSize: 20,
    fontWeight: "600",
  },
  appTitle: {
    fontSize: 20,
    fontWeight: "700",
  },
});
