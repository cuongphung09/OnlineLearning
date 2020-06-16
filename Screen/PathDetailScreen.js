import React, {useState} from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, Image, Dimensions } from 'react-native';
import { Avatar } from "react-native-elements";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, HeaderTitle } from '@react-navigation/stack';
import ThemeContext from '../src/Context/theme-context'
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { ScrollView } from 'react-native-gesture-handler';
export default function PathDetailScreen({ navigation, props, route }) {
    // console.log(route.params.item)
    const [textHeight, setTextHeight] = useState(80)
    const [chevron, setchevron] = useState('chevron-down')
    navigation.setOptions({ title: route.params.item.name })
    return (
        <ThemeContext.Consumer>
            {
                ([theme, setTheme]) => {
                    return (
                        <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
                            <View style={{ margin: 10 }}>
                                <TouchableOpacity style={[{ flexDirection: "row" }]} >
                                    <View style={styles.imgContainer}>
                                        <Image style={styles.img} source={require('../react.png')}></Image>
                                    </View>

                                    <View style={[styles.textContainer, { flexDirection: 'column' }]}>
                                        <Text style={[styles.title, { color: theme.foreground, flexWrap: 'wrap' }]}>{route.params.item.name}</Text>
                                        <Text style={[styles.text, { color: theme.foreground, flexWrap: 'wrap' }]}>{route.params.item.courses.length} courses</Text>
                                    </View>
                                </TouchableOpacity>
                                <View style={{
                                    display: 'flex', flexDirection: 'row', height: textHeight, marginBottom: 20
                                }}>
                                    <View style={{ width: '88%', marginLeft: 10, marginRight: 0 }}>
                                        <Text style={{ color: theme.foreground, height: textHeight }}>
                                            {route.params.item.description}
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
    }
});
