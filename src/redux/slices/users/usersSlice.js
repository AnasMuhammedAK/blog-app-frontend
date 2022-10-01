import { createAsyncThunk, createSlice, createAction } from '@reduxjs/toolkit'
import privateAxios from '../../../utils/privateAxios'
import usersServiece from './usersService'

// Redirect action
const resetUserAction = createAction("user/profile/reset");
// Redirect action
const resetPasswordAction = createAction("user/password/reset");

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
            console.log(data)
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
            if (userImage?.banner) {
                const { data } = await privateAxios.put(`/api/users/banner-photo-upload`, formData);
                if (data.isSuccess) localStorage.setItem('userInfo', JSON.stringify(data))
                return data;
            } else {
                const { data } = await privateAxios.put(`/api/users/profile-photo-upload`, formData);
                if (data.isSuccess) localStorage.setItem('userInfo', JSON.stringify(data))
                return data;
            }
        } catch (error) {
            if (!error?.response) throw error;
            return rejectWithValue(error?.response?.data);
        }
    }
);
//---------------------------------------------------
// update user profile
//---------------------------------------------------
export const updateUserAction = createAsyncThunk(
    "users/update",
    async (userData, { rejectWithValue, getState, dispatch }) => {
        try {
            const { data } = await privateAxios.put(`/api/users/profile`,
                {
                    firstName: userData?.firstName,
                    lastName: userData?.lastName,
                    email: userData?.email,
                    bio: userData?.bio,
                });
            // dispatch
            dispatch(resetUserAction());
            return data;
        } catch (error) {
            if (!error?.response) throw error;
            return rejectWithValue(error?.response?.data);
        }
    }
);
// Fetch user Details
export const fetchUserDetailsAction = createAsyncThunk(
    "users/detail",
    async (id, { rejectWithValue, getState, dispatch }) => {
        try {
            const { data } = await privateAxios.get(`/api/users/${id}`);
            return data;
        } catch (error) {
            if (!error?.response) throw error;
            return rejectWithValue(error?.response?.data);
        }
    }
);
// Follow
export const followUserAction = createAsyncThunk("user/follow",
    async (userToFollowId, { rejectWithValue, getState, dispatch }) => {
        try {
            const { data } = await privateAxios.put(`/api/users/follow`, { followId: userToFollowId });
            return data;
        } catch (error) {
            if (!error?.response) throw error;
            return rejectWithValue(error?.response?.data);
        }
    }
);

