import { Colors } from "@/constants/Colors";
import Context from "@/context/Context";
import { Ionicons } from "@expo/vector-icons";
import { ResizeMode, Video } from "expo-av";
import React, { useContext, useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { height } = Dimensions.get("window");
const videoHeight =
  Platform.OS === "ios"
    ? height - (Platform.OS === "ios" ? 175 : 0)
    : height - StatusBar.currentHeight! - 175;

console.log("Video Height:", videoHeight);

const initialData = [
  {
    id: "1",
    url: "https://www.w3schools.com/html/mov_bbb.mp4",
    likes: 32,
    isLiked: false,
  },
  {
    id: "2",
    url: "https://www.w3schools.com/html/movie.mp4",
    likes: 21,
    isLiked: false,
  },
  {
    id: "3",
    url: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
    likes: 10,
    isLiked: false,
  },
  {
    id: "4",
    url: "https://www.w3schools.com/html/mov_bbb.mp4",
    likes: 32,
    isLiked: false,
  },
  {
    id: "5",
    url: "https://www.w3schools.com/html/mov_bbb.mp4",
    likes: 32,
    isLiked: false,
  },
];

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [videos, setVideos] = useState(initialData);

  const contextState = useContext(Context);
  const theme = contextState?.theme ?? "light";

  const onViewRef = useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  });

  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 80 });

  const styles = StyleSheet.create({
    videoContainer: {
      width: "100%",
      height: videoHeight,
      backgroundColor: "black",
    },
    video: {
      width: "100%",
      height: videoHeight,
    },
    overlay: {
      position: "absolute",
      right: 20,
      bottom: 100,
      alignItems: "center",
      gap: 20,
    },
    iconButton: {
      alignItems: "center",
      color: theme === "dark" ? Colors.dark.text : Colors.light.text,
    },
    text: {
      color: theme === "dark" ? Colors.dark.text : Colors.light.text,
      fontSize: 12,
      marginTop: 4,
    },
  });

  // const toggleLike = (index) => {
  //   const updatedVideos = [...videos];
  //   const video = updatedVideos[index];
  //   video.isLiked = !video.isLiked;
  //   video.likes += video.isLiked ? 1 : -1;
  //   setVideos(updatedVideos);
  // };

  const renderItem = ({ item, index }: any) => (
    <View style={styles.videoContainer}>
      <Video
        source={{ uri: item.url }}
        style={styles.video}
        resizeMode={ResizeMode.CONTAIN}
        isLooping
        shouldPlay={currentIndex === index}
        useNativeControls={false}
      />

      {/* Overlay UI */}
      <View style={styles.overlay}>
        <TouchableOpacity
          // onPress={() => toggleLike(index)}
          style={styles.iconButton}
        >
          <Ionicons
            name={item.isLiked ? "heart" : "heart-outline"}
            size={32}
            color={
              theme === "dark"
                ? item.isLiked
                  ? "red"
                  : "white"
                : item.isLiked
                ? "red"
                : "black"
            }
            // selectionColor={item.isLiked ? "red" : "black"}
          />
          <Text style={styles.text}>{item.likes}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => alert("Open comments")}
          style={styles.iconButton}
        >
          <Ionicons
            name="chatbubble-outline"
            size={30}
            color={theme === "dark" ? Colors.dark.text : Colors.light.text}
          />
          <Text style={styles.text}>Comment</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => alert("Send message")}
          style={styles.iconButton}
        >
          <Ionicons
            name="paper-plane-outline"
            size={30}
            color={theme === "dark" ? Colors.dark.text : Colors.light.text}
          />
          <Text style={styles.text}>Message</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        data={videos}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        onViewableItemsChanged={onViewRef.current}
        viewabilityConfig={viewConfigRef.current}
      />
    </SafeAreaView>
  );
};

export default Home;
