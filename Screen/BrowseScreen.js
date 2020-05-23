import React from "react";
import { StyleSheet, Text, View, Button, ScrollView } from "react-native";
import ImageButton from "../src/Common/image-button";
import SmallerImageButton from "../src/Common/smaller-imagee-button";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Avatar } from "react-native-elements";

export default function BrowseScreen({ navigation }) {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageButton}>
        <ImageButton
          title="NEW RELEASE"
          onPress={() => navigation.navigate("Profile")}
          source={{
            uri:
              "https://ak.picdn.net/shutterstock/videos/1019648569/thumb/12.jpg",
          }}
        />
        <ImageButton
          title="RECOMENDED FOR YOU"
          onPress={() => navigation.navigate("Profile")}
          source={{
            uri:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTJlVH1FX8Uoh_JOgnqYkuSJGM_h9qEXjnpFGV-J6zo_0TwbTGo&usqp=CAU",
          }}
        />
      </View>
      <ScrollView horizontal={true} style={{ padding: 10 }}>
        <SmallerImageButton
          title="CONFERENCES"
          onPress={() => navigation.navigate("Profile")}
          source={{
            uri:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQqES9kxsC3orOAqH8EoGnweHcpqhcFYN5W3ne87MTdoAI1bl-J&usqp=CAU",
          }}
        />
        <SmallerImageButton
          title="IT OPS"
          onPress={() => navigation.navigate("Profile")}
          source={{
            uri:
              "https://ak.picdn.net/shutterstock/videos/1019648569/thumb/12.jpg",
          }}
        />
        <SmallerImageButton
          title="<Software> DEVELOPMENT"
          onPress={() => navigation.navigate("Profile")}
          source={{
            uri:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTJlVH1FX8Uoh_JOgnqYkuSJGM_h9qEXjnpFGV-J6zo_0TwbTGo&usqp=CAU",
          }}
        />
        <SmallerImageButton
          title="Information AND CYBER SECURITY"
          onPress={() => navigation.navigate("Profile")}
          source={{
            uri:
              "https://image.freepik.com/free-vector/abstract-technology-particle-background_52683-25766.jpg",
          }}
        />
        <SmallerImageButton
          title="DATA PROFESSIONAL"
          onPress={() => navigation.navigate("Profile")}
          source={{
            uri:
              "https://image.freepik.com/free-vector/abstract-technology-particle-background_52683-25766.jpg",
          }}
        />
        <SmallerImageButton
          title="BUSINESS PROFESSIONAL"
          onPress={() => navigation.navigate("Profile")}
          source={{
            uri:
              "https://image.freepik.com/free-vector/abstract-technology-particle-background_52683-25766.jpg",
          }}
        />
      </ScrollView>
      <View>
        <Text style={styles.title}>Popular Skills</Text>
        <ScrollView horizontal={true} style={{ padding: 10 }}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.tagButton}>Angular</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.tagButton}>React</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.tagButton}>Javascript</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.tagButton}>VueJS</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.tagButton}>Swift</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.tagButton}>C#</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
      <View>
        <Text style={styles.title}>Top Authors</Text>
        <ScrollView horizontal={true} style={{ padding: 10 }}>
          <View style={styles.avatar}>
            <Avatar
              containerStyle={{ margin:10 }}
              size={75}
              rounded
              source={{
                uri:
                  "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
              }}
            />
            <Text style={{ color: "white", fontSize: 15, fontWeight: "bold" }}>
              Andrew
            </Text>
          </View>
          <View style={styles.avatar}>
            <Avatar
              containerStyle={{ margin:10 }}
              size={75}
              rounded
              source={{
                uri:
                  "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
              }}
            />
            <Text style={{ color: "white", fontSize: 15, fontWeight: "bold" }}>
              Andrew
            </Text>
          </View>
          <View style={styles.avatar}>
            <Avatar
              containerStyle={{ margin:10 }}
              size={75}
              rounded
              source={{
                uri:
                  "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
              }}
            />
            <Text style={{ color: "white", fontSize: 15, fontWeight: "bold" }}>
              Andrew
            </Text>
          </View>
          <View style={styles.avatar}>
            <Avatar
              containerStyle={{ margin:10 }}
              size={75}
              rounded
              source={{
                uri:
                  "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
              }}
            />
            <Text style={{ color: "white", fontSize: 15, fontWeight: "bold" }}>
              Andrew
            </Text>
          </View>
          <View style={styles.avatar}>
            <Avatar
              containerStyle={{ margin:10 }}
              size={75}
              rounded
              source={{
                uri:
                  "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
              }}
            />
            <Text style={{ color: "white", fontSize: 15, fontWeight: "bold" }}>
              Andrew
            </Text>
          </View>
          <View style={styles.avatar}>
            <Avatar
              containerStyle={{ margin:10 }}
              size={75}
              rounded
              source={{
                uri:
                  "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
              }}
            />
            <Text style={{ color: "white", fontSize: 15, fontWeight: "bold" }}>
              Andrew
            </Text>
          </View>
        </ScrollView>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
    display: "flex",
    backgroundColor: "#0E0F13",
  },
  imageButton: {
    padding: 10,
  },
  title: {
    color: "white",
    fontSize: 15,
    padding: 10,
  },
  button: {
    borderRadius: 50,
    borderWidth: 1,
    backgroundColor: "#505050",
    marginRight: 10,
  },
  tagButton: {
    color: "white",
    marginLeft: 10,
    marginRight: 10,
    marginTop: 5,
    marginBottom: 5,
  },
  avatar: {
    flexDirection: "column",
    marginBottom: 40,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
