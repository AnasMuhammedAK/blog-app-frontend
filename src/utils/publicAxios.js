import axios from 'axios'

const baseURL = 'http://localhost:5000'

const publicAxios = axios.create({baseURL})

export default publicAxios