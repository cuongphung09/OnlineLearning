import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  AsyncStorage,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Video } from "expo-av";
import { Rating } from "react-native-elements";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import ThemeContext from "../Context/theme-context";
export default function CoursesDetail({ navigation, props, route }) {
  const [textHeight, setTextHeight] = useState(75);
  const [chevron, setchevron] = useState("chevron-down");
  const { item } = route.params;
  const [vidURL, setVidURL] = useState(item.promoVidUrl);
  const [index, setIndex] = React.useState(0);
  const [token, setToken] = useState("");
  const [learnWhat, setLearnWhat] = useState([]);
  const [requirement, setRequirement] = useState([]);
  const [courseData, setCourseData] = useState();
  const [courseDataTraier, setCourseDataTraier] = useState();
  useEffect(() => {
    const getCourseDetail = async () => {
      const tokenTemp = await AsyncStorage.getItem("token");
      const userInfoTemp = await AsyncStorage.getItem("userInfo");

      let paid = await fetch(
        `https://api.itedu.me/course/detail-with-lesson/${item.id}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${tokenTemp}`,
          },
        }
      );
      let paidJson = await paid.json();
      setCourseData(paidJson.payload);

      let demo = await fetch(
        `https://api.itedu.me/course/get-course-detail/${item.id}/${
          JSON.parse(userInfoTemp).id
        }`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${tokenTemp}`,
          },
        }
      );
      let demoJson = await demo.json();
      setCourseDataTraier(demoJson.payload);
      setToken(tokenTemp);
    };
    getCourseDetail();
    const learnWhatTemp = item.learnWhat.map((element, index) => ({
      id: index,
      item: element,
    }));
    setLearnWhat(learnWhatTemp);
    const requirementTemp = item.requirement.map((element, index) => ({
      id: index,
      item: element,
    }));
    setRequirement(requirementTemp);
  }, []);
  const courseId = item.id;
  function convert(a) {
    if (a) {
      var unixtimestamp = a;
      var months_arr = [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
      ];
      var date = new Date(unixtimestamp * 1000);
      var year = date.getFullYear();
      var month = months_arr[date.getMonth()];
      var day = date.getDate();
      var hours = date.getHours();
      var minutes = "0" + date.getMinutes();
      var seconds = "0" + date.getSeconds();
      var convdataTime = `${day}/${month}/${year}`;
      return convdataTime;
    } else {
      return "";
    }
  }
  return courseData ? (
    <ThemeContext.Consumer>
      {([theme, setTheme]) => {
        return (
          <View
            style={{
              marginTop: 30,
              backgroundColor: theme.background,
              height: "100%",
              paddingBottom: 30,
            }}
          >
            <View>
              <Video
                source={{
                  uri: courseData.promoVidUrl,
                }}
                rate={1.0}
                volume={1.0}
                isMuted={false}
                resizeMode="cover"
                shouldPlay={false}
                isLooping={false}
                style={{
                  height: 200,
                  width: Dimensions.get("window").width,
                  position: "absolute",
                }}
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
            </View>
            <ScrollView
              style={[styles.container, { backgroundColor: theme.background }]}
            >
              <Text style={[styles.title, { color: theme.foreground }]}>
                {courseData.title}
              </Text>
              <Text style={[styles.subtitle, { color: theme.foreground }]}>
                {courseData.subtitle}
              </Text>
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
              <Text
                style={{ marginLeft: 10, marginTop: 20, fontWeight: "bold" }}
              >
                Bạn sẽ học được
              </Text>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <View style={{ width: "88%", marginLeft: 10, marginRight: 0 }}>
                  <Text style={{ color: theme.foreground, height: textHeight }}>
                    {learnWhat ? (
                      learnWhat.map((item) => (
                        <Text key={item.id}>
                          ✓ {item.item}
                          {"\n"}
                        </Text>
                      ))
                    ) : (
                      <Text></Text>
                    )}
                  </Text>
                </View>
              </View>
              <Text
                style={{ marginLeft: 10, marginTop: 20, fontWeight: "bold" }}
              >
                Yêu cầu
              </Text>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <View style={{ marginLeft: 10, marginRight: 0 }}>
                  <Text style={{ color: theme.foreground }}>
                    {requirement.map((item) => (
                      <Text key={item.id}>
                        ✓ {item.item}
                        {"\n"}
                      </Text>
                    ))}
                  </Text>
                </View>
              </View>
              <Text style={{ marginLeft: 10, fontWeight: "bold" }}>Mô tả</Text>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <View style={{ width: "88%", marginLeft: 10, marginRight: 0 }}>
                  <Text
                    style={{
                      color: theme.foreground,
                    }}
                  >
                    {courseData.description}
                    {"\n"}
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
              <Text style={{ marginLeft: 10, fontWeight: "bold" }}>
                Danh sách bài học
              </Text>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                }}
              ></View>
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
        );
      }}
    </ThemeContext.Consumer>
  ) : (
    <ThemeContext.Consumer>
      {([theme, setTheme]) => {
        return (
          <View
            style={{
              marginTop: 30,
              backgroundColor: theme.background,
              height: "100%",
              paddingBottom: 30,
            }}
          >
            <View>
              <Video
                source={{
                  uri: vidURL,
                }}
                rate={1.0}
                volume={1.0}
                isMuted={false}
                resizeMode="cover"
                shouldPlay={false}
                isLooping={false}
                style={{
                  height: 200,
                  width: Dimensions.get("window").width,
                  position: "absolute",
                }}
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
            </View>
            <ScrollView
              style={[styles.container, { backgroundColor: theme.background }]}
            >
              <Text style={[styles.title, { color: theme.foreground }]}>
                {courseDataTraier ? courseDataTraier.title : ""}
              </Text>
              <Text style={[styles.subtitle, { color: theme.foreground }]}>
                {courseDataTraier ? courseDataTraier.subtitle : ""}
              </Text>
              <View style={styles.rating}>
                <Rating
                  type={"custom"}
                  imageSize={20}
                  readonly
                  tintColor={theme.background}
                  startingValue={
                    courseDataTraier ? courseDataTraier.ratedNumber : 0
                  }
                />
                <Text style={{ color: theme.foreground }}>
                  {" "}
                  ({courseDataTraier ? courseDataTraier.ratedNumber : ""} bình
                  chọn)
                </Text>
              </View>
              <Text style={{ marginLeft: 10, color: theme.foreground }}>
                Số lượng học viên:{" "}
                {courseDataTraier ? courseDataTraier.soldNumber : ""}
              </Text>
              <Text style={{ marginLeft: 10, color: theme.foreground }}>
                Cập nhật mới nhất:{" "}
                {convert(
                  Date.parse(
                    courseDataTraier ? courseDataTraier.updatedAt : ""
                  ) / 1000
                )}
              </Text>

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
              <Text
                style={{
                  marginLeft: 10,
                  marginTop: 20,
                  fontWeight: "bold",
                  color: theme.foreground,
                }}
              >
                Bạn sẽ học được
              </Text>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <View style={{ width: "88%", marginLeft: 10, marginRight: 0 }}>
                  <Text style={{ color: theme.foreground }}>
                    {learnWhat.length !== 0 ? (
                      learnWhat.map((item) => (
                        <Text key={item.id}>✓ {item.item}</Text>
                      ))
                    ) : (
                      <Text>(không có)</Text>
                    )}
                  </Text>
                </View>
              </View>
              <Text
                style={{
                  marginLeft: 10,
                  marginTop: 20,
                  fontWeight: "bold",
                  color: theme.foreground,
                }}
              >
                Yêu cầu
              </Text>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <View style={{ marginLeft: 10, marginRight: 0 }}>
                  <Text style={{ color: theme.foreground }}>
                    {requirement.length !== 0 ? (
                      requirement.map((item) => (
                        <Text key={item.id}>✓ {item.item}</Text>
                      ))
                    ) : (
                      <Text>(không có)</Text>
                    )}
                  </Text>
                </View>
              </View>
              <Text
                style={{
                  marginLeft: 10,
                  fontWeight: "bold",
                  color: theme.foreground,
                }}
              >
                Mô tả
              </Text>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <View style={{ width: "88%", marginLeft: 10, marginRight: 0 }}>
                  <Text
                    style={{
                      color: theme.foreground,
                    }}
                  >
                    {item.description}
                    {"\n"}
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
              <Text
                style={{
                  marginLeft: 10,
                  fontWeight: "bold",
                  color: theme.foreground,
                }}
              >
                Danh sách bài học
              </Text>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <View style={{ width: "95%", marginLeft: 10, marginRight: 0 }}>
                  {/* <Text>TRAILER</Text> */}
                  {courseDataTraier ? (
                    courseDataTraier.section.map((element) => {
                      return (
                        <View key={element.numberOrder}>
                          <Text style={{ color: theme.foreground }}>
                            Phần {element.numberOrder}. {element.name}
                          </Text>
                          {element.lesson.map((ls) => {
                            return (
                              <View
                                key={ls.numberOrder}
                                style={{
                                  flex: 1,
                                  flexDirection: "row",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                  marginLeft: 10,
                                }}
                              >
                                <Text style={{ color: theme.foreground }}>
                                  Bài {ls.numberOrder}. {ls.name}
                                </Text>
                                <TouchableOpacity
                                  onPress={() => {
                                    setVidURL(ls.videoUrl);
                                  }}
                                >
                                  <Text
                                    style={{
                                      borderColor: theme.foreground,
                                      color: theme.foreground,
                                      borderWidth: 1,
                                      borderRadius: 5,
                                    }}
                                  >
                                    Xem bài giảng
                                  </Text>
                                </TouchableOpacity>
                              </View>
                            );
                          })}
                        </View>
                      );
                    })
                  ) : (
                    <Text>no</Text>
                  )}
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
        );
      }}
    </ThemeContext.Consumer>
  );
}
const initialLayout = { width: Dimensions.get("window").width };
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#212121",

    marginTop: 200,
    // position: 'relative'
  },
  rating: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginLeft: 10,
    flex: 1,
    flexDirection: "row",
  },
  scene: {
    flex: 1,
  },
  title: {
    color: "white",
    fontSize: 25,
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
  },
  subtitle: {
    color: "white",
    fontSize: 15,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
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
