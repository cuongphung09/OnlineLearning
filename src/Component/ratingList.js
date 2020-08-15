//This is an example code for the popup menu//
import React, { Component } from 'react';
//import react in our code.
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
//import all the components we are going to use.
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
//import menu and menu item
import { Avatar, Rating } from "react-native-elements";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import ThemeContext from '../Context/theme-context'
import { Icon } from 'react-native-elements';
const RatingList = (route, props) => {
    const list = route.data
    // console.log(star)
    function convert(a) {
        if (a) {
            var unixtimestamp = a;
            var months_arr = [
                "1",
                "2",
                "3",
                "4",
                "5",
                "6",
                "7",
                "8",
                "9",
                "10",
                "11",
                "12",
            ];
            var date = new Date(unixtimestamp * 1000);
            var year = date.getFullYear();
            var month = months_arr[date.getMonth()];
            var day = date.getDate();
            var hours = date.getHours();
            var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
            var seconds = "0" + date.getSeconds();
            var convdataTime = `${day}/${month}/${year} ${hours}:${minutes}`;
            return convdataTime;
        } else {
            return "";
        }
    }
    return (
        <ThemeContext.Consumer>
            {
                ([theme, setTheme]) => {
                    return (
                        <View style={{ alignItems: 'flex-start', flex: 1 }}>
                            {
                                list.map((item, index) => (
                                    <View key={index} style={{ flexDirection: 'row' }}>
                                        <View style={styles.avatar}>
                                            <Avatar
                                                containerStyle={{}}
                                                size={75}
                                                rounded
                                                source={{
                                                    uri: item.user.avatar,
                                                }}

                                            />
                                            <Text style={{ color: theme.foreground, fontSize: 10 }}>{item.user.name}</Text>

                                        </View>
                                        <View style={styles.rating}>
                                            <View style={{ flexDirection: 'row' }}>
                                                <Rating
                                                    style={{}}
                                                    type={"custom"}
                                                    imageSize={20}
                                                    tintColor={theme.background}
                                                    ratingColor='yellow'
                                                    ratingBackgroundColor='#c8c7c8'
                                                    startingValue={0}
                                                    readonly
                                                    startingValue={item.averagePoint}
                                                />
                                                <Text style={{ color: theme.foreground, fontSize: 10 }}>   {convert(Date.parse(item.updatedAt) / 1000)}</Text>
                                            </View>

                                            <Text style={{ color: theme.foreground, fontSize: 15 }}>{item.content}</Text>
                                        </View>
                                    </View>
                                ))
                            }
                        </View>
                    )
                }
            }
        </ThemeContext.Consumer>

    );

}
export default RatingList

const styles = StyleSheet.create({

    avatar: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '30%',
        margin: 10,
        alignSelf: 'center',
        alignContent: 'center'
    },
    rating: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        width: '30%',
        margin: 10,
        alignSelf: 'center',
        alignContent: 'center'
    },
});