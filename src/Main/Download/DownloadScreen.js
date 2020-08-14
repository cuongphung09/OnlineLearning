import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import ThemeContext from "../../Context/theme-context";
import * as FileSystem from 'expo-file-system';
import Youtube from '../../Component/youtube'
import * as ScreenOrientation from 'expo-screen-orientation';
import VideoPlayer from 'expo-video-player'
import { Video } from 'expo-av'
export default function DownloadScreen({ navigation }) {
  const [data, setData] = useState([])
  const [FScreen, setFScreen] = useState(false)
  useEffect(() => {
    const loadData = async () => {
      const data = await FileSystem.readDirectoryAsync(FileSystem.documentDirectory)
      console.log(data)
      setData(data)
    }
    loadData()
  }, [])
  return (
    <ThemeContext.Consumer>
      {
        ([theme, setTheme]) => {
          return (
            <View style={[styles.container, { backgroundColor: theme.background }]}>
              {data.length === 0 ? (
                <View style={styles.container}>
                  <MaterialCommunityIcons name="download" color={theme.foreground} size={200} />
                  <Text style={{ fontSize: 30, fontWeight: 'bold', color: theme.foreground }}>No download</Text>
                  <Text style={{ fontSize: 16, color: theme.foreground }}>Courses you download will appear here</Text>
                </View>
              ) : (
                  <ScrollView>
                    {
                      data.map(each => (
                        <VideoPlayer
                          videoProps={
                            {
                              source: {
                                uri: FileSystem.documentDirectory + each,
                              },
                              shouldPlay: false,
                              resizeMode: Video.RESIZE_MODE_CONTAIN,
                            }
                          }
                          
                          isPortrait={true}
                          playFromPositionMillis={0}
                          inFullscreen={FScreen}
                          showControlsOnLoad={true}
                          showFullscreenButton={true}
                          width={FScreen ? 700 : 360}
                          height={FScreen ? 330 : 200}
                          switchToLandscape={async () => {
                            ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_LEFT)
                            setFScreen(true)
                          }}
                          switchToPortrait={async () => {
                            ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP)
                            setFScreen(false)
                          }}
                        />
                        // <View>

                        // </View>
                      ))
                    }
                  </ScrollView>
                )}
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
