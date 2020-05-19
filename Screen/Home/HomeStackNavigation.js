// import React, { Button } from 'react';
import * as React from 'react';
import * as elements from 'react-native-elements';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, HeaderTitle } from '@react-navigation/stack';
import HomeScreen from "./HomeScreen"
import ProfileScreen from "../ProfileScreen"
import { Avatar } from 'react-native-elements';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'; import { Colors } from 'react-native/Libraries/NewAppScreen';
import Header from "../../Component/header"
const homeStack = createStackNavigator();
export default function HomeStackNavigation({ navigation }) {
    return (
        <homeStack.Navigator
            initialRouteName="HomeScreen"
            headerMode="screen"
            screenOptions={{
                headerTitleStyle: {
                    color: "white"
                },
                headerStyle: {
                    backgroundColor: "#212121"
                },
                headerRight: () => (
                    <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                        <Avatar
                            containerStyle={{ marginRight: 10 }}
                            size={25}
                            rounded
                            source={{
                                uri:
                                    'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
                            }}
                            onPress={() =>
                                navigation.navigate('Profile')
                            }
                        />
                        <MaterialCommunityIcons
                            name="dots-vertical"
                            color="white" size={25}
                            style={{ marginRight: 10 }}
                        />

                    </View>
                ),

            }}
        >
            <homeStack.Screen
                name="Home"
                component={HomeScreen}

            >
            </homeStack.Screen>
            <homeStack.Screen
                name="Profile"
                options={{
                    headerShown: false
                }}
                component={ProfileScreen}>

            </homeStack.Screen>
        </homeStack.Navigator>
        // <View style={styles.container}>
        //     <Text>this is home page</Text>
        // </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
