import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import usersServiece from './usersService'
//---------------------------------------------------
//register action
//---------------------------------------------------
export const registerUserAction = createAsyncThunk('users/register',
    async (user, { rejectWithValue, getState, dispatch }) => {
        try {
            return await usersServiece.register(user)
        } catch (error) {
            if (!error?.response) throw error
            return rejectWithValue(error?.response?.data)
        }
    })
//---------------------------------------------------
//Login action
//---------------------------------------------------
export const loginUserAction = createAsyncThunk('users/login',
async(user, { rejectWithValue, getState, dispatch }) => {
    try {
        return await usersServiece.login(user)
    } catch (error) {
        if (!error?.response) throw error
        return rejectWithValue(error?.response?.data)
    }
})
//---------------------------------------------------
//Logout Action
//---------------------------------------------------
export const logoutUserAction = createAsyncThunk('users/logout',
async(payload, { rejectWithValue, getState, dispatch }) => {
try {
    
    const { refreshToken } = JSON.parse(localStorage.getItem('tokens'))
  return await usersServiece.logout(refreshToken)
} catch (error) {
    if (!error?.response) throw error
    return rejectWithValue(error?.response?.data)
}
})

//get user from localStorage to store
const userFromLocalStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null

//create user slices
const usersSlice = createSlice({
    name: 'users',
    initialState: {
        userAuth: userFromLocalStorage
    },
    reducers: {
        // reset: (state) => {
        //     state.isLoading = false
        //     state.isSuccess = false
        //     state.isError = false
        //     state.message = ''
        // },
    },
    extraReducers: (builder) => {
        builder
        //register
            .addCase(registerUserAction.pending, (state) => {
                state.loading = true
                state.appErr = undefined
                state.serverErr = undefined
            })
            .addCase(registerUserAction.fulfilled, (state, action) => {
                state.loading = false
                state.userAuth = action.payload
                state.appErr = undefined
                state.serverErr = undefined
            })
            .addCase(registerUserAction.rejected, (state, action) => {
                state.loading = false
                state.appErr = action.payload.message
                state.serverErr = action.error.message
                state.userAuth = null
            })
        //login
            .addCase(loginUserAction.pending, (state) => {
                state.loading = true
                state.appErr = undefined
                state.serverErr = undefined
            })
            .addCase(loginUserAction.fulfilled, (state, action) => {
                state.loading = false
                state.userAuth = action.payload
                state.appErr = undefined
                state.serverErr = undefined
            })
            .addCase(loginUserAction.rejected, (state, action) => {
                state.loading = false
                state.appErr = action.payload.message
                state.serverErr = action.error.message
                state.userAuth = null
            })
        //logout
            .addCase(logoutUserAction.fulfilled, (state) => {
                state.loading = false
                state.userAuth = null
                state.appErr = undefined
                state.serverErr = undefined
              })

    },

})

export default usersSlice.reducer