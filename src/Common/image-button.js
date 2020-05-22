import React from 'react'
import { View, StyleSheet, ImageBackground, TouchableOpacity, Text } from 'react-native'
const ImageButton = (props) => {
    return (
        <ImageBackground style={{height: 100, marginBottom: 20}} source={props.source}>
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
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center'
    }
})
export default ImageButton