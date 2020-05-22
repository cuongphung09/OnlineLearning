import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SearchBar } from "react-native-elements";
export default function SearchScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <SearchBar
        containerStyle={{
          backgroundColor: "#212121",
          paddingTop: 40,
        }}
        inputContainerStyle={{
          height: 40,
          borderRadius: 10,
          backgroundColor: 'white',
        }}
        placeholder="Search..."
        // onChangeText={this.updateSearch}
        // value={search}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#212121",
    // paddingTop: 40,
    flex: 1,
    padding: 0,
    display: "flex",
    backgroundColor: "#0E0F13",
  },
});
