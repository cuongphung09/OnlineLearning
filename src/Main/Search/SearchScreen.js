import React, { useState } from "react";
import { StyleSheet, Text, View, Alert } from "react-native";
import { SearchBar, Icon } from "react-native-elements";
import ThemeContext from '../../Context/theme-context'
export default function SearchScreen({ navigation }) {
  const [search, setSearch] = useState('')
  const handleChange = (text) => {
    setSearch(text)
    // Alert.alert('Tim thay roi ne')
  }
  return (
    <ThemeContext.Consumer>
      {
        ([theme, setTheme]) => {
          return (
            <View style={[styles.container, { backgroundColor: theme.background }]}>
              <SearchBar
                platform='android'
                containerStyle={{
                  backgroundColor: theme.header,
                  paddingTop: 40,
                }}
                inputContainerStyle={{
                  height: 40,
                  borderRadius: 10,
                  backgroundColor: theme.header,
                }}
                cancelIcon={true}
                selectionColor={theme.foreground}
                placeholder="Search..."
                onChangeText={(text) => {
                  handleChange(text)
                }}
                value={search}
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
  },
});
