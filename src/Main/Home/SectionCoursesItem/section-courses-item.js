import React from "react"
import { View, StyleSheet, Text, Image, Dimensions } from "react-native"
const SectionCoursesItem = (props) => {
    return (
        <View style={styles.item}>
            <Image style={styles.img} source={require('../../../../react.png')}></Image>
            <View>
                <Text></Text>
            </View>
        </View>
    )

}
const styles = StyleSheet.create({
    item: {
        margin: 5,
        width: 200,
        height: 200,
        backgroundColor: '#212121',
        display: 'flex',
        // alignItems: 'flex-start',
        // justifyContent: 'flex-end',
    },
    img: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'contain',
        marginTop : -81
    }
})
export default SectionCoursesItem