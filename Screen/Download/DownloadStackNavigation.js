// import React, { Button } from 'react';
import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, HeaderTitle } from '@react-navigation/stack';
import DownloadScreen from "./DownloadScreen"
import ProfileScreen from "../ProfileScreen"
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import Header from "../../Component/header"
const downloadStack = createStackNavigator();
export default function DownloadScreenNavigation({ navigation }) {
    return (
        <downloadStack.Navigator
            initialRouteName="DownloadScreen"
            headerMode="screen"
            screenOptions={{
                headerTitleStyle: {
                    color: "white"
                },
                headerStyle: {
                    backgroundColor: "#212121"
                },
                // headerRight: Header,
            }}
        >
            <downloadStack.Screen
                name="Downloads"
                component={DownloadScreen}

            >
            </downloadStack.Screen>
        </downloadStack.Navigator>
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
