import React, { Component } from "react";
import { Avatar } from "react-native-elements";
import { StyleSheet, Text, View, Button, UIManager, findNodeHandle, Alert } from "react-native";
import Search from "./Screen/SearchScreen";
import SettingScreen from "./Screen/SettingScreen";
import ProfileScreen from "./Screen/ProfileScreen";
import HomeNavigation from "./src/Main/Home/HomeNavigation";
import "react-native-gesture-handler";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
// const Tab = createBottomTabNavigator();
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator, HeaderBackButton } from "@react-navigation/stack";
import { TouchableOpacity } from "react-native-gesture-handler";
import ListLesson from "./src/CoursesDetail/ListLesson/list-lesson";
import DownloadScreen from "./Screen/DownloadScreen";
import DownloadNavigation from "./src/Main/Download/DownloadNavigation";
import BrowseScreen from "./Screen/BrowseScreen";
import CoursesDetail from "./src/CoursesDetail/course-detail";
import CustomMenuIcon from './src/Component/pop-up-menu'
import {
  MenuContext,
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  MenuProvider,
} from 'react-native-popup-menu';
const Stack = createStackNavigator();
const HomeStack = createStackNavigator();
const DownloadStack = createStackNavigator();
const BrowseStack = createStackNavigator();
const Tab = createBottomTabNavigator();
const onPopupEvent = (eventName, index) => {
  if (eventName !== 'itemSelected') return
  if (index === 0) console.log('edit')
  else console.log('remove')
}
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
      <HomeStack.Screen
        name="Home"
        component={HomeNavigation}
      >
      </HomeStack.Screen>
    </HomeStack.Navigator >
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
function Main({ navigation }) {
  return (
    <Tab.Navigator initialRouteName="Home"
      tabBarOptions={{
        activeBackgroundColor: '#212121',
        inactiveBackgroundColor: '#212121',
        inactiveTintColor: '#fff',
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
  );
}

export default function App() {
  return (
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
          title:'Settings',
          headerShown:true
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
