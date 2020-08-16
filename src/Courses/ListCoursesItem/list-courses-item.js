import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import ThemeContext from "../../Context/theme-context";
const ListCoursesItem = (props) => {
  return (
    <ThemeContext.Consumer>
      {([theme, setTheme]) => {
        return (
          <TouchableOpacity style={styles.container} onPress={props.onPress}>
            <View style={styles.imgContainer}>
              <Image
                style={styles.img}
                source={{ uri: props.item.imageUrl || props.item.courseImage }}
              ></Image>
            </View>

            <View style={styles.textContainer}>
              <Text style={[styles.title, { color: theme.foreground }]}>
                {props.item.title || props.item.courseTitle}
              </Text>

              <Text style={[styles.text, { color: theme.foreground }]}>
                {props.item.author || props.item.instructorName}
              </Text>
              <View style={{ flexDirection: "row" }}>
                {/* <Text
                  style={[
                    styles.text,
                    { flex: 1, color: theme.foreground, flexWrap: "wrap" },
                  ]}
                >
                  {props.item.totalHours || props.item.duration} giờ
                </Text> */}
                {
                  props.item.totalHours ? (<Text style={[styles.text, { color: theme.foreground }]}>{props.item.totalHours || props.item.duration} giờ</Text>) : (props.item.process ? (<Text style={[styles.text, { color: theme.foreground }]}>{(Math.round((props.item.process) * 100) / 100)} %</Text>) : (<View></View>))
                }
              </View>
            </View>
          </TouchableOpacity>
        );
      }}
    </ThemeContext.Consumer>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#1F242A',
    flexDirection: "row",
    marginBottom: 10,
    width: Dimensions.get("window").width,
  },
  imgContainer: {
    // marginLeft: 20,
    width: 100,
    height: 100,
    alignSelf: "center",
    width: Dimensions.get("window").width * 0.25,
  },
  img: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: "contain",
    margin: 10,
  },
  textContainer: {
    marginLeft: 5,
    alignItems: "flex-start",
    width: Dimensions.get("window").width * 0.75,
  },
  title: {
    textAlignVertical: "top",
    color: "#fff",
    fontSize: 16,
  },
  text: {
    // flex: 1,
    color: "#d6d6d6",
    fontSize: 12,
  },
});
export default ListCoursesItem;
