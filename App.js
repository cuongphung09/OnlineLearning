import React from "react";
import { Avatar } from "react-native-elements";
import { StyleSheet, Text, View, Button, UIManager, findNodeHandle } from "react-native";
import Search from "./Screen/SearchScreen";
import ProfileScreen from "./Screen/ProfileScreen";
import HomeScreen from "./src/Main/Home/HomeScreen";
import Download from "./Screen/DownloadScreen";
import Browse from "./Screen/BrowseScreen";
import "react-native-gesture-handler";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
// const Tab = createBottomTabNavigator();
import { NavigationContainer } from "@react-navigation/native";
import { ScreenStack } from "react-native-screens";
import { createStackNavigator } from "@react-navigation/stack";
import Header from "./src/Component/header";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Alert } from "react-native";
const Stack = createStackNavigator();
const HomeStack = createStackNavigator();
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
        component={HomeScreen}
      >
      </HomeStack.Screen>
    </HomeStack.Navigator>
  )
}
function Main({ navigation }) {
  return (
    <Tab.Navigator initialRouteName="Home"
      tabBarOptions={{
        activeBackgroundColor: '#212121',
        inactiveBackgroundColor: '#212121',
        inactiveTintColor:'#fff'
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
              size={size+5}
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
            <MaterialCommunityIcons name="download" color={color} size={size+5} />
          ),
        }}
      />
      <Tab.Screen
        name="Browse"
        component={Browse}
        options={{
          tabBarLabel: "Browse",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="grid" color={color} size={size+5} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}

        options={{
          tabBarLabel: "Search",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="magnify" color={color} size={size+5} />
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
        headerMode="none"
      >
        <Stack.Screen
          name="Main"
          component={Main} />
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// export default function App() {
//   return (
//     <NavigationContainer>
//       <Tab.Navigator initialRouteName="BrowseScreen"
//       >
//         <Tab.Screen name="HomeStackNavigation" component={HomeStackNavigation}
//           options={{
//             tabBarLabel: 'Home',
//             tabBarIcon: ({ color, size }) => (
//               <MaterialCommunityIcons name="home-outline" color={color} size={size} />
//             ),
//           }} />
//         <Tab.Screen name="DownloadScreen" component={DownloadStackNavigation}
//           options={{
//             tabBarLabel: 'Download',
//             tabBarIcon: ({ color, size }) => (
//               <MaterialCommunityIcons name="download" color={color} size={size} />
//             ),
//           }} />
//         <Tab.Screen name="BrowseScreen" component={BrowseStackNavigation}
//           options={{
//             tabBarLabel: 'Browse',
//             tabBarIcon: ({ color, size }) => (
//               <MaterialCommunityIcons name="grid" color={color} size={size} />
//             ),
//           }} />
//         <Tab.Screen name="Search" component={SearchScreen}
//           options={{
//             tabBarLabel: 'Search',
//             tabBarIcon: ({ color, size }) => (
//               <MaterialCommunityIcons name="magnify" color={color} size={size} />
//             ),
//           }}
//         />

//       </Tab.Navigator>
//     </NavigationContainer>

//   );
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
