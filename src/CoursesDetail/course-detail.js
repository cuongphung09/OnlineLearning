import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, ScrollView, AsyncStorage } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Video } from "expo-av";
import { Avatar } from "react-native-elements";
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import ThemeContext from '../Context/theme-context'
export default function CoursesDetail({ navigation, props, route }) {
  const [textHeight, setTextHeight] = useState(75)
  const [chevron, setchevron] = useState('chevron-down')
  const { item } = route.params;
  const [index, setIndex] = React.useState(0);
  const [token, setToken] = useState('')
  const [routes] = React.useState([
    { key: 'first', title: 'CONTENTS' },
    { key: 'second', title: 'TRANSCRIPT' },
  ]);
  // const renderScene = SceneMap({
  //   first: FirstRoute,
  //   second: SecondRoute,
  // });
  const [learnWhat, setLearnWhat] = useState([])
  const [requirement, setRequirement] = useState([])
  const [courseData, setCourseData] = useState()
  useEffect(() => {

    const getCourseDetail = async () => {
      const tokenTemp = await AsyncStorage.getItem('token')
      setToken(tokenTemp)
      let demo = await fetch(`https://api.itedu.me/course/detail-with-lesson/${item.id}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${tokenTemp}`,
        },
      })
      let demoJson = await demo.json();
      setCourseData(demoJson.payload)
      console.log(demoJson.payload, item.id)
    }
    getCourseDetail()
    const learnWhatTemp = item.learnWhat.map((element, index) => ({
      id: index,
      item: element
    }))
    setLearnWhat(learnWhatTemp)
    const requirementTemp = item.requirement.map((element, index) => ({
      id: index,
      item: element
    }))
    setRequirement(requirementTemp)
  }, []);
  const courseId = item.id

  return (
    <ThemeContext.Consumer>
      {
        ([theme, setTheme]) => {
          return (
            <View style={{ marginTop: 30, backgroundColor: theme.background, height: '100%', paddingBottom: 30 }}>
              <View>
                <Video
                  source={{
                    uri: item.promoVidUrl,
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
                      color='white'
                      size={40}
                      style={{ marginTop: 0 }}
                    ></MaterialCommunityIcons>
                  </TouchableOpacity>
                </View>
              </View>
              <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
                <Text style={[styles.title, { color: theme.foreground }]}>{item.title}</Text>
                <Text style={[styles.subtitle, { color: theme.foreground }]}>{item.subtitle}</Text>
                {/* <ScrollView horizontal={true} style={{ padding: 10 }}>
                  <TouchableOpacity style={[styles.button, { backgroundColor: theme.background }]}>
                    <Avatar
                      size={30}
                      rounded
                      source={{
                        uri:
                          "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
                      }}
                      onPress={() => navigation.navigate("Profile")}
                    ></Avatar>
                    <Text style={[styles.tagButton, { color: theme.foreground }]}>{item.author}</Text>
                  </TouchableOpacity>
                </ScrollView>
                <Text style={{ color: theme.foreground, fontSize: 12, paddingLeft: 10 }}>
                  {item.level} • {item.release} • {item.duration}
                </Text> */}

                {/* <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', marginTop: 20, marginBottom: 20 }}>
                  <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <TouchableOpacity
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                        width: 50,
                        height: 50,
                        borderRadius: 50,
                        backgroundColor: theme.tagButton,
                      }}
                    >
                      <MaterialCommunityIcons
                        name="bookmark-plus-outline"
                        color={theme.foreground}
                        size={30}
                      ></MaterialCommunityIcons>
                    </TouchableOpacity>
                    <Text style={{ color: theme.foreground, fontWeight: "bold" }}>Bookmark</Text>
                  </View>
                  <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <TouchableOpacity
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                        width: 50,
                        height: 50,
                        borderRadius: 50,
                        backgroundColor: theme.tagButton,
                      }}
                    >
                      <MaterialCommunityIcons
                        name="access-point-network"
                        color={theme.foreground}
                        size={30}
                      ></MaterialCommunityIcons>
                    </TouchableOpacity>
                    <Text style={{ color: theme.foreground, fontWeight: "bold" }}>Add to Chanel</Text>
                  </View>
                  <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <TouchableOpacity
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                        width: 50,
                        height: 50,
                        borderRadius: 50,
                        backgroundColor: theme.tagButton,
                      }}
                    >
                      <MaterialCommunityIcons
                        name="download"
                        color={theme.foreground}
                        size={30}
                      ></MaterialCommunityIcons>
                    </TouchableOpacity>
                    <Text style={{ color: theme.foreground, fontWeight: "bold" }}>Download</Text>
                  </View>
                </View> */}
                <Text style={{ marginLeft: 10, marginTop: 20, fontWeight: 'bold' }}>Bạn sẽ học được</Text>
                <View style={{
                  display: 'flex', flexDirection: 'row'
                }}>
                  <View style={{ width: '88%', marginLeft: 10, marginRight: 0 }}>
                    <Text style={{ color: theme.foreground, height: textHeight }}>
                      {
                        learnWhat ? (learnWhat.map(item => (
                          <Text key={item.id}>✓ {item.item}{"\n"}</Text>
                        ))) :
                          (<Text></Text>)
                      }
                    </Text>
                  </View>
                </View>
                <Text style={{ marginLeft: 10, marginTop: 20, fontWeight: 'bold' }}>Yêu cầu</Text>
                <View style={{
                  display: 'flex', flexDirection: 'row'
                }}>
                  <View style={{ marginLeft: 10, marginRight: 0 }}>
                    <Text style={{ color: theme.foreground }}>
                      {requirement.map(item => (
                        <Text key={item.id}>✓ {item.item}{"\n"}</Text>
                      ))}
                    </Text>
                  </View>
                </View>
                <Text style={{ marginLeft: 10, fontWeight: 'bold' }}>Mô tả</Text>
                <View style={{
                  display: 'flex', flexDirection: 'row',
                }}>
                  <View style={{ width: '88%', marginLeft: 10, marginRight: 0 }}>
                    <Text style={{
                      color: theme.foreground,
                    }}>
                      {item.description}{'\n'}
                    </Text>
                  </View>

                  {/* <TouchableOpacity style={{
                    display: 'flex', backgroundColor: theme.tagButton, borderRadius: 5,
                    justifyContent: 'center', marginRight: 10, alignItems: 'center'
                  }}
                    onPress={() => {
                      textHeight === 75 ? setTextHeight(null) : setTextHeight(75)
                      chevron === 'chevron-down' ? setchevron('chevron-up') : setchevron('chevron-down')
                    }}
                  >
                    <MaterialCommunityIcons
                      name={chevron}
                      color={theme.foreground}
                      size={20}

                    ></MaterialCommunityIcons>
                  </TouchableOpacity> */}
                </View>
                <Text style={{ marginLeft: 10, fontWeight: 'bold' }}>Danh sách bài học</Text>
                <View style={{
                  display: 'flex', flexDirection: 'row',
                }}>
                  <View style={{ width: '88%', marginLeft: 10, marginRight: 0 }}>
                    <Text style={{
                      color: theme.foreground,
                    }}>
                      {item.description}
                    </Text>
                  </View>
                </View>
                {/* <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                  <TouchableOpacity style={{ backgroundColor: theme.tagButton, width: '94%', height: 40, justifyContent: 'center', alignItems: 'center', borderRadius: 5, marginBottom: 20 }}>
                    <Text style={styles.whiteText, [{ color: theme.foreground }]}>
                      Take a learning check
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={{ backgroundColor: theme.tagButton, width: '94%', height: 40, justifyContent: 'center', alignItems: 'center', borderRadius: 5, marginBottom: 20 }}>
                    <Text style={{ color: theme.foreground }}>
                      View related paths and courses
                    </Text>
                  </TouchableOpacity>
                </View> */}
                {/* <TabView
                  navigationState={{ index, routes }}
                  renderScene={renderScene}
                  renderTabBar={
                    (props) => {
                      return (
                        <TabBar
                          {...props}
                          indicatorStyle={{ backgroundColor: '#0084BD' }}
                          style={{ backgroundColor: theme.background }}
                          activeColor='#0084BD'
                          inactiveColor={theme.foreground}
                        />
                      )
                    }
                  }
                  onIndexChange={setIndex}
                  initialLayout={initialLayout}
                  style={{ backgroundColor: theme.background }}
                  {...theme}
                /> */}
              </ScrollView>
            </View>
          )
        }
      }
    </ThemeContext.Consumer>
  )
}
const FirstRoute = () => (
  <View style={[styles.scene, { backgroundColor: '#212121' }]} >
  </View>
);
// const renderTabBar = props => (
//   <TabBar
//     {...props}
//     indicatorStyle={{ backgroundColor: '#0084BD' }}
//     style={{ backgroundColor: '#212121' }}
//     activeColor='#0084BD'
//   />
// );
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

  scene: {
    flex: 1,
  },
  title: {
    color: "white",
    fontSize: 25,
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10
  },
  subtitle: {
    color: "white",
    fontSize: 15,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10
  },
  button: {
    borderRadius: 50,
    borderWidth: 1,
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
