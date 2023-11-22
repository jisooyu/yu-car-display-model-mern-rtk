import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const fetchDataById = createAsyncThunk('/vehicle/fetchDataById', async (id) => {
	try {
		const res = await axios.get(`/car/fetchDataById/${id}`);
		return res.data;
	} catch (error) {
		throw error;
	}
});

export { fetchDataById };
