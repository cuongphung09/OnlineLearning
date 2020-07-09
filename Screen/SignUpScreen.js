import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, AsyncStorage, TextInput, TouchableOpacity } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import ThemeContext from "../src/Context/theme-context";
import AuthContext from "../src/Context/auth-context";

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
    const submit = async () => {
        console.log({
            name: name,
            email: email,
            password: password,
            rePassword: rePassword,
            phone: phone
        })
        // let response = await fetch('https://api.itedu.me/user/login', {
        //     method: 'POST',
        //     headers: {
        //         Accept: 'application/json',
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({
        //         email: username,
        //         password: password,
        //     }),
        // })

    }
    const validateEmail = (text) => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (reg.test(text) === false) {
            console.log("Email is Not Correct");
        }
        else {
            console.log("Email is Correct");
        }
    }
    return (
        <View style={[styles.container, {}]}>
            <Text style={{ fontSize: 30, fontWeight: 'bold', textAlign: 'center', marginBottom: 30 }}>Sign Up</Text>
            <View style={{ margin: 30, marginBottom: 10 }}>
                <TextInput style={{ opacity: nameOpacity, marginBottom: 20 }} placeholder='Name' value={name}
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
                        validateEmail(value)
                    }}
                    textContentType={'emailAddress'}
                ></TextInput>
                <TextInput style={{ opacity: passwordOpacity, marginBottom: 20 }} value={password} placeholder='Password'
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
                <TextInput style={{ opacity: rePasswordOpacity, marginBottom: 20 }} value={rePassword} placeholder='Confirm Password'
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
                <TextInput style={{ opacity: phoneOpacity, marginBottom: 20 }} placeholder='Phone number' value={phone}
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
                    () => submit()
                } >
                    <Text style={{ fontSize: 20, color: 'white' }}>Sign up</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => {

                navigation.navigate('LoginScreen')
            }}>
                <Text style={[{ alignSelf: 'center', opacity: 0.5 }]}>Do you have an account? Login</Text>
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
