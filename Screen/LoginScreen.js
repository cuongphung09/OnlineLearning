import React, { useState, useEffect } from "react";
import {
    StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, AsyncStorage, Modal,
    TouchableHighlight
} from "react-native";
// import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
// import { useSafeArea } from "react-native-safe-area-context";
// import PasswordInputText from 'react-native-hide-show-password-input';
import ThemeContext from '../src/Context/theme-context'
import AuthContext from '../src/Context/auth-context'
export default function LoginScreen({ navigation }) {
    const [layer, setLayer] = useState(1)
    const [userOpacity, setUserOpacity] = useState(0.7)
    const [passwordOpacity, setPasswordOpacity] = useState(0.7)
    const [forgetOpacity, setForgetOpacity] = useState(0.7)
    const [username, setUsername] = useState('')
    const [forget, setForget] = useState('')
    const [password, setPassword] = useState('')
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [token, setToken] = useState('')
    const [userInfo, setUserInfo] = useState()
    const [loading, setLoading] = useState(true)
    const [modalVisible, setModalVisible] = useState(false);
    useEffect(() => {
        async function fetchData() {
            const isLoggedInTemp = await AsyncStorage.getItem('isLoggedIn')
            const tokenTemp = await AsyncStorage.getItem('token')
            const userInfoTemp = await AsyncStorage.getItem('userInfo')
            if (isLoggedInTemp === 'true') {
                navigation.navigate('Main')
            }

            setIsLoggedIn(isLoggedInTemp)
            setToken(tokenTemp)
            setUserInfo(userInfoTemp)
            setLoading(false)
        }
        fetchData()

    }, []);


    const submit = async (setUser) => {
        let response = await fetch('https://api.itedu.me/user/login', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: username,
                password: password,
            }),
        })
        let responseJson = await response.json();
        if (responseJson.message !== "OK") {
            Alert.alert('sai tk mk')
        }
        else {
            setUsername('')
            setPassword('')
            setUser(responseJson.userInfo)
            AsyncStorage.setItem('isLoggedIn', 'true')
            AsyncStorage.setItem('token', responseJson.token)
            AsyncStorage.setItem('userInfo', JSON.stringify(responseJson.userInfo))
            navigation.navigate('Main')
        }

        // await AsyncStorage.removeItem('isLoggedIn')
        // await AsyncStorage.removeItem('token')
        // await AsyncStorage.removeItem('userInfo')
    }
    const background = { uri: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-1.2.1&w=1000&q=80' }
    return (
        <AuthContext.Consumer>
            {([user, setUser]) => {
                return (
                    <ThemeContext.Consumer>
                        {([theme, setTheme]) => {
                            return loading ? (
                                <View>
                                    <Text>LOADING</Text>
                                </View>
                            ) : (
                                    <View style={[styles.container, { opacity: layer }]}>
                                        <Text style={{ fontSize: 30, fontWeight: 'bold', textAlign: 'center', marginBottom: 30, color: theme.foreground }}>Login</Text>
                                        <View style={{ margin: 30, marginBottom: 10 }}>
                                            <TextInput style={{ opacity: userOpacity, marginBottom: 20, color: theme.foreground }} placeholder='Email' value={username}
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
                                                }}>
                                            </TextInput>



                                            <TouchableOpacity style={[styles.button, { color: theme.foreground }]} title='LOGIN' onPress={
                                                () => submit(setUser)
                                            } >
                                                <Text style={{ fontSize: 20, color: 'white' }}>Login</Text>
                                            </TouchableOpacity>
                                        </View>
                                        <TouchableOpacity onPress={() => {
                                            setModalVisible(true)
                                            setLayer(0)
                                            // navigation.navigate('ForgotPassword')
                                            // navigation.navigate('Main')
                                        }}>
                                            <Text style={[{ alignSelf: 'center', opacity: 0.5 }]}>Forget Password</Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity onPress={() => {
                                            navigation.navigate('SignUpScreen')
                                        }}>
                                            <Text style={[{ alignSelf: 'center', opacity: 0.9 }]}>Don't have account? Sign up</Text>

                                        </TouchableOpacity>

                                        <View style={styles.centeredView}>
                                            <Modal
                                                animationType="slide"
                                                transparent={true}
                                                visible={modalVisible}
                                                onRequestClose={() => {
                                                    Alert.alert("Modal has been closed.");
                                                }}
                                            >
                                                <View style={styles.centeredView}>
                                                    <View style={styles.modalView}>
                                                        <Text style={styles.modalText}>Quên mật khẩu</Text>
                                                        <TextInput style={{ opacity: forgetOpacity, color: theme.foreground }} placeholder='Email' value={forget}
                                                            onChangeText={(value) => {
                                                                if (value !== '') {
                                                                    setForgetOpacity(1)
                                                                }
                                                                setForget(value)
                                                            }}
                                                        ></TextInput>
                                                        <View style={{ flexDirection: 'row' }}>
                                                            <TouchableHighlight
                                                                style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                                                                onPress={async () => {
                                                                    const sendEmail = await fetch('https://api.itedu.me/user/forget-pass/send-email', {
                                                                        method: "POST",
                                                                        headers: {
                                                                            Accept: "application/json",
                                                                            "Content-Type": "application/json",

                                                                        },
                                                                        body: {
                                                                            email: forget
                                                                        }
                                                                    })
                                                                    const sendEmailJson = await sendEmail.json()
                                                                    Alert.alert(sendEmailJson.message)
                                                                    setModalVisible(!modalVisible);
                                                                    setLayer(1)
                                                                }}
                                                            >
                                                                <Text style={styles.textStyle}>Xác nhận</Text>
                                                            </TouchableHighlight>
                                                            <TouchableHighlight
                                                                style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                                                                onPress={() => {
                                                                    setModalVisible(!modalVisible);
                                                                    setLayer(1)

                                                                }}
                                                            >
                                                                <Text style={styles.textStyle}>Hủy</Text>
                                                            </TouchableHighlight>
                                                        </View>
                                                    </View>
                                                </View>
                                            </Modal>
                                        </View>
                                    </View>
                                    // </ImageBackground>
                                )

                        }}
                    </ThemeContext.Consumer>
                )
            }}
        </AuthContext.Consumer>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
    },
    button: {
        margin: 10,
        alignItems: 'center',
        backgroundColor: '#007AFF',
        borderRadius: 25,
        height: 50,
        justifyContent: 'center'
    },
    centeredView: {
        // flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 50
    },
    modalView: {

        width: '90%',
        margin: 150,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        margin: 10
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
});
