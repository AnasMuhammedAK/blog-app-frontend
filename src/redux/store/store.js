import { configureStore } from '@reduxjs/toolkit'
import usersReducer from '../slices/users/usersSlice'
import categoryReducer from '../slices/Category/categorySlice'
import postReducer from '../slices/posts/postSlice'
import commentReducer from '../slices/comments/commentSlice'
import sendMailReducer from '../slices/email/emailSlice'
import accountVerification from "../slices/AccVerification/accountVerification";

const store = configureStore({
    reducer: {
        users: usersReducer,
        category: categoryReducer,
        posts: postReducer,
        comments: commentReducer,
        sendMail: sendMailReducer,
        accountVerification,
    }
})
export default store