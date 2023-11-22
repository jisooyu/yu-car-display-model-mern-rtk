import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const postData = createAsyncThunk('/vehicle/postData', async (dataToPost) => {
	try {
		const res = await axios.post('/car/save', dataToPost, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		});
		// save the message from /car/save
		const responseData = res.data;
		return responseData;
	} catch (error) {
		throw error;
	}
});

export { postData };
