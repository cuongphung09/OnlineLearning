import React from "react"
import { View, Text, ScrollView, StyleSheet, Alert } from "react-native"
import SectionCoursesItem from "../SectionCoursesItem/section-courses-item"
import { TouchableOpacity } from "react-native-gesture-handler"
import ThemeContext, { themes } from '../../../Context/theme-context'
const SectionCourses = (props) => {
    const courses = (props.data)
    const renderListItem = (courses) => {

        return courses.map(item => (item.title || item.courseTitle) ? (<SectionCoursesItem item={item} key={item.id} onPress={() => props.navigation.navigate('CoursesDetail', { item: item })} />) : (<View key={item.id}></View>))

    }
    return (
        <ThemeContext.Consumer>
            {([theme, setTheme]) => {
                return (
                    <View style={{ marginBottom: 30 }}>
                        <View style={{ marginBottom: 20, marginRight: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={[styles.text, { color: theme.foreground, width: '70%' }]}>{props.name}</Text>
                            {props.name ? (<TouchableOpacity onPress={props.onPress}>
                                <Text style={{ color: theme.foreground, opacity: 0.5 }} >
                                    Xem tất cả ⟩
                                </Text>
                            </TouchableOpacity>) : (<View></View>)}
                        </View>
                        {
                            courses ? (courses.length === 0 ? (<Text style={{ color: theme.foreground, marginLeft: 10, opacity: 0.7 }}>(Không có khóa học)</Text>) :
                                (<ScrollView horizontal={true}>
                                    {renderListItem(courses)}
                                </ScrollView>)) : (<></>)
                        }
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