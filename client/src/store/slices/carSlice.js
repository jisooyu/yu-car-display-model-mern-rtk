import { createSlice, current } from '@reduxjs/toolkit';
import { fetchData } from '../thunks/fetchData';
import { postData } from '../thunks/postData';
import { editData } from '../thunks/editData';
import { fetchDataById } from '../thunks/fetchDataById';
import { deleteData } from '../thunks/deleteData';

const carSlice = createSlice({
	name: 'vehicle',
	initialState: {
		data: [],
		isLoading: false,
		error: null,
		successMessage: null,
		selectedCarData: null,
	},
	extraReducers(builder) {
		// handle fetch  data
		builder.addCase(fetchData.pending, (state, action) => {
			state.isLoading = true;
		});
		builder.addCase(fetchData.fulfilled, (state, action) => {
			state.isLoading = false;
			state.data = action.payload;
		});
		builder.addCase(fetchData.rejected, (state, action) => {
			state.isLoading = false;
			state.error = action.error.message; // Log the error message
		});

		// handle post data
		builder.addCase(postData.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(postData.fulfilled, (state, action) => {
			state.isLoading = false;
			// Add the newly posted data to state.data
			state.data = [...state.data, action.payload];
		});
		builder.addCase(postData.rejected, (state, action) => {
			state.isLoading = false;
			state.error = action.error.message; // Log the error message
		});

		// handle  fetch data by id
		// Add the case for fetchDataById
		builder.addCase(fetchDataById.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(fetchDataById.fulfilled, (state, action) => {
			state.isLoading = false;
			state.selectedCarData = action.payload;
		});
		builder.addCase(fetchDataById.rejected, (state, action) => {
			state.isLoading = false;
			state.error = action.error.message; // Log the error message
		});

		// handle  edit data
		// Add the case for editData
		builder.addCase(editData.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(editData.fulfilled, (state, action) => {
			state.isLoading = false;
			const editedData = action.payload;
			state.data = state.data.map((car) => {
				console.log('car', current(car));
				return car._id === editedData._id ? { ...car, ...editedData } : car;
			});
		});
		builder.addCase(editData.rejected, (state, action) => {
			state.isLoading = false;
			state.error = action.error.message; // Log the error message
		});

		// delete data
		builder.addCase(deleteData.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(deleteData.fulfilled, (state, action) => {
			state.isLoading = false;
			state.data = state.data.filter((item) => item.id !== action.payload.id);
		});
		builder.addCase(deleteData.rejected, (state, action) => {
			state.isLoading = false;
			state.error = action.error.message; // Log the error message
		});
	},
});
export const carReducer = carSlice.reducer;
