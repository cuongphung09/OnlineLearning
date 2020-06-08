import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, Text, View, Button, ProgressBarAndroid } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { TouchableOpacity } from "react-native-gesture-handler";
import ThemeContext from '../src/Context/theme-context'
export default function SplashScreen({ navigation }) {
    const [count, setCount] = useState(0)
    useEffect(() => {
        let interval = null;
        interval = setInterval(() => {
            setCount(count => count + 1);
        }, 1);
        if (count >= 100) {
            clearInterval(interval)
            navigation.navigate('LoginScreen')
        }
        return () => clearInterval(interval);
    }, [count]);
    return (
        <ThemeContext.Consumer>
            {(theme) => {
                return (
                    <View 
                    style={[styles.container, {backgroundColor: theme.background}]}
                    >
                        <Text style={{ fontSize: 30, fontWeight: 'bold', color: theme.foreground, textAlign: 'center', marginBottom: 100 }}>Welcome to Online Learning App</Text>
                        <ProgressBarAndroid styleAttr="Horizontal" color="#2196F3" style={{ width: 200 }} />
                        <Text style={{color: theme.foreground}}>Loading {count}%</Text>
                    </View>
                )
            }}
        </ThemeContext.Consumer>



    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: "#0E0F13",
        alignItems: "center",
        justifyContent: "center"
    },
    button: {
        margin: 10,
        alignItems: 'center',
        backgroundColor: '#007AFF',
        borderRadius: 25,
        height: 50,
        justifyContent: 'center',
        width: 200
    }, 

});
