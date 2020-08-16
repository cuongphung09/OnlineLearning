import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import ThemeContext from '../src/Context/theme-context'
import path from '../src/Main/Browse/path-data'
import PathItem from '../src/Main/Browse/pathItem/path-item'
import { ScrollView } from 'react-native';
export default function PathScreen({ navigation, props }) {
    const data = path
    const renderPath = (data,theme) => {
        return data.map(path => (
            <View key={path.id}>
                <Text style={{ color: theme.foreground, marginBottom: 10, fontSize: 16, fontWeight: 'bold' }} >{path.path}</Text>
                <ScrollView horizontal={true} >
                    {path.objects.map(item => {
                        return (
                            <View key={item.id}>
                                <PathItem item={item} onPress={() => navigation.navigate('PathDetail', { item: item })} />
                            </View>
                        )
                    })}
                </ScrollView>
            </View>
        ))
    }

    return (
        <ThemeContext.Consumer>
            {
                ([theme, setTheme]) => {
                    return (
                        <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
                            {renderPath(data, theme)}
                        </ScrollView>
                    )
                }
            }
        </ThemeContext.Consumer>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: 10,
        paddingTop: 10
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
    }
});
