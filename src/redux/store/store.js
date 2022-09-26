import { configureStore } from '@reduxjs/toolkit'
import usersReducer from '../slices/users/usersSlice'
import categoryReducer from '../slices/Category/categorySlice'
import postReducer from '../slices/posts/postSlice'
import commentReducer from '../slices/comments/commentSlice'
const store = configureStore({
    reducer: {
        users: usersReducer,
        category: categoryReducer,
        posts: postReducer,
        comments: commentReducer
    }
})
export default store