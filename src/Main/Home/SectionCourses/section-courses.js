import React from "react"
import { View,Text,ScrollView, StyleSheet } from "react-native"
// import { ScrollView } from "react-native-gesture-handler"
import SectionCoursesItem from "../SectionCoursesItem/section-courses-item"
const SectionCourses = (props) => {
    const courses = [
        {
            id: 1,
            title:"React",
            author: "React Author",
            level: "Advance",
            release: "13/3/2010",
            duration: "38 hours"
        },
        {
            id: 2,
            title:"React",
            author: "React Author",
            level: "Advance",
            release: "13/3/2010",
            duration: "38 hours"
        },
        {
            id: 3,
            title:"React",
            author: "React Author",
            level: "Advance",
            release: "13/3/2010",
            duration: "38 hours"
        }
    ]
    const renderListItem = (courses)=>{
        return courses.map(item=> <SectionCoursesItem item ={item}/>)
    }
    return (
        <View>
            <View>
                <Text style={styles.text}>{props.title}</Text>
            </View>
            <ScrollView horizontal={true}>
                {renderListItem(courses)}
            </ScrollView>
        </View>
    )
}
const styles = StyleSheet.create({
    text: {
        color :'#fff',
        fontSize: 15,
        fontWeight: '700'
    }
})
export default SectionCourses