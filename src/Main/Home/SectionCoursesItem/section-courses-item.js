import React from "react"
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native"
const SectionCoursesItem = (props) => {
    return (
        <TouchableOpacity style={styles.container} onPress={props.onPress}>
            <View style={styles.imgContainer}>
                <Image style={styles.img} source={require('../../../../react.png')}></Image>
            </View>

            <View style={styles.textContainer}>
                <Text style={styles.title}>{props.item.title}</Text>
                <Text style={styles.text}>{props.item.author}</Text>
                <Text style={styles.text}>{props.item.level} • {props.item.release} • {props.item.duration}</Text>

            </View>
        </TouchableOpacity>
    )

}
const styles = StyleSheet.create({
    container: {
        marginRight: 20,
        width: 200,
        height: 200,
        // backgroundColor: '#1F242A',
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
        color: '#fff',
        fontSize: 16
    },
    text: {
        color: '#d6d6d6',
        fontSize: 12
    }
})
export default SectionCoursesItem