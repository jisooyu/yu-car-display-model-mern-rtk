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
