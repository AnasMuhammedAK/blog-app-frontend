import axios from 'axios'

const baseURL = 'http://localhost:5000' //'https://speedcode-blogs.herokuapp.com'

const publicAxios = axios.create({baseURL})

export default publicAxios