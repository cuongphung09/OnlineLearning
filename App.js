import React, { useContext, useState, createContext, useMemo, useEffect } from "react";
import { Avatar } from "react-native-elements";
import { StyleSheet, View, AsyncStorage } from "react-native";
import Search from "./Screen/SearchScreen";
import SettingScreen from "./Screen/SettingScreen";
import ProfileScreen from "./Screen/ProfileScreen";
import "react-native-gesture-handler";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
// const Tab = createBottomTabNavigator();
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import ListLesson from "./src/CoursesDetail/ListLesson/list-lesson";
import DownloadScreen from "./Screen/DownloadScreen";
import BrowseScreen from "./src/Main/Browse/BrowseScreen";
import CoursesDetail from "./src/CoursesDetail/course-detail";
import CustomMenuIcon from "./src/Component/pop-up-menu";
import HomeScreen from "./src/Main/Home/HomeScreen";
import SplashScreen from "./Screen/SplashScreen";
import LoginScreen from "./Screen/LoginScreen";

import ThemeContext, { themes } from "./src/Context/theme-context";
import PathScreen from "./Screen/PathScreen";
import PathDetailScreen from "./Screen/PathDetailScreen";
import AuthorDetailScreen from "./Screen/AuthorScreen";
import AuthContext, { users } from "./src/Context/auth-context";
import SignUpScreen from "./Screen/SignUpScreen";
// import AuthContext from './src/Context/auth-context'
const Stack = createStackNavigator();
const HomeStack = createStackNavigator();
const DownloadStack = createStackNavigator();
const BrowseStack = createStackNavigator();
const Tab = createBottomTabNavigator();

