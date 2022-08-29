import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import categoryService from './categoryService'

//Action
export const createCategory = createAsyncThunk("category/create",
    async (category, { rejectWithValue, getState, dispatch }) => {
        try {
            return await categoryService.create(category)
        } catch (error) {
            if (!error?.response) throw error
            return rejectWithValue(error?.response?.data)
        }
    })
    export const fetchAllCategories = createAsyncThunk("category/fetchall",
    async (nothing, { rejectWithValue, getState, dispatch }) => {
        try {
            return await categoryService.fetchAll()
        } catch (error) {
            if (!error?.response) throw error
            return rejectWithValue(error?.response?.data)
        }
    })

const initialState = {

}

//Slices
const categorySlices = createSlice({
    name: "category",
    initialState,
    extraReducers: (builder) => {
        builder
        //create a new category
            .addCase(createCategory.pending, (state, action) => {
                state.loading = true
            })
            .addCase(createCategory.fulfilled, (state, action) => {
                state.loading = false
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
                state.categoryList = action.payload
                state.appErr = undefined
                state.serverErr = undefined
            })
            .addCase(fetchAllCategories.rejected, (state, action) => {
                state.loading = false
                state.categoryList = undefined
                state.appErr = action.payload.message
                state.serverErr = action.error.message
            })
    }
})

export default categorySlices.reducer