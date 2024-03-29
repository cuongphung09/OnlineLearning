import React, { useEffect, useState } from "react"
import { View, StyleSheet, Text, Image, ScrollView, Alert, Dimensions } from "react-native"
import ListLessonItem from '../ListCoursesItem/list-courses-item'
import ImageButton from "../../Common/image-button"
import ThemeContext from '../../Context/theme-context'
const ListCourses = ({ route, navigation, props }) => {
    const [courseData, setCourseData] = useState()
    useEffect(() => {
        async function getCategory() {
            let demo = await fetch(`https://api.itedu.me/course/search`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    keyword: '',
                    opt: {

                        category: [
                            route.params.id
                        ],
                        time: [

                        ],
                        price: [

                        ]
                    },
                    limit: 10,
                    offset: 1
                })
            })
            let demoJson = await demo.json()
            return demoJson.payload ? (demoJson.payload.rows) : []
        }
        async function setData() {
            const d = await getCategory()
            setCourseData(d)
        }
        setData()
    }, []);
    const courses = route.params.data ? route.params.data : courseData
    const renderListItem = (courses) => {
        return courses ? courses.map(item => item.title ? (<ListLessonItem item={item} key={item.id} onPress={() => navigation.navigate('CoursesDetail', { item: item })} />) : (<View key={item.id}></View>)) : (<View></View>)
    }
    return (
        <ThemeContext.Consumer>
            {([theme, setTheme]) => {
                return (
                    <View style={[styles.container, { backgroundColor: theme.background }]}>
                        {route.params.source ?
                            <View style={{ width: Dimensions.get('window').width }}>
                                <ImageButton
                                    title={route.params.title}
                                    source={{
                                        uri: route.params.source,
                                    }}
                                />
                            </View> :
                            <Text style={{ fontSize: 20, fontWeight: 'bold', color: theme.foreground, margin: 20 }}>{route.params.name}</Text>
                        }
                        <ScrollView >
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
export default ListCourses