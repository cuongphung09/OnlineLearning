import React from "react"
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native"
import ThemeContext from '../../../Context/theme-context'
const SectionCoursesItem = (props) => {
    return (
        <ThemeContext.Consumer>
            {
                (theme) => {
                    return (
                        <TouchableOpacity style={[styles.container, {  }]} onPress={props.onPress}>
                            <View style={styles.imgContainer}>
                                <Image style={styles.img} source={require('../../../../react.png')}></Image>
                            </View>

                            <View style={styles.textContainer}>
                                <Text style={[styles.title, { color: theme.foreground }]}>{props.item.title}</Text>
                                <Text style={[styles.text, { color: theme.foreground }]}>{props.item.author}</Text>
                                <Text style={[styles.text, { color: theme.foreground }]}>{props.item.level} • {props.item.release} • {props.item.duration}</Text>

                            </View>
                        </TouchableOpacity>
                    )
                }
            }
        </ThemeContext.Consumer>

    )

}
const styles = StyleSheet.create({
    container: {
        marginRight: 20,
        width: 200,
        height: 200,
        display: 'flex',
    },
    imgContainer: {
        width: 200,
        height: 100,
    },
    img: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'contain',

    },
    textContainer: {
        margin: 5,
        alignContent: 'flex-start',
        alignSelf: 'flex-start'
    },
    title: {
        textAlignVertical: 'top',
        fontSize: 16
    },
    text: {
        fontSize: 12
    }
})
export default SectionCoursesItem