import {  configureStore } from '@reduxjs/toolkit'
import usersReducer from '../slices/users/usersSlice'

const store = configureStore ({
    reducer : {
        users : usersReducer
    }
})
export default store