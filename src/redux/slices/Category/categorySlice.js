import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import categoryService from './categoryService'

// Create Action
export const createCategory = createAsyncThunk("category/create",
    async (category, { rejectWithValue, getState, dispatch }) => {
        try {
            return await categoryService.create(category)
        } catch (error) {
            if (!error?.response) throw error
            return rejectWithValue(error?.response?.data)
        }
    })
//fetch All Categories action
export const fetchAllCategories = createAsyncThunk("category/fetchall",
    async (nothing, { rejectWithValue, getState, dispatch }) => {
        try {
            return await categoryService.fetchAll()
        } catch (error) {
            if (!error?.response) throw error
            return rejectWithValue(error?.response?.data)
        }
    })
//Fetching single category Action
export const fetchCategory = createAsyncThunk("category/fetch",
    async (id, { rejectWithValue, getState, dispatch }) => {
        try {
            return await categoryService.fetchDetails(id)
        } catch (error) {
            if (!error?.response) throw error
            return rejectWithValue(error?.response?.data)
        }
    })
//Update category Action
export const updateCategory = createAsyncThunk("category/update",
    async (data, { rejectWithValue, getState, dispatch }) => {
        try {
            return await categoryService.update(data)
        } catch (error) {
            if (!error?.response) throw error
            return rejectWithValue(error?.response?.data)
        }
    })
//Delete category Action
export const deleteCategory = createAsyncThunk("category/delete",
    async (id, { rejectWithValue, getState, dispatch }) => {
        try {
            return await categoryService.deleteCategory(id)
        } catch (error) {
            if (!error?.response) throw error
            return rejectWithValue(error?.response?.data)
        }
    })
// initial state of categories
const initialState = {
    // categoryList: [],
    // category:"",
    // updatedCategory:"",
    // appErr: false,
    // serverErr: false,
    // isSuccess: false,
    // loading: false,
  }
  

//Slices
const categorySlices = createSlice({
    name: "category",
    initialState,
    reducers:{
        reset:(state) => {}
    },
    extraReducers: (builder) => {
        builder
            //create a new category
            .addCase(createCategory.pending, (state, action) => {
                state.loading = true
            })
            .addCase(createCategory.fulfilled, (state, action) => {
                state.loading = false
                state.isSuccess = true
                state.category = action.payload
                state.appErr = undefined
                state.serverErr = undefined
            })
            .addCase(createCategory.rejected, (state, action) => {
                state.loading = false
                state.category = undefined
                state.appErr = action.payload.message
                state.serverErr = action.error.message

            })
            //fetch All Categories
            .addCase(fetchAllCategories.pending, (state, action) => {
                state.loading = true
            })
            .addCase(fetchAllCategories.fulfilled, (state, action) => {
                state.loading = false
                state.isSuccess = true
                state.categoryList = action.payload
                state.appErr = undefined
                state.serverErr = undefined
            })
            .addCase(fetchAllCategories.rejected, (state, action) => {
                state.loading = false
                state.categoryList = undefined
                state.appErr = action?.payload?.message
                state.serverErr = action?.error?.message
            })
            //fetch single Category
            .addCase(fetchCategory.pending, (state, action) => {
                state.loading = true
            })
            .addCase(fetchCategory.fulfilled, (state, action) => {
                state.loading = false
                state.isSuccess = true
                state.category = action.payload
                state.appErr = undefined
                state.serverErr = undefined
            })
            .addCase(fetchCategory.rejected, (state, action) => {
                state.loading = false
                state.category = undefined
                state.appErr = action.payload.message
                state.serverErr = action.error.message
            })
            //update category
            .addCase(updateCategory.pending, (state, action) => {
                state.loading = true
            })
            .addCase(updateCategory.fulfilled, (state, action) => {
                state.loading = false
                state.isSuccess = true
                state.updatedCategory = action.payload
                state.appErr = undefined
                state.serverErr = undefined
            })
            .addCase(updateCategory.rejected, (state, action) => {
                state.loading = false
                state.updatedCategory = undefined
                state.appErr = action.payload.message
                state.serverErr = action.error.message
            })
            //delete category
            .addCase(deleteCategory.pending, (state, action) => {
                state.loading = true
            })
            .addCase(deleteCategory.fulfilled, (state, action) => {
                state.loading = false
                state.isSuccess = true
                state.categoryList = state.categoryList.filter(
                    (category) => category._id !== action.payload._id
                  )
                state.appErr = undefined
                state.serverErr = undefined
            })
            .addCase(deleteCategory.rejected, (state, action) => {
                state.loading = false
                state.deletedCategory = undefined
                state.appErr = action.payload.message
                state.serverErr = action.error.message
            })
    }
})
export const { reset } = categorySlices.actions
export default categorySlices.reducer