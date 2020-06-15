import React from "react"
import { View, Text, ScrollView, StyleSheet, Alert } from "react-native"
// import { ScrollView } from "react-native-gesture-handler"
import SectionCoursesItem from "../SectionCoursesItem/section-courses-item"
import { TouchableOpacity } from "react-native-gesture-handler"
import ThemeContext, { themes } from '../../../Context/theme-context'
const SectionCourses = (props) => {
    const courses = (props.data)
    const renderListItem = (courses) => {
        return courses.map(item => <SectionCoursesItem item={item} key={item.id} onPress={() => props.navigation.navigate('CoursesDetail', { item: item })} />)
    }
    return (
        <ThemeContext.Consumer>
            {([theme, setTheme]) => {
                return (
                    <View style={{ marginBottom: 30 }}>
                        <View style={{ marginBottom: 20, marginRight: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={[styles.text, { color: theme.foreground }]}>{props.title}</Text>
                            <TouchableOpacity onPress={props.onPress}>
                                <Text style={{ color: theme.foreground, opacity: 0.5 }} >
                                    See all ⟩
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <ScrollView horizontal={true}>
                            {renderListItem(courses)}
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
export default SectionCourses