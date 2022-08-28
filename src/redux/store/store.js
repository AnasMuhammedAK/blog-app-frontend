import {  configureStore } from '@reduxjs/toolkit'
import usersReducer from '../slices/users/usersSlice'
import categoryReducer from '../slices/Category/categorySlice'

const store = configureStore ({
    reducer : {
        users : usersReducer,
        category : categoryReducer
    }
})
export default store