import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const fetchUser = createAsyncThunk('/auth/fetchUser', async () => {
	const res = await axios.get('/api/current_user');
	return res.data;
});

export { fetchUser };
