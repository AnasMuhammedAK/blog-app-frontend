import axios from 'axios'
import axiosInstance, { baseURL } from '../../../utils/baseURL'


//REGISTER USER
//-------------------------------------------------------------
const register = async (userData) => {
    const { data } = await axios.post(`${baseURL}/api/users/register`, userData)
    //SAVE USER INTO LOCAL STORAGE
    if (data){
        localStorage.setItem('userInfo', JSON.stringify(data))
        localStorage.setItem('tokens', JSON.stringify({accessToken:data.accessToken, refreshToken:data.refreshToken}))
    }
    return data
}
//LOGIN USER
//-------------------------------------------------------------
const login = async (userData) => {
    const { data } = await axios.post(`${baseURL}/api/users/login`, userData)
    //SAVE USER INTO LOCAL STORAGE
    if (data){
        localStorage.setItem('userInfo', JSON.stringify(data))
        localStorage.setItem('tokens', JSON.stringify({accessToken:data.accessToken, refreshToken:data.refreshToken}))
    }
    return data
}
//LOGOUT USER
//-------------------------------------------------------------
const logout = async (refreshToken) => {
    // const config = {
    //     headers: {
    //         Authorization: `Bearer ${accessToken}`, 
    //     },
    // }
   const { data } =  await axiosInstance.post(`/api/users/logout`, { refreshToken })
   if(data.status) {
    localStorage.removeItem('userInfo')
    localStorage.removeItem('tokens')
   } 
    return 
}



const usersService = {
    register,
    login,
    logout
}
export default usersService