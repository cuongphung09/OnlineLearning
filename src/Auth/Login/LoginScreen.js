import React, { useState, useEffect } from "react";
import {
    StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, AsyncStorage, Modal,
    TouchableHighlight, Image, Platform
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import PasswordTextBox from '../../Component/passwordTextBox'
import ThemeContext from '../../Context/theme-context'
import AuthContext from '../../Context/auth-context'
import { REST_API } from "../../../config/api";
import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri, useAuthRequest, useAutoDiscovery, Prompt, ResponseType } from 'expo-auth-session';
import * as Google from 'expo-google-app-auth';
const useProxy = Platform.select({ web: false, default: true });
export default function LoginScreen({ navigation }) {
    const [secure, setSsecure] = useState(true)
    const [icon, setIcon] = useState('eye-off')
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
    const discovery = useAutoDiscovery('https://accounts.google.com');
    const [request, response, promptAsync] = useAuthRequest(
        {
            clientId: '1075264511640-09ii1ptfepe7vdu4irvs83r4spdv20o7.apps.googleusercontent.com',
            redirectUri: makeRedirectUri({
                native: 'com.googleusercontent.apps.GOOGLE_GUID:/oauthredirect',
                useProxy,
            }),
            scopes: ['openid', 'profile'],

            prompt: Prompt.SelectAccount,

            extraParams: {
            },
        },
        discovery
    );

    async function loginGG(code) {

        const info = JSON.stringify({
            "user": {
                "email": "cuongphung09111998@gmail.com",
                "id": code
            }
        })
        const login = await REST_API.loginGoogle(info)
        if (login.message === 'OK') {
            setUsername('')
            setPassword('')
            AsyncStorage.setItem('token', login.token)
            const userIf = await REST_API.getInfo()
            if (userIf.message === 'OK') {
                AsyncStorage.setItem('isLoggedIn', 'true')
                AsyncStorage.setItem('userInfo', JSON.stringify(userIf.payload))
                navigation.navigate('Main')
            }

        }
    }
    useEffect(() => {

        async function fetchData() {
            const isLoggedInTemp = await AsyncStorage.getItem('isLoggedIn')
            const tokenTemp = await AsyncStorage.getItem('token')
            const userInfoTemp = await AsyncStorage.getItem('userInfo')
            if (isLoggedInTemp === 'true' && userInfoTemp !== null) {
                navigation.navigate('Main')
            }
            setIsLoggedIn(isLoggedInTemp)
            setToken(tokenTemp)
            setUserInfo(userInfoTemp)
            setLoading(false)
        }
        if (response?.type === 'success') {
            const { code } = response.params;
            loginGG(code)
        }
        fetchData()

    }, [response]);


    const submit = async (setUser) => {
        const info = JSON.stringify({
            email: username,
            password: password,
        })
        const login = await REST_API.login(info)
        if (login.message === 'OK' && login.userInfo !== null) {
            setUsername('')
            setPassword('')
            setUser(login.userInfo)
            AsyncStorage.setItem('isLoggedIn', 'true')
            AsyncStorage.setItem('token', login.token)
            AsyncStorage.setItem('userInfo', JSON.stringify(login.userInfo))
            navigation.navigate('Main')
        }
        else {
            Alert.alert('Sai tài khoản hoặc mật khẩu')
        }
    }

    return (
        <AuthContext.Consumer>
            {([user, setUser]) => {
                return (
                    <ThemeContext.Consumer>
                        {([theme, setTheme]) => {
                            return loading ? (
                                <View>
                                    <Text style={{ color: theme.foreground }}>Đang tải</Text>
                                </View>
                            ) : (
                                    <View style={[styles.container, { opacity: layer, backgroundColor: theme.background }]}>
                                        <Text style={{ fontSize: 30, fontWeight: 'bold', textAlign: 'center', marginBottom: 30, color: theme.foreground }}>Đăng nhập</Text>
                                        <View style={{ margin: 30, marginBottom: 10 }}>
                                            <TextInput style={{ opacity: userOpacity, marginBottom: 20, color: theme.foreground }} placeholder='Email' value={username}
                                                onChangeText={(value) => {
                                                    if (value !== '') {
                                                        setUserOpacity(1)
                                                    }
                                                    setUsername(value)
                                                }}
                                            ></TextInput>

                                            <View style={{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'flex-start' }}>
                                                <TextInput style={{ opacity: passwordOpacity, marginBottom: 20, color: theme.foreground }} value={password} placeholder='Mật khẩu'
                                                    secureTextEntry={secure}
                                                    onChangeText={(value) => {
                                                        if (value !== '') {
                                                            setPasswordOpacity(1)
                                                        }
                                                        setPassword(value)
                                                    }}>
                                                </TextInput>
                                                <MaterialCommunityIcons size={25} name={icon} color={theme.foreground}
                                                    onPress={() => {
                                                        setSsecure(!secure)
                                                        setIcon(icon === 'eye' ? 'eye-off' : 'eye')
                                                    }}></MaterialCommunityIcons>
                                            </View>
                                            <TouchableOpacity style={[styles.button, { color: theme.foreground }]} title='LOGIN' onPress={
                                                () => submit(setUser)
                                            } >
                                                <Text style={{ fontSize: 20, color: 'white' }}>Đăng nhập</Text>
                                            </TouchableOpacity>
                                        </View>
                                        <TouchableOpacity onPress={() => {
                                            setModalVisible(true)
                                            setLayer(0)
                                        }}>
                                            <Text style={[{ alignSelf: 'center', opacity: 0.5, color: theme.foreground }]}>Quên mật khẩu</Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity onPress={() => {
                                            navigation.navigate('SignUpScreen')
                                        }}>
                                            <Text style={[{ alignSelf: 'center', opacity: 0.9, color: theme.foreground }]}>Bạn chưa có tài khoản? Đăng ký ngay</Text>

                                        </TouchableOpacity>
                                        <TouchableOpacity style={[{ alignSelf: 'center', margin: 20 }]}
                                            onPress={() => {
                                                promptAsync({ useProxy });
                                            }}
                                        >
                                            <Image source={require('../../../assets/btn_google_light.png')} style={{ width: 50, height: 50 }} />
                                        </TouchableOpacity>
                                        <View style={styles.centeredView, { backgroundColor: theme.background }}>
                                            <Modal
                                                animationType="fade"
                                                transparent={true}
                                                visible={modalVisible}
                                            >
                                                <View style={[styles.centeredView, { backgroundColor: theme.background, width: '100%', height: '100%' }]}>
                                                    <View style={[styles.modalView, { backgroundColor: theme.foreground }]}>
                                                        <Text style={[styles.modalText, { color: theme.background }]}>Quên mật khẩu</Text>
                                                        <TextInput style={{ opacity: forgetOpacity, color: theme.background }} placeholder='Nhập Email' value={forget}
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
                                                                    const info = JSON.stringify({
                                                                        email: forget
                                                                    })
                                                                    const forgetPassword = await REST_API.forgetPassword(info)
                                                                    Alert.alert(forgetPassword.message)
                                                                    setModalVisible(!modalVisible);
                                                                    setLayer(1)

                                                                }}
                                                            >
                                                                <Text style={[styles.textStyle, { color: theme.foreground }]}>Xác nhận</Text>
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
                                )

                        }}
                    </ThemeContext.Consumer>
                )
            }}
        </AuthContext.Consumer >
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
