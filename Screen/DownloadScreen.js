import React from "react";
import { StyleSheet, Text, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default function DownloadScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <MaterialCommunityIcons name="download" color={'white'} size={200} />
      <Text style={{ fontSize :30, fontWeight:'bold',color:'white'}}>No download</Text>
      <Text style={{ fontSize :20,color:'white'}}>Courses you download will appear here</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0E0F13",
    alignItems: "center",
    justifyContent: "center",
  },
});
