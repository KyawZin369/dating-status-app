import { Colors } from "@/constants/Colors";
import Context from "@/context/Context";
import { Ionicons } from "@expo/vector-icons";
import { useContext } from "react";
import { StyleSheet, TextInput, View } from "react-native";

export default function Search() {
  const contextState = useContext(Context);
  const theme = contextState?.theme ?? "light";

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.searchContainer,
          {
            backgroundColor:
              theme === "dark"
                ? Colors.dark.background
                : Colors.light.background,
          },
        ]}
      >
        <Ionicons
          name="search"
          size={20}
          color={theme === "dark" ? Colors.dark.text : Colors.light.text}
          style={styles.searchIcon}
        />
        <TextInput
          placeholder="Find Your Partner"
          placeholderTextColor={
            theme === "dark" ? Colors.dark.text : Colors.light.text
          }
          style={[
            styles.input,
            {
              color: theme === "dark" ? Colors.dark.text : Colors.light.text,
            },
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 10,
    left: 0,
    right: 0,
    zIndex: 1,
    paddingHorizontal: 15,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 20,
    paddingHorizontal: 15,
    height: 40,
  },
  searchIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
});
