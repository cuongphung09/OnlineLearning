import React from "react"
import { View, StyleSheet, Text, Image, ScrollView, Alert, Dimensions } from "react-native"
import ListLessonItem from '../ListLessonItem/list-lesson-item'
import ImageButton from "../../Common/image-button"
import ThemeContext from '../../Context/theme-context'
const ListLesson = ({ route, navigation, props }) => {
    const courses = route.params.data?route.params.data: []
    const renderListItem = (courses) => {
        return courses.map(item => <ListLessonItem item={item} key={item.id} onPress={() => navigation.navigate('CoursesDetail', { item: item })} />)
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
                            <Text style={{ fontSize: 20, fontWeight: 'bold', color: theme.foreground, margin: 20 }}>{route.params.title}</Text>
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
export default ListLesson