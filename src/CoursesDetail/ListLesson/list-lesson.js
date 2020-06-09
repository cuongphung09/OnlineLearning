import React from "react"
import { View, StyleSheet, Text, Image, ScrollView, Alert, Dimensions } from "react-native"
import ListLessonItem from '../ListLessonItem/list-lesson-item'
import { TouchableOpacity } from "react-native-gesture-handler"
import ImageButton from "../../Common/image-button"
import ThemeContext from '../../Context/theme-context'
const ListLesson = ({ route, navigation, props }) => {
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
        return courses.map(item => <ListLessonItem item={item} key={item.id} onPress={() => navigation.navigate('CoursesDetail', { item: item })} />)
    }
    return (
        <ThemeContext.Consumer>
            {([theme,setTheme]) => {
                return (
                    <View style={[styles.container,{backgroundColor: theme.background}]}>
                        {route.params.source ?
                            <View style={{ width: Dimensions.get('window').width }}>
                                <ImageButton
                                    title={route.params.title}
                                    source={{
                                        uri: route.params.source,
                                    }}
                                />
                            </View> :
                            <Text style={{ fontSize: 20, fontWeight: 'bold', color: theme.foreground, margin: 20 }}>{route.params.title}</Text>
                        }
                        <ScrollView>
                            {renderListItem(courses)}
                        </ScrollView>
                    </View>

                )
            }}
        </ThemeContext.Consumer>

    )

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    }
})
export default ListLesson