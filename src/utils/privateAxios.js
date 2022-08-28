import axios from 'axios'
import jwt_decode from "jwt-decode";
const baseURL = 'http://localhost:5000'


const axiosInstance = axios.create({baseURL: baseURL})
const generateRefreshToken = async () => {
    console.log('generateRefreshToken.....')
    try {
        const { refreshToken } = JSON.parse(localStorage.getItem('tokens'))
        const { _id } = JSON.parse(localStorage.getItem('userInfo'))
        const { data } = await axios.post(`${baseURL}/api/users/refreshtoken`, { refreshToken: refreshToken, userId: _id });
        localStorage.setItem('tokens', JSON.stringify(data))
        return data;
    } catch (err) {
        console.log(err);
    }
};

axiosInstance.interceptors.request.use(
    async (config) => {
        const { accessToken } = JSON.parse(localStorage.getItem('tokens'))
        let currentDate = new Date();
        const decodedToken = jwt_decode(accessToken);
        if (decodedToken.exp * 1000 < currentDate.getTime()) {
            console.log('Expired access token..')
            const data = await generateRefreshToken();
            config.headers["Authorization"] = "Bearer " + data.accessToken;
            return config;
        } else {
            console.log('With old access token token..')
            config.headers["Authorization"] = "Bearer " + accessToken;
            return config;
        }
        
    },
    (error) => {
        return Promise.reject(error);
    }
);
export default axiosInstance