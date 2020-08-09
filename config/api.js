import axios from "axios"
import { AsyncStorage } from "react-native"
const error_exception = (err) => ({
    success: false,
    message: err || "Lỗi không xác định!",
})
const HOST_URL =
    "https://api.itedu.me"
class API {
    constructor() {
        this.instance = axios.create({
            baseURL: HOST_URL,
            timeout: 20000
        })
        this.instance.interceptors.request.use(
            async (config) => {
                const token = await AsyncStorage.getItem("token");
                if (token) {
                    config.headers["Authorization"] = `Bearer ${token}`
                }
                config.headers['Content-Type'] = 'application/json';
                config.headers['Accept'] = 'application/json';
                return config
            },
            (error) => {
                Promise.reject(error)
            }
        )
        this.instance.interceptors.response.use(
            (response) => {
                return response
            },
            async (error) => {
                const originalRequest = error.config
                if (error.response.data.code === 425) {
                    AsyncStorage.clear()
                    return Promise.reject(error)
                }
                return Promise.reject(error)
            }
        )
        this.login = this.login.bind(this)
        this.register = this.register.bind(this)
        this.forgetPassword = this.forgetPassword.bind(this)
        this.sendActivateEmail = this.sendActivateEmail.bind(this)
        this.getRecommendCourse = this.getRecommendCourse.bind(this)
        this.getFavoriteCourse = this.getFavoriteCourse.bind(this)
        this.getTopCourse = this.getTopCourse.bind(this)
        this.saveUserInfo = this.saveUserInfo.bind(this)
        this.getInfo = this.getInfo.bind(this)
    }
    login = async (info) => {
        return await this.instance
            .post(`/user/login`, info)
            .then((response) => {
                return response.data || error_exception()
            })
            .catch((error) => {
                if (error.response) {
                    return error.response.data || error_exception()
                } else {
                    console.log(error)
                    return error_exception()
                }
            })
    }
    forgetPassword = async (info) => {
        return await this.instance
            .post(`/user/forget-pass/send-email`, info)
            .then((response) => {
                return response.data || error_exception()
            })
            .catch((error) => {
                if (error.response) {
                    return error.response.data || error_exception()
                } else {
                    console.log(error)
                    return error_exception()
                }
            })
    }
    register = async (info) => {
        return await this.instance
            .post(`/user/register`, info)
            .then((response) => {
                return response.data || error_exception()
            })
            .catch((error) => {
                if (error.response) {
                    return error.response.data || error_exception()
                } else {
                    console.log(error)
                    return error_exception()
                }
            })
    }
    sendActivateEmail = async (info) => {
        return await this.instance
            .post(`/user/send-activate-email`, info)
            .then((response) => {
                return response.data || error_exception()
            })
            .catch((error) => {
                if (error.response) {
                    return error.response.data || error_exception()
                } else {
                    console.log(error)
                    return error_exception()
                }
            })
    }
    getRecommendCourse = async () => {
        const userInfo = await AsyncStorage.getItem('userInfo');
        return await this.instance
            .get(`/user/recommend-course/${JSON.parse(userInfo).id}/10/1`)
            .then((response) => {
                return response.data || error_exception()
            })
            .catch((error) => {
                if (error.response) {
                    return error.response.data || error_exception()
                } else {
                    console.log(error)
                    return error_exception()
                }
            })
    }
    getFavoriteCourse = async (info) => {
        const userInfo = await AsyncStorage.getItem('userInfo');
        return await this.instance
            .post(`/course/courses-user-favorite-categories`)
            .then((response) => {
                return response.data || error_exception()
            })
            .catch((error) => {
                if (error.response) {
                    return error.response.data || error_exception()
                } else {
                    console.log(error)
                    return error_exception()
                }
            })
    }
    getNewestCourse = async (info) => {
        const userInfo = await AsyncStorage.getItem('userInfo');
        return await this.instance
            .post(`/course/top-new`)
            .then((response) => {
                return response.data || error_exception()
            })
            .catch((error) => {
                if (error.response) {
                    return error.response.data || error_exception()
                } else {
                    console.log(error)
                    return error_exception()
                }
            })
    }
    getTopCourse = async (info) => {
        const userInfo = await AsyncStorage.getItem('userInfo');
        return await this.instance
            .post(`/course/top-rate`)
            .then((response) => {
                return response.data || error_exception()
            })
            .catch((error) => {
                if (error.response) {
                    return error.response.data || error_exception()
                } else {
                    console.log(error)
                    return error_exception()
                }
            })
    }
    saveUserInfo = async (info) => {
        return await this.instance
            .put(`/user/update-profile`, info)
            .then((response) => {
                return response.data || error_exception()
            })
            .catch((error) => {
                if (error.response) {
                    return error.response.data || error_exception()
                } else {
                    console.log(error)
                    return error_exception()
                }
            })
        return true
    }
    getInfo = async () => {
        return await this.instance
            .get(`/user/me`)
            .then((response) => {
                return response.data || error_exception()
            })
            .catch((error) => {
                if (error.response) {
                    return error.response.data || error_exception()
                } else {
                    console.log(error)
                    return error_exception()
                }
            })
    }
}
const REST_API = new API()

export { REST_API }