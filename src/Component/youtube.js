import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
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