import axios from 'axios'

const baseURL = 'https://speedcode-blogs.herokuapp.com' // 'http://localhost:5000'

const publicAxios = axios.create({baseURL})

export default publicAxios