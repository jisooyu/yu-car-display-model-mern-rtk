// store/thunks/editData.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const editData = createAsyncThunk(
	'/vehicle/editData',
	async ({ id, formDataObject }) => {
		try {
			const res = await axios.put(`/car/update/${id}`, formDataObject, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			});
			return res.data;
		} catch (error) {
			throw error;
		}
	}
);

export { editData };
