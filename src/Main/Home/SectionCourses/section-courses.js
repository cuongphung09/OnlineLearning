import React from "react"
import { View, Text, ScrollView, StyleSheet, Alert } from "react-native"
// import { ScrollView } from "react-native-gesture-handler"
import SectionCoursesItem from "../SectionCoursesItem/section-courses-item"
import { TouchableOpacity } from "react-native-gesture-handler"
const SectionCourses = (props) => {
    
    const courses = [
        {
            id: 1,
            title: "Angular Fundamentals",
            author: "Joe Eames",
            level: "Intermediate",
            release: "12/2019",
            duration: "9 hours 30 minutes"
        },
        {
            id: 2,
            title: "C# Fundamentals",
            author: "Scott Allen",
            level: "Beginner",
            release: "4/2019",
            duration: "6 hours 5 minutes"
        },
        {
            id: 3,
            title: "C# Fundamentals",
            author: "Scott Allen",
            level: "Beginner",
            release: "4/2019",
            duration: "6 hours 5 minutes"
        }
    ]
    const renderListItem = (courses) => {
        return courses.map(item => <SectionCoursesItem item={item} key={item.id} onPress={() => props.navigation.navigate('CoursesDetail',{item:item})}/>)
    }
    return (
        <View style={{ marginBottom: 30 }}>
            <View style={{ marginBottom: 20, marginRight: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={styles.text}>{props.title}</Text>
                <TouchableOpacity onPress={props.onPress}>
                    <Text style={{ color: 'lightgray' }} >
                        See all ⟩
                    </Text>
                </TouchableOpacity>
            </View>
            <ScrollView horizontal={true}>
                {renderListItem(courses)}
            </ScrollView>
        </View>
    )
}
const styles = StyleSheet.create({
    text: {
        color: '#fff',
        fontSize: 15,
        fontWeight: '600'
    }
})
export default SectionCourses