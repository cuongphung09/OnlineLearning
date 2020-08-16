import React, { useState, useEffect } from "react";
import { StyleSheet, ScrollView, View, Text, AsyncStorage, Dimensions, TouchableOpacity } from "react-native";
import { SearchBar, Avatar } from "react-native-elements";
import ThemeContext from '../../Context/theme-context'
import { REST_API } from "../../../config/api";
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import ListLessonItem from '../../Courses/ListCoursesItem/list-courses-item'

const initialLayout = { width: Dimensions.get('window').width };
export default function SearchScreen({ navigation }) {
  const [search, setSearch] = useState('')
  const [token, setToken] = useState('')
  const [course, setCourse] = useState()
  const [instructor, setInstructor] = useState()
  const [all, setAll] = useState()
  const FirstRoute = (theme) => {
    return <ThemeContext>
      {
        ([theme, setTheme]) => {
          return (
            <View style={[styles.scene, { backgroundColor: theme.background, marginTop: 10 }]} >
              <ScrollView>
                {
                  course ? (
                    course.map(item => item.title ? (<ListLessonItem item={item} key={item.id} onPress={() => navigation.navigate('CoursesDetail', { item: item })} />)
                      :
                      (
                        <View key={item.id}>

                        </View>
                      )
                    )
                  ) : (<View style={{}}>
                    <Text style={{ alignSelf: 'center', fontSize: 16, fontWeight: 'bold', color: theme.foreground }}>
                      Không tìm thấy kết quả
                    </Text>
                  </View>)
                }
              </ScrollView>
            </View>

          )
        }
      }
    </ThemeContext>
  };

  const SecondRoute = (theme) => {
    return <ThemeContext.Consumer>
      {
        ([theme, setTheme]) => {
          return (
            <View style={[styles.scene, { backgroundColor: theme.background, marginTop: 10 }]} >
              <ScrollView>
                {
                  instructor ? (
                    instructor.map(author =>
                      <TouchableOpacity key={author.id} style={{ flexDirection: 'row' }} onPress={
                        () => { navigation.navigate('Author', { item: author }) }
                      }>
                        <Avatar
                          containerStyle={{ margin: 10 }}
                          size={75}
                          rounded
                          source={{
                            uri: author.avatar,
                          }}
                        />
                        <Text style={{ color: theme.foreground, fontSize: 15, fontWeight: "bold", textAlignVertical: 'center' }}>
                          {author.name}
                        </Text>
                      </TouchableOpacity>
                    )
                  ) : (
                      <View>

                      </View>
                    )
                }
              </ScrollView>
            </View>
          )
        }
      }
    </ThemeContext.Consumer>
  };
  const ThirdRoute = (theme) => {
    return <ThemeContext.Consumer>
      {
        ([theme, setTheme]) => {
          return (
            <View style={[styles.scene, { backgroundColor: theme.background, marginTop: 10 }]} />
          )
        }
      }
    </ThemeContext.Consumer>
  };

  const initialLayout = { width: Dimensions.get('window').width };
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'Khóa học' },
    { key: 'second', title: 'Giảng viên' },
    { key: 'third', title: 'Tất cả' },
  ]);

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
    third: ThirdRoute
  });
  const handleChange = (text) => {
    setSearch(text)
    setCourse()
    setInstructor()
  }
  const submit = async (text) => {
    const body = JSON.stringify({
      "token": token,
      "keyword": search,
      "limit": 10,
      "offset": 1,
    })

    const searching = await REST_API.searchv2(body)
    setCourse(searching.payload.courses.data)
    setInstructor(searching.payload.instructors.data)
  }
  useEffect(() => {
    const getToken = async () => {
      const tokenTemp = await AsyncStorage.getItem('token')
      setToken(tokenTemp)
    }
    getToken()
  }, [])

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
                inputStyle={{
                  color: theme.foreground
                }}
                cancelIcon={true}
                selectionColor={theme.foreground}
                placeholder="Search..."
                placeholderTextColor={theme.foreground}
                onChangeText={(text) => {
                  handleChange(text)
                }}
                onSubmitEditing={() => {
                  submit(search)
                }}
                value={search}
              />
              {
                (course || instructor) ? (
                  <TabView
                    navigationState={{ index, routes }}
                    renderScene={renderScene}
                    onIndexChange={setIndex}
                    initialLayout={initialLayout}
                    navigation={navigation}
                    style={{ backgroundColor: theme.background, color: theme.foreground }}
                    {...theme}
                    renderTabBar={
                      (props) => {
                        return (
                          <TabBar
                            {...props}
                            indicatorStyle={{ backgroundColor: '#0084BD' }}
                            style={{ backgroundColor: theme.background }}
                            activeColor='#0084BD'
                            inactiveColor={theme.foreground}
                          />
                        )
                      }
                    }
                  />
                ) : (
                    <View>

                    </View>
                  )
              }
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
  scene: {
    flex: 1,
  },
});
