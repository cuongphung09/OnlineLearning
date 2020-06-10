import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SearchBar } from "react-native-elements";
import ThemeContext from '../src/Context/theme-context'
export default function SearchScreen({ navigation }) {
  return (
    <ThemeContext.Consumer>
      {
        ([theme, setTheme]) => {
          return (
            <View style={[styles.container,{backgroundColor: theme.background}]}>
              <SearchBar
                containerStyle={{
                  backgroundColor: theme.background,
                  paddingTop: 40,
                }}
                inputContainerStyle={{
                  height: 40,
                  borderRadius: 10,
                  backgroundColor: theme.background,
                }}
                placeholder="Search..."
              // onChangeText={this.updateSearch}
              // value={search}
              />
            </View>
          )
        }
      }
    </ThemeContext.Consumer>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
    display: "flex",
    backgroundColor: "#0E0F13",
  },
});
