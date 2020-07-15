import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Button, ScrollView, Alert } from "react-native";
import ImageButton from "../../Common/image-button";
import SmallerImageButton from "../../Common/smaller-imagee-button";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Avatar } from "react-native-elements";
import ThemeContext, { themes } from '../../Context/theme-context'
import authorsData from './authors-data'
import listCourses from './listCourse-data'
import PathItem from './pathItem/path-item'
import pathData from './path-data'
export default function BrowseScreen({ navigation }) {
  const [categoryData, setCategoryData] = useState()
  const randomBackground = [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQqES9kxsC3orOAqH8EoGnweHcpqhcFYN5W3ne87MTdoAI1bl-J&usqp=CAU",
    "https://ak.picdn.net/shutterstock/videos/1019648569/thumb/12.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTJlVH1FX8Uoh_JOgnqYkuSJGM_h9qEXjnpFGV-J6zo_0TwbTGo&usqp=CAU",
    "https://image.freepik.com/free-vector/abstract-technology-particle-background_52683-25766.jpg",
    "https://image.freepik.com/free-vector/abstract-technology-particle-background_52683-25766.jpg",
    "https://image.freepik.com/free-vector/abstract-technology-particle-background_52683-25766.jpg",
  ]
  useEffect(() => {
    async function getCategory() {
      let getCategory = await fetch(`https://api.itedu.me/category/all`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
      let getCategoryJson = (await getCategory.json())
      let count = 0;
      getCategoryJson.payload.forEach(element => {
        element.key = count
        count++
      })
      setCategoryData(getCategoryJson.payload)
    }
    getCategory()
  }, []);
  const renderCategory = (data) => {
    return data ? data.map(item => <SmallerImageButton
      key={item.key}
      title={item.name}
      onPress={() =>
        navigation.navigate("ListLesson", { title: item.name, id: item.id, source: 'https://image.freepik.com/free-vector/abstract-technology-particle-background_52683-25766.jpg' })
      }
      source={{
        uri: randomBackground[Math.floor(Math.random() * randomBackground.length)]
      }}
    />) : <View></View>
  }
  const authors = authorsData
  const path = pathData
  const language = [
    {
      id: 1,
      name: "Angular"
    },
    {
      id: 2,
      name: "React"
    },
    {
      id: 3,
      name: "Javascript"
    },
    {
      id: 4,
      name: "VueJS"
    },
    {
      id: 5,
      name: "Swift"
    },
    {
      id: 6,
      name: "C#"
    }
  ]
  const renderAuthor = (authors, theme, navigation) => {
    return authors.map(author =>
      <TouchableOpacity key={author.id} style={styles.avatar} onPress={
        () => { navigation.navigate('Author', { item: author }) }
      }>
        <Avatar
          containerStyle={{ margin: 10 }}
          size={75}
          rounded
          source={{
            uri: author.avaUri,
          }}
        />
        <Text style={{ color: theme.foreground, fontSize: 13, fontWeight: "bold" }}>
          {author.name}
        </Text>
      </TouchableOpacity>
    )
  }
  const renderLanguage = (language, theme) => {
    return language.map(item => (
      <TouchableOpacity key={item.id} style={[styles.button, { backgroundColor: theme.background, borderColor: theme.foreground }]}>
        <Text style={[styles.tagButton, { color: theme.foreground }]}>{item.name}</Text>
      </TouchableOpacity>
    ))
  }
  const renderListItem = (path) => {
    return path.map(item => <PathItem item={item} key={item.id} onPress={() => { navigation.navigate('PathDetail', { item: item, title: item.name }) }} />)
  }
  return (
    <ThemeContext.Consumer>
      {
        ([theme, setTheme]) => {
          return (
            <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
              <View style={styles.imageButton}>
                <ImageButton
                  title="NEW RELEASE"
                  onPress={() => navigation.navigate("ListLesson", { title: 'NEW RELEASE', source: 'https://ak.picdn.net/shutterstock/videos/1019648569/thumb/12.jpg' })}
                  source={{
                    uri:
                      "https://ak.picdn.net/shutterstock/videos/1019648569/thumb/12.jpg",
                  }}
                />
                <ImageButton
                  title="RECOMENDED FOR YOU"
                  onPress={() => navigation.navigate("ListLesson", { title: 'RECOMENDED FOR YOU', source: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTJlVH1FX8Uoh_JOgnqYkuSJGM_h9qEXjnpFGV-J6zo_0TwbTGo&usqp=CAU' })}
                  source={{
                    uri:
                      "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTJlVH1FX8Uoh_JOgnqYkuSJGM_h9qEXjnpFGV-J6zo_0TwbTGo&usqp=CAU",
                  }}
                />
              </View>
              <ScrollView horizontal={true} style={{ padding: 10 }}>
                {
                  renderCategory(categoryData)
                }
                {/* <SmallerImageButton
                  title="CONFERENCES"
                  onPress={() => {
                    navigation.navigate("ListLesson", { title: 'CONFERENCES', source: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQqES9kxsC3orOAqH8EoGnweHcpqhcFYN5W3ne87MTdoAI1bl-J&usqp=CAU' })
                  }}
                  source={{
                    uri:
                      "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQqES9kxsC3orOAqH8EoGnweHcpqhcFYN5W3ne87MTdoAI1bl-J&usqp=CAU",
                  }}
                />
                <SmallerImageButton
                  title="IT OPS"
                  onPress={() => {
                    navigation.navigate("ListLesson", { title: 'IT OPS', source: 'https://ak.picdn.net/shutterstock/videos/1019648569/thumb/12.jpg' })
                  }}
                  source={{
                    uri:
                      "https://ak.picdn.net/shutterstock/videos/1019648569/thumb/12.jpg",
                  }}
                />
                <SmallerImageButton
                  title="<Software> DEVELOPMENT"
                  onPress={() =>
                    navigation.navigate("ListLesson", { title: '<Software> DEVELOPMENT', source: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTJlVH1FX8Uoh_JOgnqYkuSJGM_h9qEXjnpFGV-J6zo_0TwbTGo&usqp=CAU' })
                  }
                  source={{
                    uri:
                      "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTJlVH1FX8Uoh_JOgnqYkuSJGM_h9qEXjnpFGV-J6zo_0TwbTGo&usqp=CAU",
                  }}
                />
                <SmallerImageButton
                  title="Information AND CYBER SECURITY"
                  onPress={() =>
                    navigation.navigate("ListLesson", { title: 'Information AND CYBER SECURITY', source: 'https://image.freepik.com/free-vector/abstract-technology-particle-background_52683-25766.jpg' })
                  }
                  source={{
                    uri:
                      "https://image.freepik.com/free-vector/abstract-technology-particle-background_52683-25766.jpg",
                  }}
                />
                <SmallerImageButton
                  title="DATA PROFESSIONAL"
                  onPress={() =>
                    navigation.navigate("ListLesson", { title: 'DATA PROFESSIONAL', source: 'https://image.freepik.com/free-vector/abstract-technology-particle-background_52683-25766.jpg' })
                  }
                  source={{
                    uri:
                      "https://image.freepik.com/free-vector/abstract-technology-particle-background_52683-25766.jpg",
                  }}
                />
                <SmallerImageButton
                  title="BUSINESS PROFESSIONAL"
                  onPress={() =>
                    navigation.navigate("ListLesson", { title: 'BUSINESS PROFESSIONAL', source: 'https://image.freepik.com/free-vector/abstract-technology-particle-background_52683-25766.jpg' })
                  }
                  source={{
                    uri:
                      "https://image.freepik.com/free-vector/abstract-technology-particle-background_52683-25766.jpg",
                  }}
                /> */}
              </ScrollView>
              <View>
                <Text style={[styles.title, { color: theme.foreground }]}>Popular Skills</Text>
                <ScrollView horizontal={true} style={{ padding: 10 }}>
                  {renderLanguage(language, theme)}
                </ScrollView>
              </View>
              <View>
                <Text style={[styles.title, { color: theme.foreground }]}>Top Authors</Text>
                <ScrollView horizontal={true} style={{ padding: 10 }}>
                  {renderAuthor(authors, theme, navigation)}
                </ScrollView>
              </View>
              <View>
                {/* <Path data={pathData[0].objects} onPress={()=>{navigation.navigate('Profile')}}
              onPressSeeAll={()=>{navigation.navigate('Path')}}
              ></Path> */}

                <View style={{ marginBottom: 30, marginLeft: 10 }}>
                  <View style={{ marginBottom: 20, marginRight: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={[styles.text, { color: theme.foreground }]}>Path</Text>
                    <TouchableOpacity onPress={() => { navigation.navigate('Path') }} >
                      <Text style={{ color: theme.foreground, opacity: 0.5 }} >
                        See all ⟩
                                </Text>
                    </TouchableOpacity>
                  </View>
                  <ScrollView horizontal={true}>
                    {renderListItem(pathData[0].objects)}
                  </ScrollView>
                </View>


              </View>
            </ScrollView>
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
    marginRight: 10,
  },
  tagButton: {
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
