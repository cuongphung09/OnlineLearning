import React from 'react'
import { Avatar } from "react-native-elements";
import CustomMenuIcon from '../Component/pop-up-menu'
import { View } from 'react-native'
export default class headerRight extends React.Component {
    render() {
        return (
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Avatar
                    containerStyle={{ marginRight: 10 }}
                    size={25}
                    rounded
                    source={{
                        uri:
                            "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
                    }}
                    onPress={() => navigation.navigate("Profile")}
                />
                <CustomMenuIcon
                    menutext="Menu"
                    menustyle={{
                        marginRight: 16,
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                    }}
                    textStyle={{
                        color: 'white',
                    }}
                    option1Click={() => {
                        navigation.navigate('Setting');
                    }}
                    option2Click={() => { }}
                    option3Click={() => { }}

                />
            </View>
        )
    }
}
