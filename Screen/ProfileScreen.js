import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, AsyncStorage, Modal, Image, TouchableHighlight } from 'react-native';
import { Avatar, Icon } from "react-native-elements";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, HeaderTitle } from '@react-navigation/stack';
import ThemeContext from '../src/Context/theme-context'
import AuthContext from '../src/Context/auth-context'
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
export default function ProfileScreen({ navigation, props, route }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [token, setToken] = useState('')
    const [userInfo, setUserInfo] = useState()
    const [uploadImg, setUploadImg] = useState(null)
    const [modalVisible, setModalVisible] = useState(false)
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
        getPermissionAsync()
    }, []);
    const getPermissionAsync = async () => {
        if (Constants.platform.ios) {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
            }
        }
    };
    const pickImage = async () => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 1,
            });
            if (!result.cancelled) {
                setUploadImg(result.uri);
            }
            setModalVisible(true)
            console.log(result);
        } catch (E) {
            console.log(E);
        }
    };
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
                                                    <Avatar
                                                        containerStyle={{ marginRight: 20 }}
                                                        size={75}
                                                        rounded
                                                        source={{
                                                            uri: user.avatar
                                                        }}

                                                    />
                                                    <TouchableOpacity style={{ position: 'relative', display: 'flex', bottom: 20, left: 50, backgroundColor: 'lightgray', width: 30, height: 30, borderRadius: 25, justifyContent: 'center', borderWidth: 1, borderColor: 'gray', borderStyle: 'solid' }}
                                                        onPress={() => {
                                                            pickImage()
                                                        }}
                                                    >
                                                        <Icon size={20} name='edit'></Icon>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>

                                            <Text style={{ color: theme.foreground, fontSize: 20, fontWeight: 'bold' }}>
                                                {user.name}
                                            </Text>
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
                                                {uploadImg && <Image source={{ uri: uploadImg }} style={{ width: 200, height: 200 }} />}
                                                <View style={{ flexDirection: 'row' }}>
                                                    <TouchableHighlight style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                                                        onPress={() => {
                                                            setModalVisible(false)
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
                                    </View>
                                )
                            }

                        }
                    </ThemeContext.Consumer>
                )
            }}
        </AuthContext.Consumer>

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
        // opacity: 0.5,
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
