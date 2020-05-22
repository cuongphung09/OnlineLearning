import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { Avatar } from "react-native-elements";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, HeaderTitle } from '@react-navigation/stack';

export default function ProfileScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <View style={styles.avatar}>
                <Avatar
                    containerStyle={{ marginRight: 20 }}
                    size={75}
                    rounded
                    source={{
                        uri:
                            "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
                    }}

                />
                <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>Andrew</Text>
            </View>
            <View style={styles.activity}>
                <Text style={{fontSize:15, color:'#fff', marginBottom: 30,fontWeight: 'bold'}}>Activity insights (lasts 30 days)</Text>
                <Text style={styles.darkText}>TOTAL ACTIVE DAYS</Text>
                <Text style={styles.lightText}>0</Text>
                <Text style={styles.darkText}>MOST ACTIVE TIME OF DAYS</Text>
                <Text style={styles.lightText}>7:00 AM</Text>
                <Text style={styles.darkText}>MOST VIEWED SUBJECTS</Text>
                <Text style={styles.lightText}>N/A</Text>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0E0F13',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',

    },
    avatar: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 20,
        marginBottom: 40
    },
    activity: {
        marginLeft: 20
    },
    lightText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20
    },
    darkText: {
        color: '#d6d6d6',
        fontSize: 10,
        fontWeight: 'bold'
    }
});
