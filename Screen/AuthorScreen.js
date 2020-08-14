import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, Image, Dimensions, ProgressBarAndroid } from 'react-native';
import { Divider } from "react-native-elements";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, HeaderTitle } from '@react-navigation/stack';
import { Avatar } from "react-native-elements";
import ThemeContext, { themes } from '../src/Context/theme-context'
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { ScrollView } from 'react-native-gesture-handler';
import ListLessonItem from '../src/Courses/ListCoursesItem/list-courses-item'
import SectionCourse from '../src/Main/Home/SectionCourses/section-courses'
import { REST_API } from '../config/api';

export default function AuthorDetailScreen({ navigation, props, route }) {
    const id = route.params.item.id
    // console.log(id)
    const [textHeight, setTextHeight] = useState(80)
    const [chevron, setchevron] = useState('chevron-down')
    const [authorData, setAuthorData] = useState()
    useEffect(() => {
        const loadData = async (id) => {
            const instructor = await REST_API.getInstructor(id)
            if (instructor.message === 'OK') {
                setAuthorData(instructor.payload)
            }
        }
        loadData(id)
    }, [])
    return (
        <ThemeContext.Consumer>
            {
                ([theme, setTheme]) => {
                    return (
                        <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
                            {
                                // console.log(authorData)
                            }
                            <View style={{ margin: 10 }}>
                                <View style={styles.avatar}>
                                    <Avatar
                                        containerStyle={{}}
                                        size={75}
                                        rounded
                                        source={{
                                            uri: route.params.item.avatar,
                                        }}

                                    />
                                    <Text style={{ color: theme.foreground, fontSize: 20, fontWeight: 'bold' }}>{route.params.item.name}</Text>
                                    <Text style={{ color: theme.foreground, fontSize: 12, margin: 5 }}>
                                        {
                                            authorData ? authorData.major : ''
                                        }
                                    </Text>
                                    {/* <TouchableOpacity style={{
                                        justifyContent: 'center',
                                        alignSelf: 'center',
                                        alignItems: 'center',
                                        borderColor: '#0084BD',
                                        borderWidth: 1,
                                        width: Dimensions.get('window').width * 90 / 100,
                                        height: 40,
                                        borderRadius: 5,
                                        margin: 5
                                    }}

                                    >
                                        <Text style={{ color: '#0084BD' }}>FOLLOW</Text>
                                    </TouchableOpacity>
                                    <Text style={{ color: theme.foreground, fontSize: 12, margin: 5 }}>Follow to notified when new courses are published</Text> */}

                                </View>
                                <View style={{
                                    display: 'flex', flexDirection: 'row', height: textHeight, marginBottom: 20
                                }}>
                                    <View style={{ width: '88%', marginLeft: 10, marginRight: 0 }}>
                                        <Text style={{ color: theme.foreground, fontWeight: 'bold' }}>Tự giới thiệu</Text>
                                        <Text style={{ color: theme.foreground, height: textHeight }}>
                                            {
                                                authorData ? authorData.intro : ''
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
                                <Text
                                    style={{
                                        marginLeft: 10,
                                        marginTop: 20,
                                        fontWeight: "bold",
                                        color: theme.foreground,
                                    }}
                                >
                                    Kỹ năng
                                </Text>
                                <View
                                    style={{
                                        display: "flex",
                                        flexDirection: "row",
                                    }}
                                >
                                    <View style={{ width: "88%", marginLeft: 10, marginRight: 0 }}>
                                        <Text style={{ color: theme.foreground }}>
                                            {
                                                authorData ? (
                                                    authorData.skills.length !== 0 ? (
                                                        authorData.skills.map((item, index) => (
                                                            <Text key={index}>✓ {item}{"\n"}</Text>
                                                        ))
                                                    ) : (
                                                            <Text>(không có)</Text>
                                                        )
                                                ) : (
                                                        <Text></Text>
                                                    )
                                            }

                                            {
                                                // console.log(authorData)
                                            }
                                        </Text>
                                    </View>
                                </View>
                                <Text
                                    style={{
                                        marginLeft: 10,
                                        fontWeight: "bold",
                                        color: theme.foreground,
                                    }}
                                >
                                    Khóa học được dạy bởi giảng viên {route.params.item.name}
                                </Text>
                                {authorData ? ((authorData.courses !== [] ? (
                                    <View style={{ marginLeft: 10 }}>
                                        <SectionCourse
                                            navigation={navigation}
                                            name={''}
                                            data={authorData ? authorData.courses : []}
                                        />
                                    </View>
                                ) : (<View style={{ marginLeft: 10 }}><Text>(không có)</Text></View>))) : (<View style={{ marginLeft: 10 }}><Text>(không có)</Text></View>)}
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
