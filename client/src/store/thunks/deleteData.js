import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const deleteData = createAsyncThunk('/vehicle/deleteData', async (id) => {
	try {
		const res = await axios.delete(`/car/delete/${id}`);
		return res.data;
	} catch (error) {
		throw error;
	}
});

export { deleteData };
