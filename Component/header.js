import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Avatar } from 'react-native-elements';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
export default function Header({ navigation }) {
    console.log(navigation)
    return (
        
        <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
            <Avatar
                containerStyle={{ marginRight: 10 }}
                size={25}
                rounded
                source={{
                    uri:
                        'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
                }}
                onPress={()=>navigation.navigate('Profile')}
            />
            <MaterialCommunityIcons
                name="dots-vertical"
                color="white" size={25}
                style={{ marginRight: 10 }}
            />
            
        </View>
    );
}


