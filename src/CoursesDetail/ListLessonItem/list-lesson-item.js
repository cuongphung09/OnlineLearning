import React from "react"
import { View, StyleSheet, Text, Image, Dimensions } from "react-native"
const ListLessonItem = (props) => {
    return (
        <View style={styles.container}>
            <View style={styles.imgContainer}>
                <Image style={styles.img} source={require('../../../react.png')}></Image>
            </View>

            <View style={styles.textContainer}>
                <Text style={styles.title}>{props.item.title}</Text>
                <Text style={styles.text}>{props.item.author}</Text>
                <Text style={styles.text}>{props.item.level} • {props.item.release} • {props.item.duration}</Text>

            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#1F242A',
        flexDirection: 'row',
        marginBottom: 10,

    },
    imgContainer: {
        marginLeft: 20,
        width: 100,
        height: 100,
        alignSelf: 'center',
        // backgroundColor: '#fff',
    },
    img: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'contain',
        margin: 10,
        // backgroundColor: '#000',
    },
    textContainer: {
        marginLeft: 5,
        alignItems: 'flex-start',
    },
    title: {
        textAlignVertical: 'top',
        color: '#fff',
        fontSize: 16
    },
    text: {
        color: '#d6d6d6',
        fontSize: 12,
    }
})
export default ListLessonItem