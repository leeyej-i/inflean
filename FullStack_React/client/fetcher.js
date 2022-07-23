import axios from 'axios'

axios.defaults.baseURL = "http://localhost:8000"


//async는 항상 프라미스를 반환 -> res.data가 프라미스
// awaite => async 함수 안에서만 동작하며, 프라미스가 처리되면 실행시킴
const fetcher = async (method, url, ...rest) => {
    console.log("레스트", rest)
    const res = await axios[method](url, ...rest)
    console.log("흠", res)
    return res.data
}

export default fetcher