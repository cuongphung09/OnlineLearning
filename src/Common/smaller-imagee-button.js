import React from 'react'
import { View, StyleSheet, ImageBackground, TouchableOpacity, Text } from 'react-native'
const SmallerImageButton = (props) => {
    return (
        <ImageBackground style={{height: 75, marginBottom: 10, width: 150}} source={props.source}>
            <TouchableOpacity style={styles.touch}
                onPress={props.onPress}
            >
                <Text style={styles.text}>
                    {props.title}
                </Text>
            </TouchableOpacity>
        </ImageBackground>
    )
}
const styles = StyleSheet.create({

    touch: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontSize: 12,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center'
    }
})
export default SmallerImageButton