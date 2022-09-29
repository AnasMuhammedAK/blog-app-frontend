import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
import privateAxios from '../../../utils/privateAxios'

// custom action for redirect
const resetEmailAction = createAction("mail/reset");
//ACTIONS
export const sendMailAction = createAsyncThunk('mail/sent', 
async (email, { rejectWithValue, getState, dispatch }) => {
	try {
		const { data } = await privateAxios.post(`/api/email`, {
			to: email?.recipientEmail,
			subject: email?.subject,
			message: email?.message
		})
		// dispatch
		dispatch(resetEmailAction())
		return data;
	} catch (error) {
		if (!error?.response) {
			throw error;
		}
		return rejectWithValue(error?.response?.data)
	}

})



const sendMailSlices = createSlice({
	name: "mail",
	initialState: {},
	extraReducers: (builder) => {
		builder.addCase(sendMailAction.pending, (state, action) => {
			state.loading = true;
		})
		// dispatch redirect action
	    builder.addCase(resetEmailAction, (state, action) => {
			state.isMailSent = true;
		});
		builder.addCase(sendMailAction.fulfilled, (state, action) => {
			state.mailSent = action?.payload;
			state.isMailSent = false;
			state.loading = false;
			state.appErr = undefined;
			state.serverErr = undefined;
		});
		builder.addCase(sendMailAction.rejected, (state, action) => {
			state.loading = false;
			state.appErr = action?.payload?.message;
			state.serverErr = action?.error?.message
		})
	}
})

export default sendMailSlices.reducer