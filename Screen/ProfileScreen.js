import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, AsyncStorage, Modal, Image, TouchableHighlight, Alert, Dimensions, TouchableHighlightBase } from 'react-native';
import { Avatar, Icon } from "react-native-elements";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import ThemeContext from '../src/Context/theme-context'
import AuthContext from '../src/Context/auth-context'
import { TouchableOpacity, TextInput } from 'react-native-gesture-handler';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { REST_API } from "../config/api";
import * as firebase from 'firebase';
const firebaseConfig = {
    apiKey: "AIzaSyDldTq6VcDMcbpvuo5oMFeVfSviPN_6Xnk",
    authDomain: "online-learning-8ff74.firebaseapp.com",
    databaseURL: "https://online-learning-8ff74.firebaseio.com",
    projectId: "online-learning-8ff74",
    storageBucket: "online-learning-8ff74.appspot.com",
    messagingSenderId: "1075264511640",
    appId: "1:1075264511640:web:cc61abcde1f707a2f87aed",
    measurementId: "G-XQ90HCQ7NQ"
};
if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
}
export default function ProfileScreen({ navigation, props, route }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [token, setToken] = useState('')
    const [userInfo, setUserInfo] = useState()
    const [uploadImg, setUploadImg] = useState(null)
    const [modalVisible, setModalVisible] = useState(false)
    const [offlineAvatar, setOfflineAvatar] = useState('')
    const [openAvatar, setOpenAvatar] = useState(false)
    const [editing, setEditing] = useState(false)
    const [editing1, setEditing1] = useState(false)
    const [changeName, setChangName] = useState('')
    const [changePhone, setChangePhone] = useState('')
    const [uploadMethod, setUploadMethod] = useState(false)
    useEffect(() => {
        async function fetchData() {
            const isLoggedInTemp = await AsyncStorage.getItem('isLoggedIn')
            const tokenTemp = await AsyncStorage.getItem('token')
            const userInfoTemp = await AsyncStorage.getItem('userInfo')
            setIsLoggedIn(isLoggedInTemp)
            setToken(tokenTemp)
            setUserInfo(userInfoTemp)
        }
        fetchData()

    }, []);
    const checkCameraRollPermission = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL)
        if (status !== 'granted') {
            Alert.alert(
                'Hey',
                'Hey! You might want to enable notifications for my app, they are good.',
                [
                    { text: 'Settings', onPress: () => Linking.openURL('app-settings:') },
                    {
                        text: 'Cancel',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel'
                    }
                ]
            )
            return false
        }
        return true
    }
    const pickImageCamera = async () => {
        const checkPermissions = await checkCameraRollPermission()
        if (!checkPermissions) return

        let result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [1, 1],
        });
        if (!result.cancelled) {
            const ava = await uploadImage(result.uri, "test-image");
            setModalVisible(true)
            setOfflineAvatar(result.uri)
            setUploadMethod(false)
        }

    };
    const pickImageGalery = async () => {
        const checkPermissions = await checkCameraRollPermission()
        if (!checkPermissions) return

        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [1, 1],
        });
        if (!result.cancelled) {
            const ava = await uploadImage(result.uri, "test-image");
            setModalVisible(true)
            setOfflineAvatar(result.uri)
            setUploadMethod(false)
        }

    };
    const uploadImage = async (uri, imageName) => {
        const response = await fetch(uri)
        const blob = await response.blob()
        var ref = firebase.storage().ref().child(imageName)
        ref.put(blob)
        ref.getDownloadURL().then((downloadURL) => {
            setUploadImg(downloadURL)
        })
    }
    const saveAvatar = async (setUser) => {
        let userInfoTemp = await AsyncStorage.getItem('userInfo')
        let info = JSON.stringify({
            avatar: uploadImg || JSON.parse(userInfoTemp).avatar,
            name: changeName || JSON.parse(userInfoTemp).name,
            phone: changePhone || JSON.parse(userInfoTemp).phone
        })
        let saveAva = await REST_API.saveUserInfo(info)
        const reloadInfo = await REST_API.getInfo()
        if (reloadInfo.message === 'OK') {
            setUser(reloadInfo.payload)
            AsyncStorage.setItem('userInfo', JSON.stringify(reloadInfo.payload))
        }
        else {
            Alert.alert(reloadInfo.message)
        }
    }

    return (
        <AuthContext.Consumer>
            {([user, setUser]) => {
                return (
                    <ThemeContext.Consumer>
                        {
                            ([theme, setTheme]) => {
                                return (
                                    <View style={[styles.container, { backgroundColor: theme.background }]}>
                                        <View style={styles.avatar}>
                                            <View style={{ position: 'relative' }}>
                                                <View style={{}}>
                                                    <TouchableOpacity
                                                        onPress={() => {
                                                            setOpenAvatar(true)
                                                        }}
                                                    >
                                                        <Avatar
                                                            containerStyle={{ marginRight: 20 }}
                                                            size={75}
                                                            rounded
                                                            source={{
                                                                uri: user.avatar
                                                            }}

                                                        />
                                                    </TouchableOpacity>

                                                    <TouchableOpacity style={{ position: 'relative', display: 'flex', bottom: 20, left: 50, backgroundColor: 'lightgray', width: 30, height: 30, borderRadius: 25, justifyContent: 'center', borderWidth: 1, borderColor: 'gray', borderStyle: 'solid' }}
                                                        onPress={() => {
                                                            // pickImageCamera()
                                                            setUploadMethod(true)
                                                        }}
                                                    >
                                                        <Icon size={20} name='edit'></Icon>

                                                    </TouchableOpacity>

                                                </View>
                                            </View>
                                            <View style={{ bottom: 20 }}>
                                                <View style={{ flexDirection: 'row' }}>
                                                    {editing === false ? (<Text style={{ color: theme.foreground, fontSize: 20, fontWeight: 'bold', width: '75%' }}>
                                                        {user.name}
                                                    </Text>) : (<TextInput autoFocus={true} style={{ width: '75%',color: theme.foreground }} placeholder='Nhập tên mới'
                                                        onChangeText={(value) => {
                                                            setChangName(value)
                                                        }}
                                                        onSubmitEditing={() => {
                                                            saveAvatar(setUser)
                                                            setEditing(false)
                                                        }}></TextInput>)}


                                                    <TouchableOpacity style={{ position: 'relative', display: 'flex', left: 10, width: 30, height: 30, justifyContent: 'center' }}
                                                        onPress={() => {
                                                            setEditing(!editing)
                                                        }}
                                                    >
                                                        <MaterialCommunityIcons size={20} name={editing === false ? 'account-edit' : 'close'} color='gray'></MaterialCommunityIcons>

                                                    </TouchableOpacity>
                                                </View>
                                                <View style={{ flexDirection: 'row' }}>
                                                    {editing1 === false ? (<Text style={{ color: theme.foreground, fontSize: 20, fontWeight: 'bold', width: '75%' }}>
                                                        {user.phone}
                                                    </Text>) : (<TextInput autoFocus={true} style={{ width: '75%',color: theme.foreground }} placeholder='Nhập số điện thoại mới'
                                                        onChangeText={(value) => {
                                                            setChangePhone(value)
                                                        }}
                                                        onSubmitEditing={() => {
                                                            saveAvatar(setUser)
                                                            setEditing1(false)
                                                        }}></TextInput>)}


                                                    <TouchableOpacity style={{ position: 'relative', display: 'flex', left: 10, width: 30, height: 30, justifyContent: 'center' }}
                                                        onPress={() => {
                                                            setEditing1(!editing1)
                                                        }}
                                                    >
                                                        <MaterialCommunityIcons size={20} name={editing1 === false ? 'phone' : 'close'} color='gray'></MaterialCommunityIcons>

                                                    </TouchableOpacity>
                                                </View>
                                            </View>

                                        </View>
                                        <View style={styles.activity}>
                                            <Text style={{ fontSize: 15, color: theme.foreground, marginBottom: 30, fontWeight: 'bold' }}>Hoạt động gần đây (trong vòng 30 ngày)</Text>
                                            <Text style={[styles.darkText, { color: theme.foreground }]}>Số ngày hoạt động</Text>
                                            <Text style={[styles.lightText, { color: theme.foreground }]}>0</Text>
                                            <Text style={[styles.darkText, { color: theme.foreground }]}>Thời gian thường xuyên hoạt động</Text>
                                            <Text style={[styles.lightText, { color: theme.foreground }]}>7:00 sáng</Text>
                                            <Text style={[styles.darkText, { color: theme.foreground }]}>Các khóa học được xem nhiều nhất</Text>
                                            <Text style={[styles.lightText, { color: theme.foreground }]}>(không có)</Text>
                                        </View>
                                        <Modal
                                            animationType="slide"
                                            transparent={true}
                                            visible={modalVisible}
                                            onRequestClose={() => {
                                                Alert.alert("Modal has been closed.");
                                            }}
                                            style={{}}
                                        >
                                            <View style={{ justifyContent: 'center', width: 360, height: 640, alignItems: 'center', backgroundColor: theme.background }}>
                                                {uploadImg && <Image source={{ uri: offlineAvatar }} style={{ width: 200, height: 200, borderRadius: 100 }} />}
                                                <View style={{ flexDirection: 'row' }}>
                                                    <TouchableHighlight style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                                                        onPress={() => {
                                                            setModalVisible(false)
                                                            saveAvatar(setUser)
                                                        }}
                                                    >
                                                        <Text style={{ fontWeight: "bold", textAlign: "center", color: 'white' }}>Lưu</Text>
                                                    </TouchableHighlight>
                                                    <TouchableHighlight style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                                                        onPress={() => {
                                                            setModalVisible(false)
                                                        }}
                                                    >
                                                        <Text style={{ fontWeight: "bold", textAlign: "center", color: 'white' }}>Hủy</Text>
                                                    </TouchableHighlight>
                                                </View>

                                            </View>
                                        </Modal>
                                        <Modal
                                            animationType="slide"
                                            transparent={true}
                                            visible={openAvatar}
                                            onRequestClose={() => {
                                                setOpenAvatar(false)
                                            }}

                                            style={{}}
                                        >
                                            <View style={{ justifyContent: 'flex-start', width: 360, height: '100%', backgroundColor: 'black' }}>
                                                <MaterialCommunityIcons onPress={() => { setOpenAvatar(false) }} size={25} name='close' color='white' style={{ alignSelf: 'flex-end', top: 0, margin: 10 }}></MaterialCommunityIcons>

                                                <View style={{ top: '20%' }}>
                                                    {
                                                        <Image source={{ uri: user.avatar }} style={{ width: 360, height: 360 }} />
                                                    }
                                                </View>
                                            </View>

                                        </Modal>
                                        <Modal
                                            animationType="fade"
                                            transparent={true}
                                            visible={uploadMethod}
                                            onRequestClose={() => {
                                                setUploadMethod(false)
                                            }}
                                            style={{}}
                                        >
                                            <View style={{ backgroundColor: 'rgba(0,0,0,0.5)', height: '100%' }}>
                                                <TouchableHighlight style={{
                                                    justifyContent: 'center',
                                                    alignSelf: 'center',
                                                    alignItems: 'center',
                                                    borderColor: '#0084BD',
                                                    borderWidth: 1,
                                                    width: '100%',
                                                    height: 40,
                                                    backgroundColor: theme.background,
                                                    top: '40%'
                                                }}
                                                    onPress={() => {
                                                        pickImageGalery()
                                                    }}
                                                >
                                                    <Text style={{ color: '#0084BD' }}>Chọn từ Thư viện</Text>
                                                </TouchableHighlight>
                                                <TouchableHighlight style={{
                                                    justifyContent: 'center',
                                                    alignSelf: 'center',
                                                    alignItems: 'center',
                                                    borderColor: '#0084BD',
                                                    borderWidth: 1,
                                                    width: '100%',
                                                    height: 40,
                                                    backgroundColor: theme.background,
                                                    top: '40%'
                                                }}
                                                    onPress={() => {
                                                        pickImageCamera()
                                                    }}
                                                >
                                                    <Text style={{ color: '#0084BD' }}>Chụp ảnh</Text>
                                                </TouchableHighlight>
                                            </View>
                                        </Modal>
                                    </View>
                                )
                            }

                        }
                    </ThemeContext.Consumer>
                )
            }}
        </AuthContext.Consumer >

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0E0F13',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',

    },
    avatar: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 20,
        marginBottom: 40
    },
    activity: {
        marginLeft: 20
    },
    lightText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20
    },
    darkText: {
        opacity: 0.5,
        fontSize: 10,
        fontWeight: 'bold'
    },
    openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        margin: 10
    },
});
