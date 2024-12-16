import { useUserStore } from "@/stores/useUserStore"
import axios, {  type AxiosResponse } from "axios"


// 创建 axios 对象
const request = axios.create({
    timeout: 5000
})

// 请求拦截
request.interceptors.request.use(config => {
    let token = useUserStore().token;
    if (token) {
        config.headers.Authorization = token
    }
    
    return config
}, err => {
    return err
})

// 响应拦截
request.interceptors.response.use(res => {
    return res
}, err => {
    return err
})

const http = {
    get<T>(url: string, data?: any) {
        return new Promise<T>((resolve, reject) => {
            request.get(url, { params: data }).then((
                res: AxiosResponse<T>
            ) => {
                resolve(res.data)
            }).catch(err => {
                reject(err)
            })
        })
    },
    post<T>(url: string, data?: any) {
        return new Promise<T>((resolve, reject) => {
            request.post(url, data).then((res: AxiosResponse<T>) => {
                resolve(res.data)
            }).catch(err => {
                reject(err)
            })
        })
    },
}

export { http }