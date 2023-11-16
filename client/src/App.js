import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { fetchUser } from './store';
import CarPage from './pages/CarPage';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import CarForm from './pages/CarForm';

function App() {
	// const [doFetchUser, isLoadingUser, loadingUserError] = useThunk(fetchUser);

	// useEffect(() => {
	// 	doFetchUser();
	// }, [doFetchUser]);

	const dispatch = useDispatch();
	useEffect(() => {
		// Dispatch the fetchData action directly
		dispatch(fetchUser());
	}, [dispatch]);

	return (
		<>
			<Routes>
				<Route
					path='/'
					element={<Home />}
				/>
				<Route
					path='/dashboard'
					element={<Dashboard />}
				/>
				<Route
					path='/form'
					element={<CarForm />}
				/>

				<Route
					path='/raw'
					element={<CarPage />}
				/>
			</Routes>
		</>
	);
}

export default App;
