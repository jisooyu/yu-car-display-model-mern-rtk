import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import GoogleLogoutButton from '../components/Auth/GoogleLogoutButton';
import Skeleton from '../components/Skeleton';
import Button from '../components/Button';
// import CarPage from './CarPage';
import { useThunk } from '../hooks/use-thunk';
import { fetchData } from '../store';
import CarDetails from './CarDetails';

const Dashboard = () => {
	const [doFetchData, isLoadingData, loadingDataError] = useThunk(fetchData);
	const { data } = useSelector((state) => {
		return state.car;
	});

	const { user } = useSelector((state) => {
		return state.auth;
	});
	const navigate = useNavigate();
	useEffect(() => {
		// Check Redux store for existing data before triggering a new fetch
		if (!data.length) {
			doFetchData();
		}
	}, [doFetchData, data]);

	let content;
	if (isLoadingData) {
		content = (
			<Skeleton
				times={6}
				className='h-10 w-full'
			/>
		);
	} else if (loadingDataError) {
		content = <div>Error fetching data:{loadingDataError.message}</div>;
	}
	return (
		<>
			<div className='h-20 w-auto flex flex-row justify-between items-center bg-blue-400'>
				<Button
					onClick={() => navigate(user ? '/form' : '/')}
					className='ml-3 text-yellow-300'
					rounded
					danger
				>
					Create Car Data
				</Button>
				<h1 className='m-5 text-gray-100'>Car Safety Data</h1>
				{content}
				<GoogleLogoutButton />
			</div>

			<div>
				{/* <CarPage data={data} /> */}
				<CarDetails data={data} />
			</div>
		</>
	);
};

export default Dashboard;
