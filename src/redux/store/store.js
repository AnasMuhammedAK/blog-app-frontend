import {  configureStore } from '@reduxjs/toolkit'
import usersReducer from '../slices/users/usersSlice'
import categoryReducer from '../slices/Category/categorySlice'
import postReducer from '../slices/posts/postSlice'
const store = configureStore ({
    reducer : {
        users : usersReducer,
        category : categoryReducer,
        posts: postReducer
    }
})
export default store