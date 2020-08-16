import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import ThemeContext from '../Context/theme-context'
import { Icon } from 'react-native-elements';
const RatingDetail = (route, props) => {
    const star = route.data.stars
    return (
        <ThemeContext.Consumer>
            {
                ([theme, setTheme]) => {
                    return (
                        <View style={{ alignItems: 'flex-start', flex: 1 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 5 }}>
                                <Text style={{ color: 'rgb(244,193,80)', fontSize: 20 }}>5</Text>
                                <Icon color='rgb(244,193,80)' name='star'></Icon>
                                <View style={{ backgroundColor: '#f5f5f5', width: '60%', height: 5, borderRadius: 5 }}>
                                    <View style={{ backgroundColor: 'rgb(244,193,80)', width: `${star ? star[4] : '0'}%`, height: 5, borderRadius: 5 }}>
                                    </View>
                                </View>
                                <Text style={{ color: theme.foreground, fontSize: 15 }}> {star ? star[4] : '0'}%</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 5 }}>
                                <Text style={{ color: 'rgb(244,193,80)', fontSize: 20 }}>4</Text>
                                <Icon color='rgb(244,193,80)' name='star'></Icon>
                                <View style={{ backgroundColor: '#f5f5f5', width: '60%', height: 5, borderRadius: 5 }}>
                                    <View style={{ backgroundColor: 'rgb(244,193,80)', width: `${star ? star[3] : '0'}%`, height: 5, borderRadius: 5 }}>
                                    </View>
                                </View>
                                <Text style={{ color: theme.foreground, fontSize: 15 }}> {star ? star[3] : '0'}%</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 5 }}>
                                <Text style={{ color: 'rgb(244,193,80)', fontSize: 20 }}>3</Text>
                                <Icon color='rgb(244,193,80)' name='star'></Icon>
                                <View style={{ backgroundColor: '#f5f5f5', width: '60%', height: 5, borderRadius: 5 }}>
                                    <View style={{ backgroundColor: 'rgb(244,193,80)', width: `${star ? star[2] : '0'}%`, height: 5, borderRadius: 5 }}>
                                    </View>
                                </View>
                                <Text style={{ color: theme.foreground, fontSize: 15 }}> {star ? star[2] : '0'}%</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 5 }}>
                                <Text style={{ color: 'rgb(244,193,80)', fontSize: 20 }}>2</Text>
                                <Icon color='rgb(244,193,80)' name='star'></Icon>
                                <View style={{ backgroundColor: '#f5f5f5', width: '60%', height: 5, borderRadius: 5 }}>
                                    <View style={{ backgroundColor: 'rgb(244,193,80)', width: `${star ? star[1] : '0'}%`, height: 5, borderRadius: 5 }}>
                                    </View>
                                </View>
                                <Text style={{ color: theme.foreground, fontSize: 15 }}> {star ? star[1] : '0'}%</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 5 }}>
                                <Text style={{ color: 'rgb(244,193,80)', fontSize: 20 }}>1</Text>
                                <Icon color='rgb(244,193,80)' name='star'></Icon>
                                <View style={{ backgroundColor: '#f5f5f5', width: '60%', height: 5, borderRadius: 5 }}>
                                    <View style={{ backgroundColor: 'rgb(244,193,80)', width: `${star ? star[0] : '0'}%`, height: 5, borderRadius: 5 }}>
                                    </View>
                                </View>
                                <Text style={{ color: theme.foreground, fontSize: 15 }}> {star ? star[0] : '0'}%</Text>
                            </View>
                        </View>
                    )
                }
            }
        </ThemeContext.Consumer>

    );

}
export default RatingDetail