function Home({ navigation }) {
  return (
    <AuthContext.Consumer>
      {([user, setUser]) => {
        return (
          <ThemeContext.Consumer>
            {([theme, setTheme]) => {
              return (
                <HomeStack.Navigator
                  headerMode="screen"
                  screenOptions={({ navigation, route }) => ({
                    headerTitleStyle: {
                      color: theme.foreground,
                    },
                    headerStyle: {
                      backgroundColor: theme.header,
                    },
                    headerRight: () => (
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Avatar
                          containerStyle={{ marginRight: 10 }}
                          size={25}
                          rounded
                          source={{
                            uri: user.avatar,
                          }}
                          onPress={() => navigation.navigate("Profile")}
                        />
                        <CustomMenuIcon
                          //Menu Text
                          menutext="Menu"
                          //Menu View Style
                          menustyle={{
                            marginRight: 16,
                            flexDirection: "row",
                            justifyContent: "flex-end",
                          }}
                          textStyle={{
                            color: theme.foreground,
                          }}
                          option1Click={() => {
                            navigation.navigate("Setting");
                          }}
                          option2Click={() => { }}
                          option3Click={() => { }}
                        />
                      </View>
                    ),
                  })}
                >
                  <HomeStack.Screen
                    name="Trang chủ"
                    component={HomeScreen}
                  ></HomeStack.Screen>
                </HomeStack.Navigator>
              );
            }}
          </ThemeContext.Consumer>
        )
      }}
    </AuthContext.Consumer>
  );
}
function Download({ navigation }) {
  return (
    <AuthContext.Consumer>
      {([user, setUser]) => {
        return <ThemeContext.Consumer>
          {([theme, setTheme]) => {
            return (
              <DownloadStack.Navigator
                headerMode="screen"
                screenOptions={({ navigation, route }) => ({
                  headerTitleStyle: {
                    color: theme.foreground,
                  },
                  headerStyle: {
                    backgroundColor: theme.header,
                  },
                  headerRight: () => (
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Avatar
                        containerStyle={{ marginRight: 10 }}
                        size={25}
                        rounded
                        source={{
                          uri: user.avatar,
                        }}
                        onPress={() => navigation.navigate("Profile")}
                      />
                      <CustomMenuIcon
                        //Menu Text
                        menutext="Menu"
                        //Menu View Style
                        menustyle={{
                          marginRight: 16,
                          flexDirection: "row",
                          justifyContent: "flex-end",
                        }}
                        textStyle={{
                          color: "white",
                        }}
                        option1Click={() => {
                          navigation.navigate("Setting");
                        }}
                        option2Click={() => { }}
                        option3Click={() => { }}
                      />
                    </View>
                  ),
                })}
              >
                <DownloadStack.Screen
                  name="Tải về"
                  component={DownloadScreen}
                ></DownloadStack.Screen>
              </DownloadStack.Navigator>
            );
          }}
        </ThemeContext.Consumer>
      }}
    </AuthContext.Consumer>
  );
}
function Browse({ navigation }) {
  return (
    <AuthContext.Consumer>
      {([user, setUser]) => {
        return (
          <ThemeContext.Consumer>
            {([theme, setTheme]) => {
              return (
                <BrowseStack.Navigator
                  headerMode="screen"
                  screenOptions={({ navigation, route }) => ({
                    headerTitleStyle: {
                      color: theme.foreground,
                    },
                    headerStyle: {
                      backgroundColor: theme.header,
                    },
                    headerRight: () => (
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Avatar
                          containerStyle={{ marginRight: 10 }}
                          size={25}
                          rounded
                          source={{
                            uri: user.avatar,
                          }}
                          onPress={() => navigation.navigate("Profile")}
                        />
                        <CustomMenuIcon
                          //Menu Text
                          menutext="Menu"
                          //Menu View Style
                          menustyle={{
                            marginRight: 16,
                            flexDirection: "row",
                            justifyContent: "flex-end",
                          }}
                          textStyle={{
                            color: "white",
                          }}
                          option1Click={() => {
                            navigation.navigate("Setting");
                          }}
                          option2Click={() => { }}
                          option3Click={() => { }}
                        />
                      </View>
                    ),
                  })}
                >
                  <BrowseStack.Screen
                    name="Duyệt"
                    component={BrowseScreen}
                  ></BrowseStack.Screen>
                </BrowseStack.Navigator>
              );
            }}
          </ThemeContext.Consumer>
        )
      }}
    </AuthContext.Consumer>
  );
}
function Main({ navigation }) {

  return (
    <AuthContext.Consumer>
      {([user, setUser]) => {
        // console.log(user)
        return (<ThemeContext.Consumer>
          {([theme, setTheme]) => {
            return (
              <Tab.Navigator
                initialRouteName="Home"
                tabBarOptions={{
                  activeBackgroundColor: theme.header,
                  inactiveBackgroundColor: theme.header,
                  inactiveTintColor: theme.inactiveTintColor,
                  activeTintColor: theme.activeTintColor,
                  keyboardHidesTabBar: true,
                }}
              >
                <Tab.Screen
                  name="Home"
                  component={Home}
                  options={{
                    tabBarLabel: "Trang chủ",
                    tabBarIcon: ({ color, size }) => (
                      <MaterialCommunityIcons
                        name="home-outline"
                        color={color}
                        size={size + 5}
                      />
                    ),
                  }}
                />
                <Tab.Screen
                  name="Download"
                  component={Download}
                  options={{
                    tabBarLabel: "Tải về",
                    tabBarIcon: ({ color, size }) => (
                      <MaterialCommunityIcons
                        name="download"
                        color={color}
                        size={size + 5}
                      />
                    ),
                  }}
                />
                <Tab.Screen
                  name="Browse"
                  component={Browse}
                  options={{
                    tabBarLabel: "Duyệt",
                    tabBarIcon: ({ color, size }) => (
                      <MaterialCommunityIcons
                        name="grid"
                        color={color}
                        size={size + 5}
                      />
                    ),
                  }}
                />
                <Tab.Screen
                  name="Tìm kiếm"
                  component={Search}
                  options={{
                    tabBarLabel: "Tìm kiếm",
                    tabBarIcon: ({ color, size }) => (
                      <MaterialCommunityIcons
                        name="magnify"
                        color={color}
                        size={size + 5}
                      />
                    ),
                  }}
                />
              </Tab.Navigator>
            );
          }}
        </ThemeContext.Consumer>)
      }}
    </AuthContext.Consumer>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [token, setToken] = useState('')
  const [userInfo, setUserInfo] = useState()
  const [theme, setTheme] = useState(themes.light);
  const [user, setUser] = useState(null)
  useEffect(() => {
    async function fetchData() {
      const isLoggedInTemp = await AsyncStorage.getItem('isLoggedIn')
      const tokenTemp = await AsyncStorage.getItem('token')
      const userInfoTemp = await AsyncStorage.getItem('userInfo')
      setIsLoggedIn(isLoggedInTemp)
      setToken(tokenTemp)
      setUserInfo(userInfoTemp)
      setLoading(false)
      setUser(JSON.parse(userInfoTemp))
      // await AsyncStorage.removeItem('isLoggedIn')
      // await AsyncStorage.removeItem('token')
      // await AsyncStorage.removeItem('userInfo')
    }
    fetchData()
  }, []);
  return (
    <AuthContext.Provider value={[user, setUser]}>
      <ThemeContext.Provider value={[theme, setTheme]}>
        {loading ? (
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen
                options={{ headerShown: false }}
                name="SplashScreen"
                component={SplashScreen}
              />
            </Stack.Navigator>
          </NavigationContainer>
        ) : (
            // isLoggedIn === true ? (
            <NavigationContainer>
              <Stack.Navigator
                headerMode="screen"
                screenOptions={() => ({
                  headerStyle: {
                    backgroundColor: "#212121",
                  },
                  headerTintColor: "white",
                })}
              >
                <Stack.Screen
                  options={{ headerShown: false }}
                  name="LoginScreen"
                  component={LoginScreen}
                />
                <Stack.Screen
                  options={{ headerShown: false }}
                  name="Main"
                  component={Main}
                />
                <Stack.Screen
                  name="Profile"
                  component={ProfileScreen}
                  options={{
                    title: "Trang cá nhân",
                    headerStyle: {
                      backgroundColor: theme.header,
                    },
                    headerTintColor: theme.foreground,
                  }}
                />
                <Stack.Screen
                  name="Path"
                  component={PathScreen}
                  options={{
                    title: "Paths",
                    headerStyle: {
                      backgroundColor: theme.header,
                    },
                    headerTintColor: theme.foreground,
                  }}
                />
                <Stack.Screen
                  name="PathDetail"
                  component={PathDetailScreen}
                  options={{
                    // title: "Paths",
                    headerStyle: {
                      backgroundColor: theme.header,
                    },
                    headerTintColor: theme.foreground,
                  }}
                />
                <Stack.Screen
                  name="ListLesson"
                  component={ListLesson}
                  options={{
                    title: "",
                    headerStyle: {
                      backgroundColor: theme.header,
                    },
                    headerTintColor: theme.foreground,
                  }}
                />
                <Stack.Screen
                  name="CoursesDetail"
                  component={CoursesDetail}
                  options={{
                    title: "",
                    headerShown: false,
                  }}
                />
                <Stack.Screen
                  name="Setting"
                  component={SettingScreen}
                  options={{
                    title: "Cài đặt",
                    headerShown: true,
                    headerStyle: {
                      backgroundColor: theme.header,
                    },
                    headerTintColor: theme.foreground,
                  }}
                />
                <Stack.Screen
                  name="Author"
                  component={AuthorDetailScreen}
                  options={{
                    title: "Author",
                    headerShown: true,
                    headerStyle: {
                      backgroundColor: theme.header,
                    },
                    headerTintColor: theme.foreground,
                  }}
                />
                <Stack.Screen
                  options={{ headerShown: false }}
                  name="SignUpScreen"
                  component={SignUpScreen}
                />
                {/* </Stack.Navigator>
              </NavigationContainer>
            ) : (
                <NavigationContainer>
                  <Stack.Navigator
                    headerMode="screen"
                    screenOptions={() => ({
                      headerStyle: {
                        backgroundColor: "#212121",
                      },
                      headerTintColor: "white",
                    })}
                  > */}
                {/* <Stack.Screen
                      options={{ headerShown: false }}
                      name="LoginScreen"
                      component={LoginScreen}
                    /> */}
              </Stack.Navigator>
            </NavigationContainer>
            // )
          )}



      </ThemeContext.Provider>
    </AuthContext.Provider>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
