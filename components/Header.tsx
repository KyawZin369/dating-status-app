import { Colors } from "@/constants/Colors";
import Context from "@/context/Context";
import { Ionicons } from "@expo/vector-icons";
import { useContext } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";

export default function CustomHeader({ tabName }: { tabName: string }) {
  const context = useContext(Context);
  const theme = context?.theme ?? "light";

  const backgroundColor =
    theme === "dark" ? Colors.dark.background : Colors.light.background;
  const textColor = theme === "dark" ? Colors.dark.text : Colors.light.text;

  return (
    <SafeAreaView style={[styles.headerContainer, { backgroundColor }]}>
      <View style={styles.headerContent}>
        <View style={styles.left}>
          {/* <Ionicons name="apps" size={20} color={textColor} /> */}
          <Text style={[styles.tabText, { color: textColor }]}>{tabName}</Text>
        </View>
        <View style={styles.left}>
          <Ionicons name="notifications" size={24} color={textColor} />
          <Ionicons name="person-circle-sharp" size={24} color={textColor} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    paddingTop: 20,
    paddingBottom: 20,
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
    gap: 8,
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
