import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const fetchData = createAsyncThunk('/vehicle/fetchData', async () => {
	try {
		const res = await axios.get('/car/fetch');
		return res.data;
	} catch (error) {
		throw error;
	}
});

export { fetchData };
