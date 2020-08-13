import React, { useContext, useState, createContext, useMemo, useEffect } from "react";
import { Avatar, Icon } from "react-native-elements";
import { StyleSheet, View, AsyncStorage, Button } from "react-native";
import Search from "./src/Main/Search/SearchScreen";
import SettingScreen from "./Screen/SettingScreen";
import ProfileScreen from "./Screen/ProfileScreen";
import "react-native-gesture-handler";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
// const Tab = createBottomTabNavigator();
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import ListCourses from "./src/Courses/ListCourses/list-course";
import DownloadScreen from "./src/Main/Download/DownloadScreen";
import BrowseScreen from "./src/Main/Browse/BrowseScreen";
import CoursesDetail from "./src/CoursesDetail/course-detail";
import CustomMenuIcon from "./src/Component/pop-up-menu";
import HomeScreen from "./src/Main/Home/HomeScreen";
import SplashScreen from "./src/Splash/SplashScreen";
import LoginScreen from "./src/Auth/Login/LoginScreen";

import ThemeContext, { themes } from "./src/Context/theme-context";
import PathScreen from "./Screen/PathScreen";
import PathDetailScreen from "./Screen/PathDetailScreen";
import AuthorDetailScreen from "./Screen/AuthorScreen";
import AuthContext, { users } from "./src/Context/auth-context";
import SignUpScreen from "./src/Auth/Register/SignUpScreen";
import { TouchableOpacity } from "react-native-gesture-handler";
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
                            uri: user ? user.avatar : 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fpngtree.com%2Ffreepng%2Fvector-avatar-icon_4013749.html%23%3A~%3Atext%3DCategory%3A%2520vectors&psig=AOvVaw1AvfhcjpwpyTD60vNCO9CF&ust=1597384181082000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCPD5rfe9l-sCFQAAAAAdAAAAABAD',
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
                          uri: user ? user.avatar : 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fpngtree.com%2Ffreepng%2Fvector-avatar-icon_4013749.html%23%3A~%3Atext%3DCategory%3A%2520vectors&psig=AOvVaw1AvfhcjpwpyTD60vNCO9CF&ust=1597384181082000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCPD5rfe9l-sCFQAAAAAdAAAAABAD',
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
                            uri: user ? user.avatar : 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fpngtree.com%2Ffreepng%2Fvector-avatar-icon_4013749.html%23%3A~%3Atext%3DCategory%3A%2520vectors&psig=AOvVaw1AvfhcjpwpyTD60vNCO9CF&ust=1597384181082000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCPD5rfe9l-sCFQAAAAAdAAAAABAD',
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
                  // navigation={navigation}
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
  const [count, setCount] = useState(0)
  const [theme, setTheme] = useState(themes.light);
  const loadTheme = async () => {
    const themeTemp = await AsyncStorage.getItem('theme')
    if (themeTemp === null) {
      setTheme(themes.light)
    }
    else {
      themeTemp === 'light' ? setTheme(themes.light) : setTheme(themes.dark)
    }
  }
  loadTheme()
  const [user, setUser] = useState(null)
  useEffect(() => {
    async function fetchData() {

      var timer = setInterval(async () => {
        const isLoggedInTemp = await AsyncStorage.getItem('isLoggedIn')
        const tokenTemp = await AsyncStorage.getItem('token')
        const userInfoTemp = await AsyncStorage.getItem('userInfo')
        setIsLoggedIn(isLoggedInTemp)
        setToken(tokenTemp)
        setUserInfo(userInfoTemp)
        setLoading(false)
        setUser(JSON.parse(userInfoTemp))
      },
        2962
      )
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
                    // headerRight: ({ navigation }) => (
                    //   <View>
                    //     <TouchableOpacity
                    //       onPress={() => navigation.navigate('Main')}
                    //       style={styles.headerIconRight}
                    //     >
                    //       <MaterialCommunityIcons name="home" color={theme.foreground} size={26} />
                    //     </TouchableOpacity>
                    //   </View>
                    // ),
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
                  name="ListCourses"
                  component={ListCourses}
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
