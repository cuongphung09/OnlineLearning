import React from "react";
import { StyleSheet, Text, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
// import { Video } from "expo-av";
export default function CoursesDetail({ navigation,props,route }) {
  
  const {item}= route.params
  console.log(item)
  return (
    <View style={styles.container}>
      {/* <MaterialCommunityIcons name="download" color={'white'} size={200} /> */}
      {/* <Video
        source={{
          uri: "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
        }}
        rate={1.0}
        volume={1.0}
        isMuted={false}
        resizeMode="cover"
        shouldPlay
        isLooping
        style={{ width: 300, height: 300 }}
      /> */}
      <Text style={{color:'white'}}>{item.title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0E0F13",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
});
