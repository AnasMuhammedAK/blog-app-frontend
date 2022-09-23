import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
import privateAxios from '../../../utils/privateAxios'
import publicAxios from '../../../utils/publicAxios'

//action to redirect
const resetPost = createAction("category/reset");
//Create Post action
export const createpostAction = createAsyncThunk("post/created",
  async (post, { rejectWithValue, getState, dispatch }) => {
    try {
      const formData = new FormData();
      formData.append("title", post?.title);
      formData.append("description", post?.description);
      formData.append("category", post?.category);
      formData.append("image", post?.image);
      const { data } = await privateAxios.post(`/api/posts/create`, formData);
      //dispatch action
      dispatch(resetPost());
      return data;
    } catch (error) {
      if (!error?.response) throw error
      return rejectWithValue(error?.response?.data)
      // let message = (error?.response?.data?.message) ? (error?.response?.data?.message) :(error?.response?.data)
      // return rejectWithValue(message)
    }
  }
);
//fetch all posts
export const fetchPostsAction = createAsyncThunk(
  "post/list",
  async (category, { rejectWithValue, getState, dispatch }) => {
    //alert(category)
    try {
      if (category) {
        const { data } = await publicAxios.get(`/api/posts?category=${category}`);
        return data;
      } else {
        const { data } = await publicAxios.get(`/api/posts`);
        return data;
      }
    } catch (error) {
      if (!error?.response) throw error;
      return rejectWithValue(error?.response?.data);
    }
  }
);
// Fetch  Post Details Action
export const fetchPostDetailsAction = createAsyncThunk('post/post-details',
  async (id, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await publicAxios.get(`/api/posts/${id}`)
      return data;
    } catch (error) {
      if (!error?.response) throw error;
      let message = (error?.response?.data?.message) ? (error?.response?.data?.message) : (error?.response?.data)
      return rejectWithValue(message)
    }
  })
//like a post
export const toggleAddLikesToPost = createAsyncThunk('post/like',
  async (postId, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await privateAxios.put(`/api/posts/like`, { postId })
      return data
    } catch (error) {
      if (!error?.response) throw error
      let message = (error?.response?.data?.message) ? (error?.response?.data?.message) : (error?.response?.data)
      return rejectWithValue(message)
    }
  })
//like a post
export const toggleAddDisLikesToPost = createAsyncThunk('post/dislike',
  async (postId, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await privateAxios.put(`/api/posts/dislike`, { postId })
      return data
    } catch (error) {
      if (!error?.response) throw error
      let message = (error?.response?.data?.message) ? (error?.response?.data?.message) : (error?.response?.data)
      return rejectWithValue(message)
    }
  })


//slice
const postSlice = createSlice({
  name: "post",
  initialState: {},
  extraReducers: builder => {
    builder.addCase(createpostAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(resetPost, (state, action) => {
      state.isCreated = true;
      state.loading = false;
    });
    builder.addCase(createpostAction.fulfilled, (state, action) => {
      state.postCreated = action?.payload;
      state.loading = false;
      state.isCreated = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(createpostAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload
      state.serverErr = action?.error?.message;
    });
    //fetch posts
    builder.addCase(fetchPostsAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchPostsAction.fulfilled, (state, action) => {
      state.postLists = action?.payload;
      state.loading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(fetchPostsAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });
    // Fetch Post Details
    builder.addCase(fetchPostDetailsAction.pending, (state, action) => {
      state.loading = true;
    })
    builder.addCase(fetchPostDetailsAction.fulfilled, (state, action) => {
      state.postDetails = action?.payload;
      state.loading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    })
    builder.addCase(fetchPostDetailsAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload
      state.serverErr = action?.error?.message
    })
    // Likes
    builder.addCase(toggleAddLikesToPost.pending, (state, action) => {
      state.loading = true;
    })
    builder.addCase(toggleAddLikesToPost.fulfilled, (state, action) => {
      state.likes = action?.payload;
      state.loading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    })
    builder.addCase(toggleAddLikesToPost.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload
      state.serverErr = action?.error?.message
    })
    // DisLikes
    builder.addCase(toggleAddDisLikesToPost.pending, (state, action) => {
      state.loading = true;
    })
    builder.addCase(toggleAddDisLikesToPost.fulfilled, (state, action) => {
      state.disLikes = action?.payload;
      state.loading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    })
    builder.addCase(toggleAddDisLikesToPost.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload
      state.serverErr = action?.error?.message
    })
  },
});

export default postSlice.reducer;
