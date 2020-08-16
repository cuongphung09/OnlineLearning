import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, AsyncStorage, TextInput, TouchableOpacity, Alert } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import ThemeContext from "../../Context/theme-context";
import AuthContext from "../../Context/auth-context";
import { REST_API } from "../../../config/api";

export default function SignUpScreen({ navigation }) {

    const [nameOpacity, setNameOpacity] = useState(0.7)
    const [emailOpacity, setEmailOpacity] = useState(0.7)
    const [passwordOpacity, setPasswordOpacity] = useState(0.7)
    const [rePasswordOpacity, setRePasswordOpacity] = useState(0.7)
    const [phoneOpacity, setPhoneOpacity] = useState(0.7)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [checkEmail, setCheckEmail] = useState('none')
    const [password, setPassword] = useState('')
    const [checkPassword, setCheckPassword] = useState('none')
    const [rePassword, setRePassword] = useState('')
    const [checkRePassword, setCheckRePassword] = useState('none')
    const [phone, setPhone] = useState('')
    const [checkPhone, setCheckPhone] = useState('none')
    useEffect(() => {


    }, []);
    const submit = async (navigation) => {
        if (password !== rePassword) {
            Alert.alert('Xác nhận mật khẩu không trùng khớp')
        }
        else if (validateEmail(email) === false) {
            Alert.alert('Email không hợp lệ')
        }
        else {
            const info = JSON.stringify({
                "username": name,
                "email": email,
                "phone": phone,
                "password": password
            })
            let register = await REST_API.register(info)
            if (register.message === 'OK') {
                let info = JSON.stringify({
                    email: email
                })
                let sendEmail = await REST_API.sendActivateEmail(info)
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
    const validatePassword = (text) => {
        let vnf_regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,16}$/;
        if (vnf_regex.test(text) === false) {
            return false
        }
        else {
            return true
        }
    }
    const validatePhone = (text) => {
        let vnf_regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
        if (vnf_regex.test(text) === false) {
            return false
        }
        else {
            return true
        }
    }
    return (
        <View style={[styles.container, {}]}>
            <Text style={{ fontSize: 30, fontWeight: 'bold', textAlign: 'center', marginTop: 30 }}>Đăng ký</Text>
            <View style={{ margin: 30, marginTop: 10 }}>
                <TextInput style={{ opacity: nameOpacity, marginTop: 20 }} placeholder='Họ và tên' value={name}
                    onChangeText={(value) => {
                        if (value !== '') {
                            setNameOpacity(1)
                        }
                        setName(value)
                    }}
                    textContentType={'name'}
                ></TextInput>
                <TextInput style={{ opacity: emailOpacity, marginTop: 20 }} placeholder='Email' value={email}
                    autoCapitalize={"none"}
                    onChangeText={(value) => {
                        if (value !== '') {
                            setEmailOpacity(1)
                        }
                        validateEmail(value) ? setCheckEmail('none') : setCheckEmail('flex')
                        setEmail(value)

                    }}
                    textContentType={'emailAddress'}
                ></TextInput>
                <Text style={{ display: checkEmail, color: 'red', fontSize: 10 }}>Email chưa đúng định dạng</Text>
                <TextInput style={{ opacity: passwordOpacity, marginTop: 20 }} value={password} placeholder='Mật khẩu'
                    secureTextEntry={true}
                    onChangeText={(value) => {
                        if (value !== '') {
                            setPasswordOpacity(1)
                        }
                        setPassword(value)
                        validatePassword(value) ? setCheckPassword('none') : setCheckPassword('flex')
                    }}
                    textContentType={'password'}
                >

                </TextInput>
                <Text style={{ display: checkPassword, color: 'red', fontSize: 10 }}>Mật khẩu phải có độ dài từ 8-16 kí tự, chứa ít nhất một kí tự số, một kí tự viết hoa và một kí tự viết thường</Text>
                <TextInput style={{ opacity: rePasswordOpacity, marginTop: 20 }} value={rePassword} placeholder='Xác nhận mật khẩu'
                    secureTextEntry={true}
                    onChangeText={(value) => {
                        password === value ? setCheckRePassword('none') : setCheckRePassword('flex')
                        if (value !== '') {
                            setRePasswordOpacity(1)
                        }
                        setRePassword(value)

                    }}
                    textContentType={'password'}
                >
                </TextInput>
                <Text style={{ display: checkRePassword, color: 'red', fontSize: 10 }}>Xác nhận mật khẩu phải trùng khớp với mật khẩu</Text>
                <TextInput style={{ opacity: phoneOpacity, marginTop: 20 }} placeholder='Số điện thoại' value={phone}
                    onChangeText={(value) => {
                        validatePhone(value) ? setCheckPhone('none') : setCheckPhone('flex')
                        if (value !== '') {
                            setPhoneOpacity(1)
                        }
                        setPhone(value)

                    }}
                    textContentType={'telephoneNumber'}
                    keyboardType={'number-pad'}
                ></TextInput>
                <Text style={{ display: checkPhone, color: 'red', fontSize: 10 }}>Số điện thoại chưa đúng định dạng</Text>
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
