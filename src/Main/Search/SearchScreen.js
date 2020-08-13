import React, { useState, useEffect } from "react";
import { StyleSheet, ScrollView, View, Text, AsyncStorage, Dimensions, TouchableHighlightBase } from "react-native";
import { SearchBar, Icon } from "react-native-elements";
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
  const FirstRoute = (theme) => (
    <View style={[styles.scene, { backgroundColor: theme.background }]} >
      <ScrollView>
        {
          course.map(item => item.title ? (<ListLessonItem item={item} key={item.id} onPress={() => navigation.navigate('CoursesDetail', { item: item })} />) : (<View key={item.id}></View>))
        }
      </ScrollView>
    </View>

  );

  const SecondRoute = (theme) => (
    <View style={[styles.scene, { backgroundColor: theme.background }]} />
  );

  const initialLayout = { width: Dimensions.get('window').width };
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'Khóa học' },
    { key: 'second', title: 'Giảng viên' },
  ]);

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
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
                cancelIcon={true}
                selectionColor={theme.foreground}
                placeholder="Search..."
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
                  // <ScrollView>
                  //   <Text style={{ margin: 10, fontSize: 15, fontWeight: 'bold' }}>Khóa học</Text>
                  //   {
                  //     course.map(item => item.title ? (<ListLessonItem item={item} key={item.id} onPress={() => navigation.navigate('CoursesDetail', { item: item })} />) : (<View key={item.id}></View>))
                  //   }
                  //   <Text style={{ margin: 10, fontSize: 15, fontWeight: 'bold' }}>Khóa học</Text>
                  //   {
                  //     course.map(item => item.title ? (<ListLessonItem item={item} key={item.id} onPress={() => navigation.navigate('CoursesDetail', { item: item })} />) : (<View key={item.id}></View>))
                  //   }
                  // </ScrollView>
                  <TabView
                    navigationState={{ index, routes }}
                    renderScene={renderScene}
                    onIndexChange={setIndex}
                    initialLayout={initialLayout}
                    navigation={navigation}
                    style={{ backgroundColor: theme.background }}
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
