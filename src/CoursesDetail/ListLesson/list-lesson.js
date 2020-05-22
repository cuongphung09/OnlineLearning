import React from "react"
import { View, StyleSheet, Text, Image, ScrollView, Alert } from "react-native"
import ListLessonItem from '../ListLessonItem/list-lesson-item'
import { TouchableOpacity } from "react-native-gesture-handler"
const ListLesson = ({ route,navigation }) => {
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
        },
        {
            id: 4,
            title: "C# Fundamentals",
            author: "Scott Allen",
            level: "Beginner",
            release: "4/2019",
            duration: "6 hours 5 minutes"
        },
        {
            id: 5,
            title: "C# Fundamentals",
            author: "Scott Allen",
            level: "Beginner",
            release: "4/2019",
            duration: "6 hours 5 minutes"
        },
        {
            id: 6,
            title: "C# Fundamentals",
            author: "Scott Allen",
            level: "Beginner",
            release: "4/2019",
            duration: "6 hours 5 minutes"
        },
        {
            id: 7,
            title: "C# Fundamentals",
            author: "Scott Allen",
            level: "Beginner",
            release: "4/2019",
            duration: "6 hours 5 minutes"
        },
        {
            id: 8,
            title: "C# Fundamentals",
            author: "Scott Allen",
            level: "Beginner",
            release: "4/2019",
            duration: "6 hours 5 minutes"
        },
        {
            id: 9,
            title: "C# Fundamentals",
            author: "Scott Allen",
            level: "Beginner",
            release: "4/2019",
            duration: "6 hours 5 minutes"
        },
        {
            id: 10,
            title: "C# Fundamentals",
            author: "Scott Allen",
            level: "Beginner",
            release: "4/2019",
            duration: "6 hours 5 minutes"
        }
    ]
    const renderListItem = (courses) => {
        return courses.map(item => <ListLessonItem item={item} key={item.id} onPress={()=>navigation.navigate('CoursesDetail')} />)
    }
    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white', margin: 20 }}>{route.params.title}</Text>
            <ScrollView>
                {renderListItem(courses)}
            </ScrollView>
        </View>
    )

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0E0F13',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    }
})
export default ListLesson