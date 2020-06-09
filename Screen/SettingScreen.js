import React, { useState } from "react";
import { StyleSheet, Text, View, Button, Dimensions, Alert, TouchableOpacity, Switch } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Avatar } from "react-native-elements";
import ThemeContext, { themes } from '../src/Context/theme-context'
export default function SettingScreen({ navigation }) {
    const [darkValue, setDarkValue] = useState(false)
    return (
        <ThemeContext.Consumer>
            {
                ([theme, setTheme]) => {
                    if (theme.background === '#0E0F13') {
                        setDarkValue(true)
                    }
                    return (
                        <View style={[styles.container, { backgroundColor: theme.background }]}>
                            <View style={styles.avatar}>
                                <Avatar
                                    containerStyle={{}}
                                    size={40}
                                    rounded
                                    source={{
                                        uri:
                                            "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
                                    }}
                                />
                                <View style={{ flexDirection: 'column' }}>
                                    <Text style={{ color: theme.foreground, fontSize: 16, marginLeft: 20 }}>Andrew</Text>
                                    <Text style={{ color: theme.foreground, fontSize: 12, marginLeft: 20, opacity: 0.5 }}>andrew.josh</Text>
                                </View>
                            </View>
                            <View style={{ display: 'flex', flexDirection: 'row', marginLeft: 20, marginBottom: 20 }}>
                                <Text style={{ color: theme.foreground, marginRight: 220 }}>Dark Mode</Text>
                                <Switch
                                    trackColor={{
                                        true: theme.foreground,
                                        false: theme.foreground
                                    }}
                                    thumbColor={'whitesmoke'}
                                    value={darkValue}
                                    onValueChange={() => {
                                        if (!darkValue) {
                                            setTheme(themes.dark),
                                                setDarkValue(true)
                                        }
                                        else {
                                            setTheme(themes.light)
                                            setDarkValue(false)
                                        }
                                    }}
                                />
                            </View>

                            <TouchableOpacity style={{
                                justifyContent: 'center',
                                alignSelf: 'center',
                                alignItems: 'center',
                                borderColor: '#0084BD',
                                borderWidth: 1,
                                width: Dimensions.get('window').width * 90 / 100,
                                height: 40,
                                borderRadius: 5

                            }}>
                                <Text style={{ color: '#0084BD' }}>SIGN OUT</Text>
                            </TouchableOpacity>

                        </View>
                    )
                }
            }
        </ThemeContext.Consumer>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "flex-start",
        justifyContent: "flex-start",
    },
    avatar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 20,
        marginBottom: 40
    },
});