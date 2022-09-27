import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import privateAxios from '../../../utils/privateAxios'
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
    async (user, { rejectWithValue, getState, dispatch }) => {
        try {
            return await usersServiece.login(user)
        } catch (error) {
            if (!error?.response) throw error
            return rejectWithValue(error?.response?.data)
        }
    })
//---------------------------------------------------
//Profile action
//---------------------------------------------------
export const userProfileAction = createAsyncThunk(
    "user/profile",
    async (id, { rejectWithValue, getState, dispatch }) => {
        try {
            const { data } = await privateAxios.get(`/api/users/profile/${id}`);
            return data;
        } catch (error) {
            if (!error?.response) throw error
            return rejectWithValue(error?.response?.data);
        }
    }
);
//---------------------------------------------------
// Upload Profile photo
//---------------------------------------------------

export const uploadProfilePhotoAction = createAsyncThunk(
    "user/profile-photo",
    async (userImage, { rejectWithValue, getState, dispatch }) => {
        try {
            const formData = new FormData();
            formData.append("image", userImage?.image);
            const { data } = await privateAxios.put(`/api/users/profile-photo-upload`, formData);
            return data;
        } catch (error) {
            if (!error?.response) throw error;
            return rejectWithValue(error?.response?.data);
        }
    }
);

//---------------------------------------------------
//Logout Action
//---------------------------------------------------
export const logoutUserAction = createAsyncThunk('users/logout',
    async (payload, { rejectWithValue, getState, dispatch }) => {
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
            // Profile
            .addCase(userProfileAction.pending, (state, action) => {
                state.profileLoading = true;
                state.profileAppErr = undefined;
                state.profileServerErr = undefined;
            })
            .addCase(userProfileAction.fulfilled, (state, action) => {
                state.profile = action?.payload;
                state.profileLoading = false;
                state.profileAppErr = undefined;
                state.profileServerErr = undefined;
            })
            .addCase(userProfileAction.rejected, (state, action) => {
                state.profileLoading = false;
                state.profileAppErr = action?.payload?.message;
                state.profileServerErr = action?.error?.message;
            })
            //logout
            .addCase(logoutUserAction.fulfilled, (state) => {
                state.loading = false
                state.userAuth = null
                state.appErr = undefined
                state.serverErr = undefined
            })
            // Upload Profile Photo
            .addCase(uploadProfilePhotoAction.pending, (state, action) => {
                state.loading = true;
                state.appErr = undefined;
                state.serverErr = undefined;
            })
            .addCase(uploadProfilePhotoAction.fulfilled, (state, action) => {
                state.profilePhoto = action?.payload;
                state.loading = false;
                state.appErr = undefined;
                state.serverErr = undefined;
            })
            .addCase(uploadProfilePhotoAction.rejected, (state, action) => {
                state.loading = false;
                state.appErr = action?.payload?.message;
                state.serverErr = action?.error?.message;
            })

    },

})

export default usersSlice.reducer