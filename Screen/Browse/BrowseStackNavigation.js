// import React, { Button } from 'react';
import * as React from 'react';
import { Avatar } from 'react-native-elements';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { NavigationContainer, StackRouter } from '@react-navigation/native';
import { createStackNavigator, HeaderTitle, HeaderStyleInterpolators, HeaderBackground } from '@react-navigation/stack';
import BrowseScreen from "./BrowseScreen"
import ProfileScreen from "../ProfileScreen"
import { Colors } from 'react-native/Libraries/NewAppScreen';
import Header from "../../Component/header"
const browseStack = createStackNavigator();
export default function BrowseScreenNavigation({ navigation }) {
    return (
        <browseStack.Navigator
            initialRouteName="BrowseScreen"
            headerMode="screen"
            screenOptions={{
                headerTintColor:"white",
                headerTitleStyle: {
                    color: "white"
                },
                headerStyle: {
                    backgroundColor: "#212121"
                },
                // headerRight: Header,
            }}
        >
            <browseStack.Screen
                name="Browse"
                component={BrowseScreen}
            >
            </browseStack.Screen>
            {/* <browseStack.Screen
                screenOptions={{
                    headerRight: (<Text>ABC</Text>)
                }}
                name="Profile"
                component={ProfileScreen}>
                
            </browseStack.Screen> */}
        </browseStack.Navigator>
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
