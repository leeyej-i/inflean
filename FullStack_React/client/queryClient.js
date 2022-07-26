// import axios from 'axios'

// axios.defaults.baseURL = "http://localhost:8000"


// //async는 항상 프라미스를 반환 -> res.data가 프라미스
// // awaite => async 함수 안에서만 동작하며, 프라미스가 처리되면 실행시킴
// const fetcher = async (method, url, ...rest) => {
//     const res = await axios[method](url, ...rest)
//     return res.data
// }

// export default fetcher

//Graphql사용
import { request } from 'graphql-request'
const URL = 'http://localhost:8000/graphql'

export const fetcher = (query, variables = {}) => request(URL, query, variables)

export const QueryKeys = {
    MESSAGES: 'MESSAGES',
    MESSAGE: 'MESSAGE',
    USERS: 'USERS',
    USER: 'USER',
}