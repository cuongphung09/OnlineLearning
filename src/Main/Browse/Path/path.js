import React from "react"
import { View, Text, ScrollView, StyleSheet, Alert } from "react-native"
// import { ScrollView } from "react-native-gesture-handler"
import PathItem from '../pathItem/path-item'
import { TouchableOpacity } from "react-native-gesture-handler"
import ThemeContext, { themes } from '../../../Context/theme-context'
const Path = (props,navigation) => {
    const path = (props.data)
    const renderListItem = (path) => {
        return path.map(item => <PathItem item={item} key={item.id} onPress={
            // () => props.navigation.navigate('Profile')
            props.onPress
        } />)
    }
    return (
        <ThemeContext.Consumer>
            {([theme, setTheme]) => {
                return (
                    <View style={{ marginBottom: 30, marginLeft: 10 }}>
                        <View style={{ marginBottom: 20, marginRight: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={[styles.text, { color: theme.foreground }]}>Path</Text>
                            <TouchableOpacity onPress={
                                
                                props.onPressSeeAll
                            }>
                                <Text style={{ color: theme.foreground, opacity: 0.5 }} >
                                    See all ⟩
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <ScrollView horizontal={true}>
                            {renderListItem(path)}
                        </ScrollView>
                    </View>
                )
            }}
        </ThemeContext.Consumer>

    )
}
const styles = StyleSheet.create({
    text: {
        fontSize: 15,
        fontWeight: '600'
    }
})
export default Path