import React from "react";
import { Avatar } from "react-native-elements";
import { StyleSheet, Text, View, Button, UIManager,findNodeHandle } from "react-native";
import SearchScreen from "./Screen/SearchScreen";
import ProfileScreen from "./Screen/ProfileScreen";
import HomeScreen from "./Screen/HomeScreen";
import DownloadScreen from "./Screen/DownloadScreen";
import BrowseScreen from "./Screen/BrowseScreen";
import "react-native-gesture-handler";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
// const Tab = createBottomTabNavigator();
import { NavigationContainer } from "@react-navigation/native";
import { ScreenStack } from "react-native-screens";
import { createStackNavigator } from "@react-navigation/stack";
import Header from "./Component/header";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Alert } from "react-native";
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
function Home({ navigation }) {
  return (
    <Tab.Navigator initialRouteName="HomeScreen">
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="home-outline"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="DownloadScreen"
        component={DownloadScreen}
        options={{
          tabBarLabel: "Download",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="download" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="BrowseScreen"
        component={BrowseScreen}
        options={{
          tabBarLabel: "Browse",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="grid" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarLabel: "Search",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="magnify" color={color} size={size} />
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
        screenOptions={({ navigation, route }) => ({
          headerTitleStyle: {
            color: "white",
          },
          headerStyle: {
            backgroundColor: "#212121",
          },
          headerRight: () => (
            // <Button title="PRO" onPress={()=>navigation.navigate('Profile')}></Button>
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
                  // UIManager.showPopupMenu(
                  //   findNodeHandle(<Text>ABC</Text>),
                  //   this.props.actions,
                  //   this.onError,
                  //   this.props.onPress
                  // );
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
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            headerRightContainerStyle: {
              opacity: 0,
            },
          }}
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