// unFollow
export const unFollowUserAction = createAsyncThunk(
    "user/un-follow",
    async (unFollowId, { rejectWithValue, getState, dispatch }) => {
        try {
            const { data } = await privateAxios.put(`/api/users/un-follow`, { unFollowId });
            return data;
        } catch (error) {
            if (!error?.response) throw error;
            return rejectWithValue(error?.response?.data);
        }
    }
);
// update Password
export const updatePasswordAction = createAsyncThunk("password/update",
    async (password, { rejectWithValue, getState, dispatch }) => {
        try {
            const pass = {
                currentPassword : password?.currentPassword,
                newPassword : password?.newPassword
            }
            console.log(pass,"hhhhhh");
            const { data } = await privateAxios.put(`/api/users/password`, pass);
            // dispatch
            dispatch(resetPasswordAction());
            return data;
        } catch (error) {
            if (!error?.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
)
// Fetch All user
export const fetchUsersAction = createAsyncThunk("users/list",
    async (_, { rejectWithValue, getState, dispatch }) => {
        try {
            const { data } = await privateAxios.get(`/api/users`);
            console.log(data)
            return data;
        } catch (error) {
            if (!error?.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
);
// Block  User user
export const blockUserAction = createAsyncThunk("users/block-user",
    async (id, { rejectWithValue, getState, dispatch }) => {
        try {
            const { data } = await privateAxios.put(
                `/api/admin/block/${id}`, {});
            return data;
        } catch (error) {
            if (!error?.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
);
// UnBlock  User user
export const unBlockUserAction = createAsyncThunk("users/unblock-user",
    async (id, { rejectWithValue, getState, dispatch }) => {
        try {
            const { data } = await privateAxios.put(
                `/api/admin/unblock/${id}`, {});
            return data;
        } catch (error) {
            if (!error?.response) {
                throw error;
            }
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
            // update profile
            .addCase(updateUserAction.pending, (state, action) => {
                state.loading = true;
                state.appErr = undefined;
                state.serverErr = undefined;
            })
            .addCase(resetUserAction, (state, action) => {
                state.isUpdated = true;
            })
            .addCase(updateUserAction.fulfilled, (state, action) => {
                state.loading = false;
                state.userUpdated = action?.payload;
                state.isUpdated = false;
                state.appErr = undefined;
                state.serverErr = undefined;
            })
            .addCase(updateUserAction.rejected, (state, action) => {
                state.loading = false;
                state.appErr = action?.payload?.message;
                state.serverErr = action?.error?.message;
            })
            // update Password
            .addCase(updatePasswordAction.pending, (state, action) => {
                state.loading = true;
                state.appErr = undefined;
                state.serverErr = undefined;
            })
            .addCase(resetPasswordAction, (state, action) => {
                state.isPasswordUpdated = true;
            })
            .addCase(updatePasswordAction.fulfilled, (state, action) => {
                state.loading = false;
                state.passwordUpdated = action?.payload;
                state.isPasswordUpdated = false;
                state.appErr = undefined;
                state.serverErr = undefined;
            })
            .addCase(updatePasswordAction.rejected, (state, action) => {
                state.loading = false;
                state.appErr = action?.payload?.message;
                state.serverErr = action?.error?.message;
            })
            // fetch user Details
            .addCase(fetchUserDetailsAction.pending, (state, action) => {
                state.loading = true;
                state.appErr = undefined;
                state.serverErr = undefined;
            })
            .addCase(fetchUserDetailsAction.fulfilled, (state, action) => {
                state.loading = false;
                state.userDetails = action?.payload;
                state.appErr = undefined;
                state.serverErr = undefined;
            })
            .addCase(fetchUserDetailsAction.rejected, (state, action) => {
                state.loading = false;
                state.appErr = action?.payload?.message;
                state.serverErr = action?.error?.message;
            })

            //ser Follow
            .addCase(followUserAction.pending, (state, action) => {
                state.loading = true;
                state.appErr = undefined;
                state.serverErr = undefined;
            })
            .addCase(followUserAction.fulfilled, (state, action) => {
                state.loading = false;
                state.followed = action?.payload;
                state.unFollowed = undefined;
                state.appErr = undefined;
                state.serverErr = undefined;
            })
            .addCase(followUserAction.rejected, (state, action) => {
                state.loading = false;
                state.appErr = action?.payload?.message;
                state.unFollowed = undefined;
                state.serverErr = action?.error?.message;
            })

            //user unFollow
            .addCase(unFollowUserAction.pending, (state, action) => {
                state.unfollowLoading = true;
                state.unFollowedAppErr = undefined;
                state.unfollowServerErr = undefined;
            })
            .addCase(unFollowUserAction.fulfilled, (state, action) => {
                state.unfollowLoading = false;
                state.unFollowed = action?.payload;
                state.followed = undefined;
                state.unFollowedAppErr = undefined;
                state.unfollowServerErr = undefined;
            })
            .addCase(unFollowUserAction.rejected, (state, action) => {
                state.unfollowLoading = false;
                state.unFollowedAppErr = action?.payload?.message;
                state.unfollowServerErr = action?.error?.message;
            })
            // Block user
            .addCase(blockUserAction.pending, (state, action) => {
                state.loading = true;
                state.appErr = undefined;
                state.serverErr = undefined;
            })
            .addCase(blockUserAction.fulfilled, (state, action) => {
                state.loading = false;
                state.block = action?.payload;
                state.appErr = undefined;
                state.serverErr = undefined;
            })
            .addCase(blockUserAction.rejected, (state, action) => {
                state.loading = false;
                state.appErr = action?.payload?.message;
                state.serverErr = action?.error?.message;
            })

            // UnBlock user
            .addCase(unBlockUserAction.pending, (state, action) => {
                state.loading = true;
                state.appErr = undefined;
                state.serverErr = undefined;
            })
            .addCase(unBlockUserAction.fulfilled, (state, action) => {
                state.loading = false;
                state.unblock = action?.payload;
                state.appErr = undefined;
                state.serverErr = undefined;
            })
            .addCase(unBlockUserAction.rejected, (state, action) => {
                state.loading = false;
                state.appErr = action?.payload?.message;
                state.serverErr = action?.error?.message;
            })

            // fetch All user
            .addCase(fetchUsersAction.pending, (state, action) => {
                state.loading = true;
                state.appErr = undefined;
                state.serverErr = undefined;
            })
            .addCase(fetchUsersAction.fulfilled, (state, action) => {
                state.loading = false;
                state.userList = action?.payload;
                state.appErr = undefined;
                state.serverErr = undefined;
            })
            .addCase(fetchUsersAction.rejected, (state, action) => {
                state.loading = false;
                state.appErr = action?.payload?.message;
                state.serverErr = action?.error?.message;
            })

    },

})

export default usersSlice.reducer