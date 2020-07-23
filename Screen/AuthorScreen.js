import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, Image, Dimensions, ProgressBarAndroid } from 'react-native';
import { Divider } from "react-native-elements";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, HeaderTitle } from '@react-navigation/stack';
import { Avatar } from "react-native-elements";
import ThemeContext, { themes } from '../src/Context/theme-context'
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { ScrollView } from 'react-native-gesture-handler';
import ListLessonItem from '../src/Courses/ListCoursesItem/list-courses-item'

export default function AuthorDetailScreen({ navigation, props, route }) {
    const [textHeight, setTextHeight] = useState(80)
    const [chevron, setchevron] = useState('chevron-down')
    return (
        <ThemeContext.Consumer>
            {
                ([theme, setTheme]) => {
                    return (
                        <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
                            <View style={{ margin: 10 }}>
                                <View style={styles.avatar}>
                                    <Avatar
                                        containerStyle={{}}
                                        size={75}
                                        rounded
                                        source={{
                                            uri: route.params.item.avaUri,
                                        }}

                                    />
                                    <Text style={{ color: theme.foreground, fontSize: 20, fontWeight: 'bold' }}>{route.params.item.name}</Text>
                                    <Text style={{ color: theme.foreground, fontSize: 12, margin: 5 }}>Online Learning Author</Text>
                                    <TouchableOpacity style={{
                                        justifyContent: 'center',
                                        alignSelf: 'center',
                                        alignItems: 'center',
                                        borderColor: '#0084BD',
                                        borderWidth: 1,
                                        width: Dimensions.get('window').width * 90 / 100,
                                        height: 40,
                                        borderRadius: 5,
                                        margin: 5
                                    }}>
                                        <Text style={{ color: '#0084BD' }}>FOLLOW</Text>
                                    </TouchableOpacity>
                                    <Text style={{ color: theme.foreground, fontSize: 12, margin: 5 }}>Follow to notified when new courses are published</Text>

                                </View>
                                <View style={{
                                    display: 'flex', flexDirection: 'row', height: textHeight, marginBottom: 20
                                }}>
                                    <View style={{ width: '88%', marginLeft: 10, marginRight: 0 }}>
                                        <Text style={{ color: theme.foreground, height: textHeight }}>
                                            {
                                                // route.params.item.name
                                            }
                                        </Text>
                                    </View>

                                    <TouchableOpacity style={{
                                        display: 'flex', backgroundColor: theme.tagButton, borderRadius: 5,
                                        justifyContent: 'center', marginRight: 10, alignItems: 'center'
                                    }}
                                        onPress={() => {
                                            textHeight === 80 ? setTextHeight(null) : setTextHeight(80)
                                            chevron === 'chevron-down' ? setchevron('chevron-up') : setchevron('chevron-down')
                                        }}
                                    >
                                        <MaterialCommunityIcons
                                            name={chevron}
                                            color={theme.foreground}
                                            size={20}

                                        ></MaterialCommunityIcons>
                                    </TouchableOpacity>
                                </View>


                            </View>

                        </ScrollView>
                    )
                }
            }
        </ThemeContext.Consumer>

    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex'
    },
    imgContainer: {
        width: Dimensions.get('window').width * 30 / 100,
        height: 100,
    },
    img: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'contain',

    },
    textContainer: {
        margin: 10,
        alignContent: 'flex-start',
        alignSelf: 'flex-start',
        flex: 1,
    },
    title: {
        textAlignVertical: 'top',
        fontSize: 22
    },
    text: {
        fontSize: 12,
        opacity: 0.7
    },
    avatar: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
});
