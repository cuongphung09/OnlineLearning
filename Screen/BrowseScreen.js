import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function BrowseScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>This is browse screen</Text>
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
