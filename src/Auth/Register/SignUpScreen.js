import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, AsyncStorage, TextInput, TouchableOpacity, Alert } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import ThemeContext from "../../Context/theme-context";
import AuthContext from "../../Context/auth-context";

export default function SignUpScreen({ navigation }) {

    const [nameOpacity, setNameOpacity] = useState(0.7)
    const [emailOpacity, setEmailOpacity] = useState(0.7)
    const [passwordOpacity, setPasswordOpacity] = useState(0.7)
    const [rePasswordOpacity, setRePasswordOpacity] = useState(0.7)
    const [phoneOpacity, setPhoneOpacity] = useState(0.7)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [rePassword, setRePassword] = useState('')
    const [phone, setPhone] = useState('')
    useEffect(() => {


    }, []);
    const submit = async (navigation) => {
        console.log({
            name: name,
            email: email,
            password: password,
            rePassword: rePassword,
            phone: phone
        })
        if (password !== rePassword) {
            Alert.alert('Xác nhận mật khẩu không trùng khớp')
            console.log(validateEmail(email))
        }
        else if (validateEmail(email) === false) {
            Alert.alert('Email không hợp lệ')
        }
        else {
            let response = await fetch('https://api.itedu.me/user/register', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "username": name,
                    "email": email,
                    "phone": phone,
                    "password": password
                }),
            })
            let responseJson = await response.json()
            if (responseJson.message === 'OK') {
                let sendEmail = await fetch('https://api.itedu.me/user/send-activate-email', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        "email": email,
                    }),
                })
                Alert.alert('Đăng ký thành công. Hãy kiểm tra email của bạn!')
                navigation.navigate('LoginScreen')
            }
            else {
                Alert.alert(responseJson.message)
            }
        }


    }
    const validateEmail = (text) => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (reg.test(text) === false) {
            return false
        }
        else {
            return true
        }
    }
    return (
        <View style={[styles.container, {}]}>
            <Text style={{ fontSize: 30, fontWeight: 'bold', textAlign: 'center', marginBottom: 30 }}>Đăng ký</Text>
            <View style={{ margin: 30, marginBottom: 10 }}>
                <TextInput style={{ opacity: nameOpacity, marginBottom: 20 }} placeholder='Họ và tên' value={name}
                    onChangeText={(value) => {
                        if (value !== '') {
                            setNameOpacity(1)
                        }
                        setName(value)
                    }}
                    textContentType={'name'}
                ></TextInput>
                <TextInput style={{ opacity: emailOpacity, marginBottom: 20 }} placeholder='Email' value={email}
                    autoCapitalize={"none"}
                    onChangeText={(value) => {
                        if (value !== '') {
                            setEmailOpacity(1)
                        }
                        setEmail(value)

                    }}
                    textContentType={'emailAddress'}
                ></TextInput>
                <TextInput style={{ opacity: passwordOpacity, marginBottom: 20 }} value={password} placeholder='Mật khẩu'
                    secureTextEntry={true}
                    onChangeText={(value) => {
                        if (value !== '') {
                            setPasswordOpacity(1)
                        }
                        setPassword(value)
                    }}
                    textContentType={'password'}
                >

                </TextInput>
                <TextInput style={{ opacity: rePasswordOpacity, marginBottom: 20 }} value={rePassword} placeholder='Xác nhận mật khẩu'
                    secureTextEntry={true}
                    onChangeText={(value) => {
                        if (value !== '') {
                            setRePasswordOpacity(1)
                        }
                        setRePassword(value)
                    }}
                    textContentType={'password'}
                >
                </TextInput>
                <TextInput style={{ opacity: phoneOpacity, marginBottom: 20 }} placeholder='Số điện thoại' value={phone}
                    onChangeText={(value) => {
                        if (value !== '') {
                            setPhoneOpacity(1)
                        }
                        setPhone(value)
                    }}
                    textContentType={'telephoneNumber'}
                    keyboardType={'number-pad'}
                ></TextInput>
                <TouchableOpacity style={[styles.button, {}]} title='LOGIN' onPress={
                    () => submit(navigation)
                } >
                    <Text style={{ fontSize: 20, color: 'white' }}>Đăng ký</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => {

                navigation.navigate('LoginScreen')
            }}>
                <Text style={[{ alignSelf: 'center', opacity: 0.5 }]}>Bạn đã có tài khoản? Đăng nhập ngay</Text>
            </TouchableOpacity>


        </View>
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
    }
});
