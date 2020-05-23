import React from "react";
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, ScrollView } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Video } from "expo-av";
import { Avatar } from "react-native-elements";

export default function CoursesDetail({ navigation, props, route }) {

  const { item } = route.params
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
        style={{ height: 200, width: Dimensions.get('window').width }}
        useNativeControls={true}
      />
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
          />
          <Text style={styles.tagButton}>{item.author}</Text>
        </TouchableOpacity>
      </ScrollView>
      <Text style={{ color: '#d6d6d6', fontSize: 12, paddingLeft: 10 }}>{item.level} • {item.release} • {item.duration}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#212121",

  },
  title: {
    color: 'white',
    fontSize: 25,
    marginTop: 20,
    marginLeft: 10
  },
  button: {
    borderRadius: 50,

    backgroundColor: "#505050",
    marginRight: 10,
    flexDirection: 'row'
  },
  tagButton: {
    color: "white",
    marginLeft: 10,
    marginRight: 10,
    marginTop: 5,
    marginBottom: 5,
  },
});
