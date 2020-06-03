import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Button,
  Alert,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Video } from "expo-av";
import { Avatar } from "react-native-elements";

export default function CoursesDetail({ navigation, props, route }) {
  // console.log(props, route, navigation);
  const { item } = route.params;
  return (
    <ScrollView style={styles.container}>
      {/* <MaterialCommunityIcons name="download" color={'white'} size={200} /> */}

      <Video
        source={{
          uri: "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
        }}
        rate={1.0}
        volume={1.0}
        isMuted={false}
        resizeMode="cover"
        shouldPlay={false}
        isLooping={false}
        style={{ height: 200, width: Dimensions.get("window").width }}
        useNativeControls={true}
      />
      <View style={{ position: "absolute" }}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <MaterialCommunityIcons
            name="chevron-down"
            color="white"
            size={40}
            style={{ marginTop: 0 }}
          ></MaterialCommunityIcons>
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>{item.title}</Text>
      <ScrollView horizontal={true} style={{ padding: 10 }}>
        <TouchableOpacity style={styles.button}>
          <Avatar
            // containerStyle={{ marginRight: 10 }}
            size={30}
            rounded
            source={{
              uri:
                "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
            }}
            onPress={() => navigation.navigate("Profile")}
          ></Avatar>
          <Text style={styles.tagButton}>{item.author}</Text>
        </TouchableOpacity>
      </ScrollView>
      <Text style={{ color: "#d6d6d6", fontSize: 12, paddingLeft: 10 }}>
        {item.level} • {item.release} • {item.duration}
      </Text>
      <View style={{display: 'flex', flexDirection:'row', justifyContent:'space-around', marginTop: 20}}>
        <View style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <TouchableOpacity
            style={{
              justifyContent: "center",
              alignItems: "center",
              width: 50,
              height: 50,
              borderRadius: 50,
              backgroundColor: "gray",
            }}
          >
            <MaterialCommunityIcons
              name="bookmark-plus-outline"
              color="white"
              size={30}
            ></MaterialCommunityIcons>
          </TouchableOpacity>
          <Text style={{ color: "white", fontWeight: "bold" }}>Bookmark</Text>
        </View>
        <View style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <TouchableOpacity
            style={{
              justifyContent: "center",
              alignItems: "center",
              width: 50,
              height: 50,
              borderRadius: 50,
              backgroundColor: "gray",
            }}
          >
            <MaterialCommunityIcons
              name="access-point-network"
              color="white"
              size={30}
            ></MaterialCommunityIcons>
          </TouchableOpacity>
          <Text style={{ color: "white", fontWeight: "bold" }}>Add to Chanel</Text>
        </View>
        <View style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <TouchableOpacity
            style={{
              justifyContent: "center",
              alignItems: "center",
              width: 50,
              height: 50,
              borderRadius: 50,
              backgroundColor: "gray",
            }}
          >
            <MaterialCommunityIcons
              name="download"
              color="white"
              size={30}
            ></MaterialCommunityIcons>
          </TouchableOpacity>
          <Text style={{ color: "white", fontWeight: "bold" }}>Download</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#212121",
    marginTop: 30,
  },
  title: {
    color: "white",
    fontSize: 25,
    marginTop: 20,
    marginLeft: 10,
  },
  button: {
    borderRadius: 50,

    backgroundColor: "#505050",
    marginRight: 10,
    flexDirection: "row",
  },
  tagButton: {
    color: "white",
    marginLeft: 10,
    marginRight: 10,
    marginTop: 5,
    marginBottom: 5,
  },
});
