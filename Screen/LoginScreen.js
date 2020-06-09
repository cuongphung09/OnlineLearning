import React, { useState, useContext } from "react";
import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity, Alert } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useSafeArea } from "react-native-safe-area-context";
import ThemeContext from '../src/Context/theme-context'

export default function LoginScreen({ navigation }) {
    const [userOpacity, setUserOpacity] = useState(0.7)
    const [passwordOpacity, setPasswordOpacity] = useState(0.7)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const users = [
        {
            username: 'ptcuong',
            password: '123'
        },
        {
            username: 'ptcuong1',
            password: '1234'
        },
        {
            username: 'ptcuong2',
            password: '12345'
        }

    ]
    return (
        <ThemeContext.Consumer>
            {([theme, setTheme]) => {
                return (
                    <View style={[styles.container, { backgroundColor: theme.background }]}>
                        {/* <MaterialCommunityIcons name="download" color={'white'} size={200} /> */}
                        <Text style={{ fontSize: 30, fontWeight: 'bold', textAlign: 'center', marginBottom: 30, color: theme.foreground }}>Login</Text>
                        <View style={{ margin: 30 }}>
                            <TextInput style={{ opacity: userOpacity, marginBottom: 20, color: theme.foreground }} placeholder='Username' value={username}
                                onChangeText={(value) => {
                                    if (value !== '') {
                                        setUserOpacity(1)
                                    }
                                    setUsername(value)
                                }}
                            ></TextInput>
                            <TextInput style={{ opacity: passwordOpacity, marginBottom: 20, color: theme.foreground }} value={password} placeholder='Password'
                                secureTextEntry={true}
                                onChangeText={(value) => {
                                    if (value !== '') {
                                        setPasswordOpacity(1)
                                    }
                                    setPassword(value)
                                }}></TextInput>
                            <TouchableOpacity style={[styles.button, { color: theme.foreground }]} title='LOGIN' onPress={() => {
                                // navigation.navigate('Main')
                                let foundUser = users.filter(user=>user.username ===username)[0]
                                if(foundUser){
                                    if(foundUser.username ===username && foundUser.password===password){
                                        navigation.navigate('Main')
                                    }
                                    else{
                                        Alert.alert('Wrong username or password')
                                    }
                                }
                                else{
                                    Alert.alert("Not found User")
                                }
                            }} >
                                <Text style={{ fontSize: 20, color: 'white' }}>Login</Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity onPress={() => {
                            // navigation.navigate('ForgotPassword')
                            navigation.navigate('Main')
                        }}>
                            <Text style={[styles.darkText, { alignSelf: 'center', opacity: 0.3 }]}>Forget Password</Text>
                        </TouchableOpacity>
                    </View>
                )
            }}
        </ThemeContext.Consumer>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center"
    },
    button: {
        margin: 10,
        alignItems: 'center',
        backgroundColor: '#007AFF',
        borderRadius: 25,
        height: 50,
        justifyContent: 'center'
    }
});
