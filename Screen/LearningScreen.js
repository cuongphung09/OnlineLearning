import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    TouchableOpacity,
    ScrollView,
    AsyncStorage,
    Alert,
    TextInput,
    Image,
    Modal
} from "react-native";
import { WebView } from 'react-native-webview';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import * as ScreenOrientation from 'expo-screen-orientation';
import VideoPlayer from 'expo-video-player'
import { Video } from 'expo-av'
import { Rating, Avatar } from "react-native-elements";
import Youtube from '../src/Component/youtube'
import CircularProgress from '../src/Component/CircularProgress'
import ThemeContext from "../src/Context/theme-context";
import * as FileSystem from 'expo-file-system';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { Collapse, CollapseHeader, CollapseBody, AccordionList } from 'accordion-collapse-react-native';
import { REST_API } from '../config/api'
export default function Learning({ navigation, props, route }) {
    const data = route.params.data.section
    const [vidURL, setVidURL] = useState(route.params.data.promoVidUrl);
    const [rating, setRating] = useState()
    const [progress, setProgress] = useState(0)
    const [rating1, setRating1] = useState(0)
    const [rating2, setRating2] = useState(0)
    const [rating3, setRating3] = useState(0)
    const [ratingContent, setRatingContent] = useState('')
    const sendRating = async () => {
        const id = route.params.data.id
        const info = JSON.stringify({
            courseId: id,
            formalityPoint: rating1,
            contentPoint: rating2,
            presentationPoint: rating3,
            content: ratingContent
        })
        const rate = await REST_API.rateCourse(info)
    }

    useEffect(() => {
        const loadRating = async () => {
            const tokenTemp = await AsyncStorage.getItem("token");
            const id = route.params.data.id
            let rating = await REST_API.getRating(id)
            setRating(rating.payload)
            setRating1(rating.payload.contentPoint || 0)
            setRating2(rating.payload.formalityPoint || 0)
            setRating3(rating.payload.presentationPoint || 0)
            setRatingContent(rating.payload.content || '')
            let progress = await REST_API.getProgress(id)
            setProgress(progress.payload)
        }
        loadRating()
    }, [])
    const FirstRoute = (theme) => (
        <ScrollView style={[styles.scene, { backgroundColor: theme.background, marginTop: 10, marginLeft: 10 }]} >
            {
                data.length !== 0 ? (
                    data.map((item, index) =>
                        (<Collapse key={index}>
                            <CollapseHeader style={{ backgroundColor: theme.background, width: '95%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <View style={{ flexDirection: 'column' }}>
                                    <Text style={{ color: theme.foreground, width: '100%', fontSize: 15, fontWeight: 'bold' }}>Phần {index + 1}: {item.name}</Text>
                                    <View style={{ flexDirection: 'row' }}>
                                        <MaterialCommunityIcons name='clock' size={20} color={theme.foreground}></MaterialCommunityIcons>
                                        <Text style={{ color: theme.foreground }}>  {Math.round(item.sumHours * 60, 2)} phút</Text>
                                    </View>

                                </View>

                                <MaterialCommunityIcons name='chevron-down'></MaterialCommunityIcons>
                            </CollapseHeader>
                            <CollapseBody style={{ backgroundColor: theme.background, width: '90%', justifyContent: 'space-between', alignItems: 'center', marginLeft: 10 }}>

                                {
                                    item.lesson.map((item, index) => (

                                        <TouchableOpacity key={index} style={{ width: '100%', display: 'flex' }}
                                            onPress={() => {
                                                setVidURL(item.videoUrl)
                                            }}
                                        >
                                            <View style={{ flexDirection: 'column' }}>
                                                <Text style={{ color: theme.foreground, width: '100%', fontSize: 15, fontWeight: 'bold' }}>Bài {index + 1}: {item.name}</Text>
                                                <View style={{ flexDirection: 'row' }}>
                                                    <Text style={{ color: theme.foreground }}>  {Math.round(item.hours * 60, 2)} phút</Text>
                                                </View>
                                            </View>
                                        </TouchableOpacity>



                                    ))

                                }
                            </CollapseBody>
                        </Collapse>)


                    )
                ) : (
                        <View></View>
                    )
            }
        </ScrollView>
    )
    const SecondRoute = (theme) => (
        <View style={[styles.scene, { backgroundColor: theme.background, marginTop: 10 }]} >
            <Text style={{ color: theme.foreground, margin: 10 }}>
                Không có bài tập

            </Text>
        </View>
    )
    const ThirdRoute = (theme) => (
        <View style={[styles.scene, { backgroundColor: theme.background, marginTop: 10 }]} >
            <Text style={{ color: theme.foreground, margin: 10 }}>
                Không có câu hỏi

            </Text>
        </View>
    )
    const FourthRoute = (theme) => (
        <View style={[styles.scene, { backgroundColor: theme.background, marginTop: 10 }]} >
            <Text style={{ color: theme.foreground, margin: 10 }}>
                Không có ghi chú

            </Text>
        </View>
    )
    const FifthRoute = (theme) => (
        <ScrollView style={[styles.scene, { backgroundColor: theme.background, marginTop: 10, marginLeft: 10 }]} >

            <View>
                <Text style={{ color: theme.foreground, fontWeight: 'bold', textAlign: 'center' }}>ĐÁNH GIÁ</Text>
                <View style={{ alignItems: 'center', margin: 20 }}>

                    {
                        rating === null ?
                            (<View>
                                <Text style={{ color: theme.foreground, alignItems: 'center' }}>Bạn chưa đánh giá khóa học này</Text>
                                <View style={{
                                    margin: 20,
                                    backgroundColor: "white",
                                    borderRadius: 20,
                                    padding: 35,
                                    alignItems: "center",
                                }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Text style={{ color: theme.foreground }}>Điểm nội dung   </Text>
                                        <Rating
                                            style={{}}
                                            type={"custom"}
                                            imageSize={20}
                                            tintColor={theme.background}
                                            ratingColor='yellow'
                                            ratingBackgroundColor='#c8c7c8'
                                            startingValue={0}
                                            onFinishRating={(value) => {
                                                setRating1(value)
                                            }}
                                            startingValue={rating1}
                                        />
                                    </View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Text style={{ color: theme.foreground }}>Điểm hình thức  </Text>
                                        <Rating
                                            style={{}}
                                            type={"custom"}
                                            imageSize={20}
                                            tintColor={theme.background}
                                            ratingColor='yellow'
                                            ratingBackgroundColor='#c8c7c8'
                                            startingValue={0}
                                            onFinishRating={(value) => {
                                                setRating2(value)
                                            }}
                                            startingValue={rating2}
                                        />
                                    </View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                                        <Text style={{ color: theme.foreground }}>Điểm truyền đạt </Text>
                                        <Rating
                                            style={{}}
                                            type={"custom"}
                                            imageSize={20}
                                            tintColor={theme.background}
                                            ratingColor='yellow'
                                            ratingBackgroundColor='#c8c7c8'
                                            startingValue={0}
                                            onFinishRating={(value) => {
                                                setRating3(value)
                                            }}
                                            startingValue={rating3}
                                        />
                                    </View>
                                    <TextInput style={{ color: theme.foreground, height: 40, borderColor: 'gray', borderWidth: 1, borderRadius: 10, height: 100, width: 220, textAlignVertical: 'top', padding: 10, marginBottom: 10 }}
                                        placeholder='Nhập đánh giá'
                                        onChangeText={(value) => { setRatingContent(value) }}
                                        value={ratingContent}
                                    ></TextInput>
                                    <TouchableOpacity style={{
                                        justifyContent: 'center',
                                        alignSelf: 'center',
                                        alignItems: 'center',
                                        borderColor: '#0084BD',
                                        borderWidth: 1,
                                        width: Dimensions.get('window').width * 40 / 100,
                                        height: 40,
                                        borderRadius: 5
                                        , marginBottom: 10
                                    }}
                                        onPress={async () => {
                                            sendRating()
                                        }}
                                    >
                                        <Text style={{ color: '#0084BD' }}>Lưu</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>) :
                            (<View>
                                <View style={{
                                    // margin: 20,
                                    backgroundColor: "white",
                                    // borderRadius: 20,
                                    // padding: 35,
                                    alignItems: "center",
                                }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Text style={{ color: theme.foreground }}>Điểm nội dung   </Text>
                                        <Rating
                                            style={{}}
                                            type={"custom"}
                                            imageSize={20}
                                            tintColor={theme.background}
                                            ratingColor='yellow'
                                            ratingBackgroundColor='#c8c7c8'
                                            startingValue={0}
                                            onFinishRating={(value) => {
                                                setRating1(value)
                                            }}
                                            startingValue={rating1}
                                        />
                                    </View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Text style={{ color: theme.foreground }}>Điểm hình thức  </Text>
                                        <Rating
                                            style={{}}
                                            type={"custom"}
                                            imageSize={20}
                                            tintColor={theme.background}
                                            ratingColor='yellow'
                                            ratingBackgroundColor='#c8c7c8'
                                            startingValue={0}
                                            onFinishRating={(value) => {
                                                setRating2(value)
                                            }}
                                            startingValue={rating2}
                                        />
                                    </View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                                        <Text style={{ color: theme.foreground }}>Điểm truyền đạt </Text>
                                        <Rating
                                            style={{}}
                                            type={"custom"}
                                            imageSize={20}
                                            tintColor={theme.background}
                                            ratingColor='yellow'
                                            ratingBackgroundColor='#c8c7c8'
                                            startingValue={0}
                                            onFinishRating={(value) => {
                                                setRating3(value)
                                            }}
                                            startingValue={rating3}
                                        />
                                    </View>
                                    <TextInput style={{ color: theme.foreground, height: 40, borderColor: 'gray', borderWidth: 1, borderRadius: 10, height: 100, width: 220, textAlignVertical: 'top', padding: 10, marginBottom: 10 }}
                                        placeholder='Nhập đánh giá'
                                        onChangeText={(text) => { setRatingContent(text) }}
                                        value={ratingContent}
                                    ></TextInput>
                                    <TouchableOpacity style={{
                                        justifyContent: 'center',
                                        alignSelf: 'center',
                                        alignItems: 'center',
                                        borderColor: '#0084BD',
                                        borderWidth: 1,
                                        width: Dimensions.get('window').width * 40 / 100,
                                        height: 40,
                                        borderRadius: 5
                                        , marginBottom: 10
                                    }}
                                        onPress={async () => {
                                            sendRating()
                                        }}
                                    >
                                        <Text style={{ color: '#0084BD' }}>Lưu</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>)
                    }
                </View>
            </View>
            <View>
                <Text style={{ color: theme.foreground, fontWeight: 'bold', textAlign: 'center' }}>BẠN ĐÃ HỌC ĐƯỢC</Text>
                <View style={{ alignItems: 'center', margin: 20 }}>
                    <CircularProgress percent={progress} radius={75} ></CircularProgress>
                </View>

            </View>
            <View>

            </View>
        </ScrollView>
    )
    const initialLayout = { width: Dimensions.get('window').width };
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'first', title: 'Bài học' },
        { key: 'second', title: 'Bài tập' },
        { key: 'third', title: 'Câu hỏi' },
        { key: 'fourth', title: 'Ghi chú' },
        { key: 'fifth', title: 'Chi tiết và đánh giá' },
    ]);
    const renderScene = SceneMap({
        first: FirstRoute,
        second: SecondRoute,
        third: ThirdRoute,
        fourth: FourthRoute,
        fifth: FifthRoute
    });
    return (
        <ThemeContext.Consumer>
            {([theme, setTheme]) => {
                return (
                    <View style={{
                        marginTop: 30,
                        backgroundColor: theme.background,
                        height: "100%",
                        paddingBottom: 30,
                    }}>
                        {
                            vidURL === null ? (
                                <View>
                                    <Image style={[styles.img], { height: 200 }} source={{ uri: route.params.data ? route.params.data.imageUrl : null }}></Image>
                                </View>

                            ) : (
                                    <View style={{ height: 200 }}>
                                        <Youtube youtubeLink={vidURL} style={{ height: 200 }}></Youtube>
                                    </View>
                                )
                        }
                        <TabView
                            navigationState={{ index, routes }}
                            renderScene={renderScene}
                            onIndexChange={setIndex}
                            initialLayout={initialLayout}
                            navigation={navigation}
                            style={{ backgroundColor: theme.background, }}
                            {...theme}
                            renderTabBar={
                                (props) => {
                                    return (
                                        <View>
                                            <ScrollView horizontal={true} style={{}}>
                                                <TabBar
                                                    {...props}
                                                    // indicatorStyle={{ backgroundColor: '#0084BD' }}
                                                    style={{ backgroundColor: theme.background, height: 60 }}
                                                    activeColor='#0084BD'
                                                    inactiveColor={theme.foreground}
                                                    indicatorStyle={{
                                                        backgroundColor: '#0084BD',
                                                        width: 140
                                                    }}
                                                    indicatorContainerStyle={{
                                                        width: Dimensions.get("screen").width
                                                    }}
                                                    contentContainerStyle={{
                                                        justifyContent: "center",
                                                        alignItems: 'center'

                                                    }}
                                                    tabStyle={{ elevation: 0, width: 140 }}
                                                />
                                            </ScrollView>
                                        </View>



                                    )
                                }
                            }
                        />
                        {

                            // console.log(route.params.data)
                        }
                    </View>
                )
            }
            }
        </ThemeContext.Consumer>
    )
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: "#212121",
    },
    rating: {
        justifyContent: "flex-start",
        alignItems: "flex-start",
        marginLeft: 10,
        flex: 1,
        flexDirection: "row",
    },
    scene: {
        flex: 1,
    },
    title: {
        color: "white",
        fontSize: 25,
        marginTop: 20,
        marginLeft: 10,
        marginRight: 10,
    },
    subtitle: {
        color: "white",
        fontSize: 15,
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
    },
    button: {
        borderRadius: 50,
        borderWidth: 1,
        backgroundColor: "#505050",
        marginRight: 10,
        flexDirection: "row",
    },
    tagButton: {
        color: "white",
        marginLeft: 10,
        marginRight: 10,
        marginTop: 5,
        marginBottom: 5,
    },
    img: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'contain',

    },

});