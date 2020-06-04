import React from "react";
import { StyleSheet, Text, View, Button, Dimensions, Alert, TouchableOpacity } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Avatar } from "react-native-elements";

export default function SettingScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <View style={styles.avatar}>
                <Avatar
                    containerStyle={{}}
                    size={40}
                    rounded
                    source={{
                        uri:
                            "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
                    }}
                />
                <View style={{ flexDirection: 'column' }}>
                    <Text style={{ color: 'white', fontSize: 16, marginLeft: 20 }}>Andrew</Text>
                    <Text style={{ color: 'whitesmoke', fontSize: 12, marginLeft: 20 }}>andrew.josh</Text>
                </View>
            </View>
            <TouchableOpacity style={{
                justifyContent: 'center',
                alignSelf: 'center',
                alignItems:'center',
                borderColor: '#0084BD',
                borderWidth: 1,
                width: Dimensions.get('window').width*90/100,
                height: 40,
                borderRadius: 5

            }}>
                <Text style={{ color: '#0084BD' }}>SIGN OUT</Text>
            </TouchableOpacity>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#0E0F13",
        alignItems: "flex-start",
        justifyContent: "flex-start",
    },
    avatar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 20,
        marginBottom: 40
    },
});
