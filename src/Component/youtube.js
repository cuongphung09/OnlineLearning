//This is an example code for the popup menu//
import React, { Component } from 'react';
//import react in our code.
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
//import all the components we are going to use.
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
//import menu and menu item
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import ThemeContext from '../Context/theme-context'
import { Icon } from 'react-native-elements';
import { WebView } from "react-native-webview";
const Youtube = (route, props) => {
    const link = route.youtubeLink
    return (
        <View style={styles.Container}>
            <WebView
                style={styles.WebViewStyle}
                source={{ uri: link }}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                allowsFullscreenVideo={true}
                mediaPlaybackRequiresUserAction={true}
            />
        </View>
    )
}
const styles = StyleSheet.create({
    Container: {
        flex: 1,
        height: 200
    },
    WebViewStyle: {

    }
});
export default Youtube