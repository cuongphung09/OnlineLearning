import React, { useContext, useState, createContext, useMemo } from "react";
import { Avatar } from "react-native-elements";
import { StyleSheet, View } from "react-native";
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
import BrowseScreen from "./Screen/BrowseScreen";
import CoursesDetail from "./src/CoursesDetail/course-detail";
import CustomMenuIcon from './src/Component/pop-up-menu'
import HomeScreen from "./src/Main/Home/HomeScreen";
import SplashScreen from "./Screen/SplashScreen";
import LoginScreen from "./Screen/LoginScreen";

import ThemeContext, { themes } from './src/Context/theme-context'
// import AuthContext from './src/Context/auth-context'
const Stack = createStackNavigator();
const HomeStack = createStackNavigator();
const DownloadStack = createStackNavigator();
const BrowseStack = createStackNavigator();
const Tab = createBottomTabNavigator();

function Home({ navigation }) {
  return (
    <ThemeContext.Consumer>
      {([theme, setTheme]) => {
        return (<HomeStack.Navigator
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
                    uri:
                      "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
                  }}
                  onPress={() => navigation.navigate("Profile")}
                />
                <CustomMenuIcon
                  //Menu Text
                  menutext="Menu"
                  //Menu View Style
                  menustyle={{
                    marginRight: 16,
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                  }}
                  textStyle={{
                    color: theme.foreground,
                  }}
                  option1Click={() => {
                    navigation.navigate('Setting');
                  }}
                  option2Click={() => { }}
                  option3Click={() => { }}

                />
              </View>
            ),
          })}
        >
          <HomeStack.Screen
            name="Home"
            component={HomeScreen}
          >
          </HomeStack.Screen>
        </HomeStack.Navigator >
        )
      }
      }
    </ThemeContext.Consumer>

  )
}
function Download({ navigation }) {
  return (
    <ThemeContext.Consumer>
      {
        ([theme, setTheme]) => {
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
                        uri:
                          "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
                      }}
                      onPress={() => navigation.navigate("Profile")}
                    />
                    <CustomMenuIcon
                      //Menu Text
                      menutext="Menu"
                      //Menu View Style
                      menustyle={{
                        marginRight: 16,
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                      }}
                      textStyle={{
                        color: 'white',
                      }}
                      option1Click={() => {
                        navigation.navigate('Setting');
                      }}
                      option2Click={() => { }}
                      option3Click={() => { }}

                    />
                  </View>
                ),
              })}
            >
              <DownloadStack.Screen
                name="Download"
                component={DownloadScreen}
              >
              </DownloadStack.Screen>
            </DownloadStack.Navigator>
          )
        }
      }
    </ThemeContext.Consumer>

  )
}
function Browse({ navigation }) {
  return (
    <ThemeContext.Consumer>
      {
        ([theme, setTheme]) => {
          return (
            <BrowseStack.Navigator
              headerMode="screen"
              screenOptions={({ navigation, route }) => ({
                headerTitleStyle: {
                  color: theme.foreground,
                },
                headerStyle: {
                  backgroundColor: theme.background,
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
                        uri:
                          "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
                      }}
                      onPress={() => navigation.navigate("Profile")}
                    />
                    <CustomMenuIcon
                      //Menu Text
                      menutext="Menu"
                      //Menu View Style
                      menustyle={{
                        marginRight: 16,
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                      }}
                      textStyle={{
                        color: 'white',
                      }}
                      option1Click={() => {
                        navigation.navigate('Setting');
                      }}
                      option2Click={() => { }}
                      option3Click={() => { }}

                    />
                  </View>
                ),
              })}
            >
              <BrowseStack.Screen

                name="Browse"
                component={BrowseScreen}

              >
              </BrowseStack.Screen>
            </BrowseStack.Navigator>
          )
        }
      }
    </ThemeContext.Consumer>

  )
}
function Main({ navigation }) {
  return (
    <ThemeContext.Consumer>
      {
        ([theme, setTheme]) => {
          return (
            <Tab.Navigator initialRouteName="Home"
              tabBarOptions={{
                activeBackgroundColor: theme.header,
                inactiveBackgroundColor: theme.header,
                inactiveTintColor: theme.inactiveTintColor,
                activeTintColor: theme.activeTintColor,
                keyboardHidesTabBar: true
              }}
            >
              <Tab.Screen

                name="Home"
                component={Home}
                options={{
                  tabBarLabel: "Home",
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
                  tabBarLabel: "Download",
                  tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="download" color={color} size={size + 5} />
                  ),
                }}
              />
              <Tab.Screen
                name="Browse"
                component={Browse}
                options={{
                  tabBarLabel: "Browse",
                  tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="grid" color={color} size={size + 5} />
                  ),
                }}
              />
              <Tab.Screen
                name="Search"
                component={Search}

                options={{
                  tabBarLabel: "Search",
                  tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="magnify" color={color} size={size + 5} />
                  ),
                }}
              />
            </Tab.Navigator>
          )
        }
      }
    </ThemeContext.Consumer>

  );
}
export default function App() {
  const [theme, setTheme] = useState(themes.light)
  return (
    <ThemeContext.Provider value={[theme, setTheme]}>
      <NavigationContainer>
        <Stack.Navigator
          headerMode="screen"
          screenOptions={() => ({
            headerStyle: {
              backgroundColor: "#212121",
            },
            headerTintColor: 'white'
          })}
        >
          {/* <Stack.Screen
            options={{ headerShown: false }}
            name="SplashScreen"
            component={SplashScreen}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="LoginScreen"
            component={LoginScreen}

          /> */}
          <Stack.Screen
            options={{ headerShown: false }}
            name="Main"
            component={Main} />
          <Stack.Screen
            name="Profile"
            component={ProfileScreen}
            options={{
              title: 'Profile',
              headerStyle: {
                backgroundColor: theme.header,
              },
              headerTintColor: theme.foreground
            }}
          />
          <Stack.Screen
            name='ListLesson'
            component={ListLesson}
            options={{
              title: '',
              headerStyle: {
                backgroundColor: theme.header,
              },
              headerTintColor: theme.foreground
            }}

          />
          <Stack.Screen
            name='CoursesDetail'
            component={CoursesDetail}
            options={{
              title: '',
              headerShown: false
            }}
          />
          <Stack.Screen
            name='Setting'
            component={SettingScreen}
            options={{
              title: 'Settings',
              headerShown: true,
              headerStyle: {
                backgroundColor: theme.header,
              },
              headerTintColor: theme.foreground
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeContext.Provider>

  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
