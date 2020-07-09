import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, AsyncStorage } from 'react-native';
import { Avatar } from "react-native-elements";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, HeaderTitle } from '@react-navigation/stack';
import ThemeContext from '../src/Context/theme-context'
import AuthContext from '../src/Context/auth-context'
export default function ProfileScreen({ navigation, props, route }) {
    // console.log(route.params.item)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [token, setToken] = useState('')
    const [userInfo, setUserInfo] = useState()
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
    return (
        <AuthContext.Consumer>
            {([user, setUser]) => {
                console.log(user)
                return (
                    <ThemeContext.Consumer>
                        {
                            ([theme, setTheme]) => {
                                return (
                                    <View style={[styles.container, { backgroundColor: theme.background }]}>
                                        <View style={styles.avatar}>
                                            <Avatar
                                                containerStyle={{ marginRight: 20 }}
                                                size={75}
                                                rounded
                                                source={{
                                                    uri: user.avatar
                                                }}

                                            />
                                            <Text style={{ color: theme.foreground, fontSize: 20, fontWeight: 'bold' }}>
                                                {user.name}
                                            </Text>
                                        </View>
                                        <View style={styles.activity}>
                                            <Text style={{ fontSize: 15, color: theme.foreground, marginBottom: 30, fontWeight: 'bold' }}>Activity insights (lasts 30 days)</Text>
                                            <Text style={[styles.darkText, { color: theme.foreground }]}>TOTAL ACTIVE DAYS</Text>
                                            <Text style={[styles.lightText, { color: theme.foreground }]}>0</Text>
                                            <Text style={[styles.darkText, { color: theme.foreground }]}>MOST ACTIVE TIME OF DAYS</Text>
                                            <Text style={[styles.lightText, { color: theme.foreground }]}>7:00 AM</Text>
                                            <Text style={[styles.darkText, { color: theme.foreground }]}>MOST VIEWED SUBJECTS</Text>
                                            <Text style={[styles.lightText, { color: theme.foreground }]}>N/A</Text>
                                        </View>

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
    }
});
