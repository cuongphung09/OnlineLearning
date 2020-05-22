import React from "react";
import { Avatar } from "react-native-elements";
import { StyleSheet, Text, View, Button, UIManager, findNodeHandle } from "react-native";
import Search from "./Screen/SearchScreen";
import ProfileScreen from "./Screen/ProfileScreen";
import HomeNavigation from "./src/Main/Home/HomeNavigation";
import "react-native-gesture-handler";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
// const Tab = createBottomTabNavigator();
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Alert } from "react-native";
import ListLesson from "./src/CoursesDetail/ListLesson/list-lesson";
import DownloadScreen from "./Screen/DownloadScreen";
import DownloadNavigation from "./src/Main/Download/DownloadNavigation";
import BrowseScreen from "./Screen/BrowseScreen";
const Stack = createStackNavigator();
const HomeStack = createStackNavigator();
const DownloadStack = createStackNavigator();
const BrowseStack = createStackNavigator();
const Tab = createBottomTabNavigator();
function Home({ navigation }) {
  return (
    <HomeStack.Navigator
      headerMode="screen"
      screenOptions={({ navigation, route }) => ({
        headerTitleStyle: {
          color: "white",
        },
        headerStyle: {
          backgroundColor: "#212121",
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
            <TouchableOpacity
              onPress={() => {

                Alert.alert("Ai rảnh ")
              }}
            >
              <MaterialCommunityIcons
                name="dots-vertical"
                color="white"
                size={25}
                style={{ marginRight: 10 }}
              />
            </TouchableOpacity>
          </View>
        ),
      })}
    >
      <HomeStack.Screen
        name="Home"
        component={HomeNavigation}
      >
      </HomeStack.Screen>
    </HomeStack.Navigator>
  )
}
function Download({ navigation }) {
  return (
    <DownloadStack.Navigator
      headerMode="screen"
      screenOptions={({ navigation, route }) => ({
        headerTitleStyle: {
          color: "white",
        },
        headerStyle: {
          backgroundColor: "#212121",
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
            <TouchableOpacity
              onPress={() => {

                Alert.alert("Ai rảnh ")
              }}
            >
              <MaterialCommunityIcons
                name="dots-vertical"
                color="white"
                size={25}
                style={{ marginRight: 10 }}
              />
            </TouchableOpacity>
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
function Browse({ navigation }) {
  return (
    <BrowseStack.Navigator
      headerMode="screen"
      screenOptions={({ navigation, route }) => ({
        headerTitleStyle: {
          color: "white",
        },
        headerStyle: {
          backgroundColor: "#212121",
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
            <TouchableOpacity
              onPress={() => {

                Alert.alert("Ai rảnh ")
              }}
            >
              <MaterialCommunityIcons
                name="dots-vertical"
                color="white"
                size={25}
                style={{ marginRight: 10 }}
              />
            </TouchableOpacity>
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
function Main({ navigation }) {
  return (
    <Tab.Navigator initialRouteName="Home"
      tabBarOptions={{
        activeBackgroundColor: '#212121',
        inactiveBackgroundColor: '#212121',
        inactiveTintColor: '#fff'
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
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        headerMode="screen"
        screenOptions={() => ({
          // headerTitleStyle: {
          //   color: "white",
          // },
          headerStyle: {
            backgroundColor: "#212121",
          },
          headerTintColor: 'white'
        })}
      >
        <Stack.Screen
          options={{ headerShown: false }}
          name="Main"
          component={Main} />
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
        />
        <Stack.Screen
          name='ListLesson'
          component={ListLesson}
          options={{
            title: ''
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
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
