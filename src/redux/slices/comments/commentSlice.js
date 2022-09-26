import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
import privateAxios from '../../../utils/privateAxios'
import publicAxios from '../../../utils/publicAxios'

//action to redirect
const resetCommentAction = createAction("comment/reset");
//create
export const createCommentAction = createAsyncThunk(
  "comment/create",
  async (comment, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await privateAxios.post(`/api/comments`,
        {
          description: comment?.description,
          postId: comment?.postId,
        });
      return data;
    } catch (error) {
      if (!error?.response) throw error
      let message = (error?.response?.data?.message) ? (error?.response?.data?.message) :(error?.response?.data)
      return rejectWithValue(message)
    }
  }
);
//create
export const fetchAllCommentsAction = createAsyncThunk(
  "comment/fetch-all",
  async (_, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await publicAxios.get(`/api/comments`);
      return data;
    } catch (error) {
      if (!error?.response) throw error
      let message = (error?.response?.data?.message) ? (error?.response?.data?.message) :(error?.response?.data)
      return rejectWithValue(message)
    }
  }
);
//delete
export const deleteCommentAction = createAsyncThunk(
  "comment/delete",
  async (commentId, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await privateAxios.delete(`api/comments/${commentId}`);
      return data;
    } catch (error) {
        if (!error?.response) throw error
        let message = (error?.response?.data?.message) ? (error?.response?.data?.message) :(error?.response?.data)
        return rejectWithValue(message)
    }
  }
);

//Update
export const updateCommentAction = createAsyncThunk(
  "comment/update",
  async (comment, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await privateAxios.put( `/api/comments/${comment?.id}`,
        { description: comment?.description });
      //dispatch
      dispatch(resetCommentAction());
      return data;
    } catch (error) {
        if (!error?.response) throw error
        let message = (error?.response?.data?.message) ? (error?.response?.data?.message) :(error?.response?.data)
        return rejectWithValue(message)
    }
  }
);

//fetch comment details
export const fetchCommentAction = createAsyncThunk(
  "comment/fetch-details",
  async (id, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await privateAxios.get(`/api/comments/${id}`);
      return data;
    } catch (error) {
        if (!error?.response) throw error
        let message = (error?.response?.data?.message) ? (error?.response?.data?.message) :(error?.response?.data)
        return rejectWithValue(message)
    }
  }
);
const commentSlices = createSlice({
  name: "comment",
  initialState: {},
  extraReducers: builder => {
    //create
    builder.addCase(createCommentAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(createCommentAction.fulfilled, (state, action) => {
      state.loading = false;
      state.commentCreated = action?.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(createCommentAction.rejected, (state, action) => {
      state.loading = false;
      state.commentCreated = undefined;
      state.appErr = action?.payload
      state.serverErr = action?.error?.message;
    });

    //delete
    builder.addCase(deleteCommentAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(deleteCommentAction.fulfilled, (state, action) => {
      state.loading = false;
      state.commentDeleted = action?.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(deleteCommentAction.rejected, (state, action) => {
      state.loading = false;
      state.commentDeleted = undefined;
      state.appErr = action?.payload
      state.serverErr = action?.error?.message;
    });

    //update
    builder.addCase(updateCommentAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(resetCommentAction, (state, action) => {
      state.isUpdate = true;
    });
    builder.addCase(updateCommentAction.fulfilled, (state, action) => {
      state.loading = false;
      state.commentUpdated = action?.payload;
      state.isUpdate = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(updateCommentAction.rejected, (state, action) => {
      state.loading = false;
      state.commentCreated = undefined;
      state.appErr = action?.payload
      state.serverErr = action?.error?.message;
    });

    //fetch details
    builder.addCase(fetchCommentAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchCommentAction.fulfilled, (state, action) => {
      state.loading = false;
      state.commentDetails = action?.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(fetchCommentAction.rejected, (state, action) => {
      state.loading = false;
      state.commentCreated = undefined;
      state.appErr = action?.payload
      state.serverErr = action?.error?.message;
    });
     //fetch all comments
     builder.addCase(fetchAllCommentsAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchAllCommentsAction.fulfilled, (state, action) => {
      state.loading = false;
      state.comments = action?.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(fetchAllCommentsAction.rejected, (state, action) => {
      state.loading = false;
      state.commentCreated = undefined;
      state.appErr = action?.payload
      state.serverErr = action?.error?.message;
    });
  },
});

export default commentSlices.reducer;
