import React from "react";
import { StyleSheet, Text, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import  ThemeContext  from "../../Context/theme-context";

export default function DownloadScreen({ navigation }) {
  return (
    <ThemeContext.Consumer>
      {
        ([theme, setTheme]) => {
          return (
            <View style={[styles.container,{backgroundColor:theme.background}]}>
              <MaterialCommunityIcons name="download" color={theme.foreground} size={200} />
              <Text style={{ fontSize: 30, fontWeight: 'bold', color: theme.foreground }}>No download</Text>
              <Text style={{ fontSize: 16, color: theme.foreground }}>Courses you download will appear here</Text>
            </View>
          )
        }
      }
    </ThemeContext.Consumer>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#0E0F13",
    alignItems: "center",
    justifyContent: "center",
  },
});
