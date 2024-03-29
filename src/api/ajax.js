/* 
对axios进行而二次封装
1. 配置通用的基础路径和超时
2. 显示请求进度条
3. 成功返回的数据不再是response, 而直接是响应体数据response.data
4. 统一处理请求错误, 具体请求也可以选择处理或不处理
*/

import axios from 'axios'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import store from '@/store'

// 配置通用的基础路径和超时
const service = axios.create({
    baseURL:'/api',  //基础路径
    timeout: 20000,  //超时时间
})

// 请求拦截器
service.interceptors.request.use(config => {
    // 进度条开始
    NProgress.start()

    // 在请求头中添加用户唯一标识
    let userTempId = store.state.user.userTempId
    if(userTempId){
        config.headers.userTempId = userTempId
    }

    // 在请求头里面添加token
    let token = store.state.user.token 
    if(token){
        config.headers.token = token 
    }

    // 配置项必须返回
    return config
})

// 响应拦截器
service.interceptors.response.use(
    response => {
        // 进度条完成
        NProgress.done()
        // 成功的回调
        return response.data
    },
    error => {
        // 抛出错误
        // throw error
        // 进度条完成
        NProgress.done()

        // 统一的错误处理
        alert(error.message || '未知的请求错误')

        // 返回失败的promise
        return Promise.reject(error)
    }
)

// 暴露
export default service