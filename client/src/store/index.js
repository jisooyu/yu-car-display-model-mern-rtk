import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './slices/authSlice';
import { carReducer } from './slices/carSlice';

export const store = configureStore({
	reducer: {
		auth: authReducer,
		car: carReducer,
	},
});

export * from './thunks/fetchUser';
export * from './thunks/fetchData';
export * from './thunks/postData';
export * from './thunks/editData';
export * from './thunks/fetchDataById';
export * from './thunks/deleteData';
