import axios from 'axios'
import jwtDecode from 'jwt-decode'
import { useDispatch } from "react-redux";
import { registerUserAction } from '../redux/slices/users/usersSlice';

 const dispatch = useDispatch()

export const createOrGetUser = async(response) => {
const decoded = jwtDecode(response.credential)
const userData = {
    fullName: decoded.name,
    email: decoded.email,
    password: decoded.sub,
}
//dispatch(registerUserAction(userData))
console.log(userData)
}