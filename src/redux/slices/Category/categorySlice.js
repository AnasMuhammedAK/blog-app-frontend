import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import categoryService from './categoryService'

//Action
export const createCategory = createAsyncThunk("category/create",
    async (category, { rejectWithValue, getState, dispatch }) => {
        try {
            return await categoryService.create(category)
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString()
            return rejectWithValue(message)
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
    }
})

export default categorySlices.reducer