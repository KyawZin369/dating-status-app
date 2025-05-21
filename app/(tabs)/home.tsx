import Search from "@/components/SearchBar";
import { Colors, Fonts } from "@/constants/Colors";
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
    : height - StatusBar.currentHeight! - 90;

// console.log("Video Height:", videoHeight);

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
  const [isScrolled, setIsScrolled] = useState(false);

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
      // backgroundColor: "black",
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
      justifyContent: "flex-start",
      color: theme === "dark" ? Colors.dark.text : Colors.light.text,
    },
    text: {
      color: theme === "dark" ? Colors.dark.text : Colors.light.text,
      fontSize: 12,
      fontWeight: "500",
      marginTop: 4,
      fontFamily: Fonts.regular,
    },
    profileName: {
      color: theme === "dark" ? Colors.dark.text : Colors.light.text,
      fontSize: 16,
      fontWeight: "600",
      fontFamily: Fonts.semiBold,
      marginLeft: 20,
    },
    profileOverlay: {
      position: "absolute",
      alignItems: "flex-start",
      bottom: 0,
      left: 0,
      width: "100%",
      height: "17%",
    },
  });

  const toggleLike = (index: any) => {
    const updatedVideos = [...videos];
    const video = updatedVideos[index];
    video.isLiked = !video.isLiked;
    video.likes += video.isLiked ? 1 : -1;
    setVideos(updatedVideos);
  };

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
          onPress={() => toggleLike(index)}
          style={styles.iconButton}
        >
          <Ionicons
            name={item.isLiked ? "heart" : "heart-outline"}
            size={32}
            color={
              theme === "dark"
                ? item.isLiked
                  ? "red"
                  : Colors.dark.icon
                : item.isLiked
                ? "red"
                : Colors.light.icon
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
            color={theme === "dark" ? Colors.dark.icon : Colors.light.icon}
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
            color={theme === "dark" ? Colors.dark.icon : Colors.light.icon}
          />
          <Text style={styles.text}>Message</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.profileOverlay}>
        <TouchableOpacity style={styles.iconButton}>
          <View
            style={{
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <Ionicons
              name="person-circle-sharp"
              size={40}
              color={theme === "dark" ? Colors.dark.icon : Colors.light.icon}
            />
            <Text style={styles.profileName}>Kyaw Zin Thet</Text>
          </View>
          <View
            style={[
              styles.text,
              {
                marginTop: 20,
              },
            ]}
          >
            <Text style={[styles.text, { marginLeft: 43, fontSize: 13 }]}>
              Hello My name is Kyaw Zin Thet
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor:
          theme === "dark"
            ? Colors.dark.mainBackground
            : Colors.light.mainBackground,
      }}
    >
      {!isScrolled && <View></View>}
      <Search />

      <FlatList
        data={videos}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        onViewableItemsChanged={onViewRef.current}
        viewabilityConfig={viewConfigRef.current}
        onScroll={(event) => {
          const offsetY = event.nativeEvent.contentOffset.y;
          setIsScrolled(offsetY > 0);
        }}
      />
    </SafeAreaView>
  );
};

export default Home;
