import React from 'react';
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';
import ImageButton from '../src/Common/image-button';
import SmallerImageButton from '../src/Common/smaller-imagee-button';
import {BasicButton} from '@phomea/react-native-buttons';
export default function BrowseScreen({ navigation }) {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageButton}>
        <ImageButton title='NEW RELEASE' onPress={() => navigation.navigate('Profile')} source={{ uri: 'https://image.freepik.com/free-vector/abstract-technology-particle-background_52683-25766.jpg' }} />
        <ImageButton title='RECOMENDED FOR YOU' onPress={() => navigation.navigate('Profile')} source={{ uri: 'https://image.freepik.com/free-vector/abstract-technology-particle-background_52683-25766.jpg' }} />
      </View>
      <ScrollView horizontal={true} style={{padding: 10}} >
        <SmallerImageButton title='CONFERENCES' onPress={() => navigation.navigate('Profile')} source={{ uri: 'https://image.freepik.com/free-vector/abstract-technology-particle-background_52683-25766.jpg' }} />
        <SmallerImageButton title='IT OPS' onPress={() => navigation.navigate('Profile')} source={{ uri: 'https://image.freepik.com/free-vector/abstract-technology-particle-background_52683-25766.jpg' }} />
        <SmallerImageButton title='<Software> DEVELOPMENT' onPress={() => navigation.navigate('Profile')} source={{ uri: 'https://image.freepik.com/free-vector/abstract-technology-particle-background_52683-25766.jpg' }} />
        <SmallerImageButton title='Information AND CYBER SECURITY' onPress={() => navigation.navigate('Profile')} source={{ uri: 'https://image.freepik.com/free-vector/abstract-technology-particle-background_52683-25766.jpg' }} />
        <SmallerImageButton title='DATA PROFESSIONAL' onPress={() => navigation.navigate('Profile')} source={{ uri: 'https://image.freepik.com/free-vector/abstract-technology-particle-background_52683-25766.jpg' }} />
        <SmallerImageButton title='BUSINESS PROFESSIONAL' onPress={() => navigation.navigate('Profile')} source={{ uri: 'https://image.freepik.com/free-vector/abstract-technology-particle-background_52683-25766.jpg' }} />
      </ScrollView>
      <View>
        <Text style={styles.title}>Popular Skills</Text>
        <ScrollView horizontal={true} style={{padding: 10}} >
          <BasicButton buttonStyle={{marginRight: 10, backgroundColor: '#474747'}} animation='standard' title='Angular'/>
          <BasicButton buttonStyle={{marginRight: 10, backgroundColor: '#474747'}} animation='standard' title='Angular'/>
          <BasicButton buttonStyle={{marginRight: 10, backgroundColor: '#474747'}} animation='standard' title='Angular'/>
          <BasicButton buttonStyle={{marginRight: 10, backgroundColor: '#474747'}} animation='standard' title='Angular'/>
          <BasicButton buttonStyle={{marginRight: 10, backgroundColor: '#474747'}} animation='standard' title='Angular'/>
        </ScrollView>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 0,
    display: 'flex',
    backgroundColor: '#0E0F13',
  },
  imageButton: {
    padding: 10,
  },
  title: {
    color: 'white',
    fontSize: 15,
    padding:10
  },
});
