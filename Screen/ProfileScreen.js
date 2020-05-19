import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, HeaderTitle } from '@react-navigation/stack';

export default function ProfileScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <Text>This is profile screen</Text>
            <Button title="BACK" onPress={()=>navigation.navigate('Home')}></Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
