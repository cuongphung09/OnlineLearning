import React, { useState } from "react";
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
import { TabView, SceneMap,TabBar } from 'react-native-tab-view';
export default function CoursesDetail({ navigation, props, route }) {
  // console.log(props, route, navigation);
  const [textHeight, setTextHeight] = useState(75)
  const [chevron, setchevron] = useState('chevron-down')
  const { item } = route.params;
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'CONTENTS' },
    { key: 'second', title: 'TRANSCRIPT' },
  ]);

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });
  return (
    <View style={{ marginTop: 30, backgroundColor: "#212121", height: '100%', paddingBottom: 30 }}>
      <View>
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
          style={{ height: 200, width: Dimensions.get("window").width, position: 'absolute' }}
          useNativeControls={true}
        />
        <View style={{ position: 'absolute' }}>
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
      </View>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>{item.title}</Text>
        <ScrollView horizontal={true} style={{ padding: 10 }}>
          <TouchableOpacity style={styles.button}>
            <Avatar
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
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', marginTop: 20, marginBottom: 20 }}>
          <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <TouchableOpacity
              style={{
                justifyContent: "center",
                alignItems: "center",
                width: 50,
                height: 50,
                borderRadius: 50,
                backgroundColor: "#505050",
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
          <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <TouchableOpacity
              style={{
                justifyContent: "center",
                alignItems: "center",
                width: 50,
                height: 50,
                borderRadius: 50,
                backgroundColor: "#505050",
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
          <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <TouchableOpacity
              style={{
                justifyContent: "center",
                alignItems: "center",
                width: 50,
                height: 50,
                borderRadius: 50,
                backgroundColor: "#505050",
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
        <View style={{
          display: 'flex', flexDirection: 'row', height: textHeight, marginBottom: 20
        }}>
          <View style={{ width: '88%', marginLeft: 10, marginRight: 0 }}>
            <Text style={{ color: 'white', height: textHeight }}>
              Angular is a platform and framework for building single-page client applications using HTML and TypeScript. Angular is written in TypeScript. It implements core and optional functionality as a set of TypeScript libraries that you import into your apps.

              The architecture of an Angular application relies on certain fundamental concepts. The basic building blocks are NgModules, which provide a compilation context for components. NgModules collect related code into functional sets; an Angular app is defined by a set of NgModules. An app always has at least a root module that enables bootstrapping, and typically has many more feature modules.
          </Text>
          </View>

          <TouchableOpacity style={{
            display: 'flex', backgroundColor: '#505050', borderRadius: 5,
            justifyContent: 'center', marginRight: 10, alignItems: 'center'
          }}
            onPress={() => {
              textHeight === 75 ? setTextHeight(null) : setTextHeight(75)
              chevron === 'chevron-down' ? setchevron('chevron-up') : setchevron('chevron-down')
            }}
          >
            <MaterialCommunityIcons
              name={chevron}
              color="white"
              size={20}

            ></MaterialCommunityIcons>
          </TouchableOpacity>
        </View>
        <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <TouchableOpacity style={{ backgroundColor: '#505050', width: '94%', height: 40, justifyContent: 'center', alignItems: 'center', borderRadius: 5, marginBottom: 20 }}>
            <Text style={styles.whiteText}>
              Take a learning check
          </Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ backgroundColor: '#505050', width: '94%', height: 40, justifyContent: 'center', alignItems: 'center', borderRadius: 5, marginBottom: 20 }}>
            <Text style={styles.whiteText}>
              View related paths and courses
          </Text>
          </TouchableOpacity>
        </View>
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          renderTabBar={renderTabBar}
          onIndexChange={setIndex}
          initialLayout={initialLayout}
          style={{backgroundColor: '#212121'}}
        />
      </ScrollView>
    </View>

  );
}
const FirstRoute = () => (
  <View style={[styles.scene, { backgroundColor: '#212121' }]} >
  </View>
);
const renderTabBar = props => (
  <TabBar
    {...props}
    indicatorStyle={{ backgroundColor: '#0084BD' }}
    style={{ backgroundColor: '#212121' }}
    activeColor='#0084BD'
  />
);
const SecondRoute = () => (
  <View style={[styles.scene, { backgroundColor: '#212121' }]} ></View>
);

const initialLayout = { width: Dimensions.get('window').width };
const styles = StyleSheet.create({

  container: {

    backgroundColor: "#212121",

    marginTop: 200,
    // position: 'relative'
  },
  whiteText: {
    color: 'white'
  },
  scene: {
    flex: 1,
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
