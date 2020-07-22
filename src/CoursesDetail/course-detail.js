import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  AsyncStorage,
  Alert,
  StatusBar,
} from "react-native";
import { WebView } from 'react-native-webview';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
// import { Constants, Video } from 'expo';
import * as ScreenOrientation from 'expo-screen-orientation';
import VideoPlayer from 'expo-video-player'
import { Video } from 'expo-av'
import { Rating, Avatar } from "react-native-elements";
import ThemeContext from "../Context/theme-context";
import RatingDetail from '../Component/ratingDetail'
import SectionCourse from '../Main/Home/SectionCourses/section-courses'
export default function CoursesDetail({ navigation, props, route }) {
  const [orientationIsLandscape, setOrientationIsLandscape] = useState(false);
  const [rere, setrere] = useState(false)
  const [textHeight, setTextHeight] = useState(75);
  const [chevron, setchevron] = useState("chevron-down");
  const [introHeight, setIntroHeight] = useState(75);
  const [chevronIntro, setchevronIntro] = useState("chevron-down");
  const { item } = route.params;
  const [vidURL, setVidURL] = useState(item.promoVidUrl);
  const [index, setIndex] = React.useState(0);
  const [token, setToken] = useState("");
  const [learnWhat, setLearnWhat] = useState([]);
  const [requirement, setRequirement] = useState([]);
  const [courseData, setCourseData] = useState();
  const [paid, setPaid] = useState();
  const [likeStatus, setLikeStatus] = useState(false)
  const [FScreen, setFScreen] = useState(false)
  const width = Dimensions.get('window').width
  const height = Dimensions.get('window').height
  const [w, setw] = useState(width)
  const [h, setH] = useState(200)
  console.log(item.id)
  useEffect(() => {
    const getCourseDetail = async () => {
      const tokenTemp = await AsyncStorage.getItem("token");
      const userInfoTemp = await AsyncStorage.getItem("userInfo");
      let pay = await fetch(`https://api.itedu.me/user/check-own-course/${item.id}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenTemp}`,
        },
      })
      let payJson = await pay.json()
      setPaid((payJson.payload))
      let demo = await fetch(
        `https://api.itedu.me/course/get-course-detail/${item.id}/${JSON.parse(userInfoTemp).id}`,
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
      let like = await fetch(
        `https://api.itedu.me/user/get-course-like-status/${item.id}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${tokenTemp}`,
          },
        }
      );
      let likeJson = await like.json();
      setLikeStatus(likeJson.likeStatus)
      setCourseData(demoJson.payload);
      setToken(tokenTemp);
    };
    getCourseDetail();
    const learnWhatTemp = item.learnWhat ? item.learnWhat.map((element, index) => ({
      id: index,
      item: element,
    })) : [];
    setLearnWhat(learnWhatTemp);
    const requirementTemp = item.requirement ? item.requirement.map((element, index) => ({
      id: index,
      item: element,
    })) : [];
    setRequirement(requirementTemp);
    setVidURL(item.promoVidUrl)
  }, [item.id]);
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
      // var hours = date.getHours();
      // var minutes = "0" + date.getMinutes();
      // var seconds = "0" + date.getSeconds();
      var convdataTime = `${day}/${month}/${year}`;
      return convdataTime;
    } else {
      return "";
    }
  }
  return (
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
              <VideoPlayer
                videoProps={
                  {
                    source: {
                      uri: vidURL,
                    },
                    shouldPlay: true,
                    resizeMode: Video.RESIZE_MODE_CONTAIN,
                    // : 'absolute'
                  }
                }

                isPortrait={true}
                playFromPositionMillis={0}
                inFullscreen={FScreen}
                showControlsOnLoad={true}
                showFullscreenButton={true}
                width={FScreen ? 700 : 360}
                height={FScreen ? 330 : 200}
                switchToLandscape={async () => {
                  ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_LEFT)
                  setFScreen(true)
                }}
                switchToPortrait={async () => {
                  ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP)
                  setFScreen(false)
                }}


              />

              <View style={{ position: "absolute" }}>
                <TouchableOpacity
                  onPress={() => {

                    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP)
                    setFScreen(false)
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
                {courseData ? courseData.title : ""}
              </Text>
              <Text style={[styles.subtitle, { color: theme.foreground }]}>
                {courseData ? courseData.subtitle : ""}
              </Text>
              
              <View style={styles.rating}>
                <Rating
                  type={"custom"}
                  imageSize={20}
                  readonly
                  tintColor={theme.background}
                  ratingColor='yellow'
                  ratingBackgroundColor='#c8c7c8'
                  startingValue={
                    courseData ? parseFloat(courseData.averagePoint) : 0
                  }
                />
                <Text style={{ color: theme.foreground }}>
                  {" "}
                  ({courseData ? courseData.ratedNumber : "0"} bình
                  chọn)
                </Text>
              </View>
              <Text style={{ marginLeft: 10, color: theme.foreground }}>
                Số lượng học viên:{" "}
                {courseData ? courseData.soldNumber : "0"}
              </Text>
              <Text style={{ marginLeft: 10, color: theme.foreground }}>
                Cập nhật mới nhất:{" "}
                {
                  courseData ? convert(Date.parse(courseData.updatedAt) / 1000) : "NaN"
                }
              </Text>
              {
                paid ? (
                  !paid.isInstructorOwnCourse && !paid.isUserOwnCourse ? (
                    <TouchableOpacity style={{
                      marginTop: 10,
                      justifyContent: 'center',
                      alignSelf: 'center',
                      alignItems: 'center',
                      borderColor: '#0084BD',
                      borderWidth: 1,
                      width: Dimensions.get('window').width * 90 / 100,
                      height: 40,
                      borderRadius: 5
                    }}
                      onPress={async () => {
                        let join = await fetch(
                          `https://api.itedu.me/payment/get-free-courses`,
                          {
                            method: "POST",
                            headers: {
                              Accept: "application/json",
                              "Content-Type": "application/json",
                              Authorization: `Bearer ${token}`,
                            },
                            body: JSON.stringify({
                              courseId: item.id
                            })
                          }
                        );
                        let joinJson = await join.json();
                        Alert.alert(joinJson.messsage)
                        setrere(true)
                      }}
                    >
                      <Text style={{ color: '#0084BD' }}>Mua ngay với giá {courseData ? courseData.price : '0'} đồng</Text>
                    </TouchableOpacity>
                  ) : (
                      <View>
                      </View>
                    )
                ) : (
                    <View></View>
                  )
              }
              <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', marginTop: 20, marginBottom: 20 }}>
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
                    onPress={async () => {
                      let dolike = await fetch(`https://api.itedu.me/user/like-course`, {
                        method: "POST",
                        headers: {
                          Accept: "application/json",
                          "Content-Type": "application/json",
                          Authorization: `Bearer ${token}`,
                        },
                        body: JSON.stringify({
                          courseId: item.id
                        })
                      })
                      let dolikeJson = await dolike.json()
                      setLikeStatus(dolikeJson.likeStatus)
                    }}
                  >
                    <MaterialCommunityIcons
                      name="heart"
                      color={likeStatus ? 'red' : theme.foreground}
                      size={30}
                    ></MaterialCommunityIcons>
                  </TouchableOpacity>
                  <Text style={{ color: theme.foreground, fontWeight: "bold" }}>Yêu thích</Text>
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
              </View>
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
                        <Text key={item.id}>✓ {item.item}{"\n"}</Text>
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

              {item.description ? (
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    height: textHeight
                  }}
                >
                  <View style={{ width: "88%", marginLeft: 10, marginRight: 0, height: textHeight }}>
                    <Text
                      style={{
                        color: theme.foreground,
                        height: textHeight
                      }}
                    >
                      {item.description}
                      {"\n"}
                    </Text>
                  </View>

                  <TouchableOpacity style={{
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
                  </TouchableOpacity>
                </View>
              ) : (
                  <View style={{ marginLeft: 10 }}>
                    <Text>(không có)</Text>
                  </View>
                )}
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
                <View style={{ width: "95%", marginLeft: 10, marginRight: 0, height: 'auto' }}>
                  {courseData ? (
                    courseData.section.map((element) => {
                      return (
                        <View key={element.numberOrder}>
                          <Text style={{ color: theme.foreground, fontWeight: '700' }}>
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
                                  // width: '65%'
                                }}
                              >
                                <Text style={{ color: theme.foreground, width: '60%' }}>
                                  <Text style={{ fontSize: 20 }}>↳</Text> Bài {ls.numberOrder}. {ls.name}
                                </Text>

                                {
                                  paid ? (
                                    paid.isInstructorOwnCourse || paid.isUserOwnCourse ? (
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
                                      </TouchableOpacity>)
                                      :

                                      (
                                        ls.isPreview ? (
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
                                              Xem trước
                                                                      </Text>
                                          </TouchableOpacity>
                                        )
                                          :
                                          (
                                            (<Text style={{ width: '40%' }}>
                                              Mua khóa học để xem bài giảng
                                            </Text>)
                                          )
                                      )
                                  ) : (<Text style={{ width: '40%' }}>
                                    Phiên đăng nhập hết hạn
                                  </Text>)
                                }
                              </View>
                            );
                          })}
                        </View>
                      );
                    })
                  ) : (
                      <Text>(không có)</Text>
                    )}
                </View>
              </View>
              <Text
                style={{
                  marginLeft: 10,
                  fontWeight: "bold",
                  color: theme.foreground,
                }}
              >
                Thông tin giáo viên
                  </Text>
              <View style={{ width: "95%", marginLeft: 10, marginRight: 0, flex: 1, flexDirection: 'row', marginBottom: 30 }}>
                <View style={{ marginTop: 10, width: '40%', justifyContent: 'center', alignItems: 'center', flex: 1, flexDirection: 'column' }}>
                  <Avatar
                    containerStyle={{}}
                    size={80}
                    rounded
                    source={{
                      uri: courseData ? courseData.instructor.avatar : 'https://s3.amazonaws.com/37assets/svn/765-default-avatar.png',
                    }}
                  />
                  <Text style={{ color: theme.foreground }}><Text style={{ fontWeight: 'bold' }}>{courseData ? courseData.instructor.soldNumber : '0'}</Text> học viên</Text>
                  <Text style={{ color: theme.foreground }}><Text style={{ fontWeight: 'bold' }}>{courseData ? courseData.instructor.totalCourse : '0'}</Text> khóa học</Text>
                  <Text style={{ color: theme.foreground }}><Text style={{ fontWeight: 'bold' }}>{courseData ? courseData.instructor.averagePoint.toFixed(1) : '0'}</Text>/5 điểm</Text>
                  {/* {console.log(courseData ? courseData.id : '')} */}
                </View>
                <View style={{ marginTop: 10, width: '60%' }}>
                  <Text style={{ fontWeight: 'bold', color: theme.foreground }}>{courseData ? courseData.instructor.name : 'Họ và tên'}</Text>
                  <View style={{ flexDirection: 'row', width: '90%' }}>
                    <Text style={{ color: theme.foreground, height: introHeight }}>{courseData ? (courseData.instructor.intro ? (<Text >{courseData.instructor.intro}</Text>) : '(Chưa có bài tự giới thiệu)') : '(Chưa có bài tự giới thiệu)'}</Text>
                    {courseData ?
                      (courseData.instructor.intro ?
                        (
                          <TouchableOpacity style={{
                            display: 'flex', backgroundColor: theme.tagButton, borderRadius: 5,
                            justifyContent: 'center', marginRight: 10, alignItems: 'center', height: introHeight
                          }}
                            onPress={() => {
                              introHeight === 75 ? setIntroHeight(null) : setIntroHeight(75)
                              chevronIntro === 'chevron-down' ? setchevronIntro('chevron-up') : setchevronIntro('chevron-down')
                            }}
                          >
                            <MaterialCommunityIcons
                              name={chevronIntro}
                              color={theme.foreground}
                              size={20}

                            ></MaterialCommunityIcons>
                          </TouchableOpacity>

                        )
                        :
                        <View></View>)
                      :
                      <View></View>
                    }
                  </View>

                </View>


              </View>
              <Text
                style={{
                  marginLeft: 10,
                  fontWeight: "bold",
                  color: theme.foreground,
                }}
              >
                Đánh giá từ học viên
                </Text>
              <View style={{ width: "95%", marginLeft: 10, marginRight: 0, flex: 1, flexDirection: 'row', marginBottom: 30 }}>
                <View style={{ marginTop: 10, width: '45%', justifyContent: 'center', alignItems: 'center', flex: 1, flexDirection: 'column' }}>
                  <Text style={{ color: theme.foreground, fontSize: 60 }}>{courseData ? courseData.averagePoint : '0'}</Text>
                  <Text style={{ color: theme.foreground }}><Text style={{}}>({courseData ? courseData.ratings.ratingList.length : '0'}</Text> bình chọn)</Text>
                  <Text style={{ color: theme.foreground }}><Text style={{ fontWeight: 'bold' }}>{courseData ? (courseData.ratings.ratingList[0] ? courseData.ratings.ratingList[0].contentPoint : '0') : '0'}</Text> điểm nội dung</Text>
                  <Text style={{ color: theme.foreground }}><Text style={{ fontWeight: 'bold' }}>{courseData ? (courseData.ratings.ratingList[0] ? courseData.ratings.ratingList[0].formalityPoint : '0') : '0'}</Text> điểm hình thức</Text>
                  <Text style={{ color: theme.foreground }}><Text style={{ fontWeight: 'bold' }}>{courseData ? (courseData.ratings.ratingList[0] ? courseData.ratings.ratingList[0].presentationPoint : '0') : '0'}</Text> điểm truyền đạt</Text>
                </View>
                <View style={{ marginTop: 10, width: '55%' }}>
                  <RatingDetail data={courseData ? courseData.ratings : {}} navigation={navigation} />
                </View>
              </View>
              <Text
                style={{
                  marginLeft: 10,
                  fontWeight: "bold",
                  color: theme.foreground,
                }}
              >
                Khóa học cùng chủ đề
                </Text>
              {courseData ? ((courseData.likeCategory !== [] ? (
                <View style={{ marginLeft: 10 }}>
                  <SectionCourse
                    navigation={navigation}
                    name={''}
                    data={courseData ? courseData.coursesLikeCategory : []}
                  />
                </View>
              ) : (<View style={{ marginLeft: 10 }}><Text>(không có)</Text></View>))) : (<View style={{ marginLeft: 10 }}><Text>(không có)</Text></View>)}
              <Text
                style={{
                  marginLeft: 10,
                  fontWeight: "bold",
                  color: theme.foreground,
                }}
              >
                Khóa học được dạy bởi {courseData ? courseData.instructor.name : ''}
              </Text>
              {courseData ? (courseData.instructor.courses !== [] ? (
                <View style={{ marginLeft: 10 }}>
                  <SectionCourse
                    navigation={navigation}
                    name={''}
                    data={courseData ? courseData.instructor.courses : []}
                  />
                </View>
              ) : (<View style={{ marginLeft: 10 }}><Text>(không có)</Text></View>)) : (<View style={{ marginLeft: 10 }}><Text>(không có)</Text></View>)}

            </ScrollView>
          </View>
        );
      }}
    </ThemeContext.Consumer >

  );
}
const initialLayout = { width: Dimensions.get("window").width };
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#212121",
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
