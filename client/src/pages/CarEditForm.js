// CarEditForm.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useThunk } from '../hooks/use-thunk';
import { editData, fetchData, fetchDataById } from '../store'; // Create an editData thunk and fetchDataById thunk
import Button from '../components/Button';
import Skeleton from '../components/Skeleton';

function CarEditForm() {
	const { id } = useParams();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [runFetchData, isFetchDataLoading, fetchDataError] =
		useThunk(fetchData);
	const [runEditData, , editDataError] = useThunk(editData);
	const [, setSelectedCarData] = useState({
		carMakerName: '',
		modelYear: 0,
		modelName: '',
		engine: '',
		minPrice: 0,
		maxPrice: 0,
		mpg: 0,
		range: 0,
		options: [],
		s3ImageUrl: [],
	});

	const [formData, setFormData] = useState({
		carMakerName: '',
		modelYear: 0,
		modelName: '',
		engine: '',
		minPrice: 0,
		maxPrice: 0,
		mpg: 0,
		range: 0,
		options: [],
		imageFiles: [],
	});

	useEffect(() => {
		// Function to fetch data by ID
		const getDataById = async () => {
			try {
				const response = await dispatch(fetchDataById(id));
				const carData = response.payload;
				setSelectedCarData({
					carMakerName: carData.carMakerName,
					modelYear: carData.modelYear,
					modelName: carData.modelName,
					engine: carData.engine,
					minPrice: carData.minPrice,
					maxPrice: carData.maxPrice,
					mpg: carData.mpg,
					range: carData.range,
					options: carData.options,
					s3ImageUrl: carData.s3ImageUrl,
				});
				// Example: Set formData based on the fetched data
				setFormData({
					carMakerName: carData.carMakerName,
					modelYear: carData.modelYear,
					modelName: carData.modelName,
					engine: carData.engine,
					minPrice: carData.minPrice,
					maxPrice: carData.maxPrice,
					mpg: carData.mpg,
					range: carData.range,
					options: carData.options,
					imageFiles: carData.imageFiles,
				});
			} catch (error) {
				console.error('Error fetching data by ID:', error);
			}
		};

		// Call the getDataById function to initiate the data fetching
		getDataById();
		// }, [doFetchDataById, id]);
	}, [dispatch, id]);

	const handleImage = async (e) => {
		const files = e.target.files;
		setFormData((prevFiles) => ({
			...prevFiles,
			imageFiles: [...(prevFiles.imageFiles || []), ...files],
		}));
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleArrayChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value.split(',') });
	};

	const handleEditSubmit = async (e) => {
		e.preventDefault();
		const formDataObject = new FormData();
		formDataObject.append('carMakerName', formData.carMakerName);
		formDataObject.append('modelYear', formData.modelYear);
		formDataObject.append('modelName', formData.modelName);
		formDataObject.append('engine', formData.engine);
		formDataObject.append('maxPrice', formData.maxPrice);
		formDataObject.append('minPrice', formData.minPrice);
		formDataObject.append('mpg', formData.mpg);
		formDataObject.append('range', formData.range);
		formDataObject.append('options', formData.options.join(','));

		// Check if an image file is selected before appending it to FormData
		if (formData.imageFiles) {
			for (let i = 0; i < formData.imageFiles.length; i++) {
				formDataObject.append(
					'imageFiles',
					formData.imageFiles[i],
					formData.imageFiles[i].name
				);
			}
		}

		try {
			runEditData({ id, formDataObject });
			if (editDataError) {
				console.error(editDataError);
				return;
			}
			runFetchData();
			if (fetchDataError) {
				console.error(fetchDataError);
				return;
			}
			navigate('/dashboard');
		} catch (error) {
			console.error('Error in editData thunk:', error);
		}
	};

	return (
		<div className='container mx-auto flex flex-col items-center'>
			<h1 className='m-5'>자동차 정보 입력 양식</h1>
			<form
				onSubmit={handleEditSubmit}
				className='w-full max-w-lg'
			>
				<div className='mb-4'>
					<label
						className='block text-gray-700 text-sm font-bold mb-2'
						htmlFor='carMakerName'
					>
						자동차 회사
					</label>
					<input
						className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
						type='text'
						id='carMakerName'
						name='carMakerName'
						value={formData.carMakerName}
						onChange={handleChange}
						placeholder='Car Maker Name'
					/>
				</div>

				{/* Repeat the above input field pattern for other form fields */}

				<div className='mb-4'>
					<label
						className='block text-gray-700 text-sm font-bold mb-2'
						htmlFor='modelYear'
					>
						연도
					</label>
					<input
						className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
						type='number'
						id='modelYear'
						name='modelYear'
						value={formData.modelYear}
						onChange={handleChange}
						placeholder='Model Year'
					/>
				</div>

				<div className='mb-4'>
					<label
						className='block text-gray-700 text-sm font-bold mb-2'
						htmlFor='modelName'
					>
						모델명
					</label>
					<input
						className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
						type='text'
						id='modelName'
						name='modelName'
						value={formData.modelName}
						onChange={handleChange}
						placeholder='Model Name'
					/>
				</div>

				{/* Input for engines */}

				<div className='mb-4'>
					<label
						className='block text-gray-700 text-sm font-bold mb-2'
						htmlFor='engine'
					>
						엔진
					</label>
					<input
						className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
						type='text'
						id='engine'
						name='engine'
						value={formData.engine}
						onChange={handleChange}
						placeholder='Engine Names'
					/>
				</div>

				{/*  input for price range*/}

				<div className='mb-4'>
					<label className='block text-gray-700 text-sm font-bold mb-2'>
						최저가격 ($)
					</label>
					<input
						className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
						type='number'
						id='minPrice'
						name='minPrice'
						value={formData.minPrice}
						onChange={handleChange}
						placeholder='Lower Price'
					/>
				</div>
				<div className='mb-4'>
					<label className='block text-gray-700 text-sm font-bold mb-2'>
						최고가격 ($)
					</label>
					<input
						className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
						type='number'
						id='maxPrice'
						name='maxPrice'
						value={formData.maxPrice}
						onChange={handleChange}
						placeholder='Upper Price'
					/>
				</div>

				{/* input for mpg*/}
				<div className='mb-4'>
					<label className='block text-gray-700 text-sm font-bold mb-2'>
						MPG
					</label>
					<input
						className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
						type='number'
						id='mpg'
						name='mpg'
						value={formData.mpg}
						onChange={handleChange}
						placeholder='miles per gallon'
					/>
				</div>

				{/* input driving range*/}
				<div className='mb-4'>
					<label className='block text-gray-700 text-sm font-bold mb-2'>
						EV Range
					</label>
					<input
						className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
						type='number'
						id='range'
						name='range'
						value={formData.range}
						onChange={handleChange}
						placeholder='miles per charge'
					/>
				</div>
				{/* Input for options */}

				<div className='mb-4'>
					<label className='block text-gray-700 text-sm font-bold mb-2'>
						옵션
					</label>
					<textarea
						className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
						type='text'
						id='options'
						name='options'
						rows='7'
						value={formData.options.join(',')}
						onChange={handleArrayChange}
						placeholder='Option Names (comma-separated)'
					/>
				</div>

				<div className='mb-4'>
					<label
						className='block text-gray-700 text-sm font-bold mb-2'
						htmlFor='imageFiles'
					>
						Upload Images
					</label>
					<input
						className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
						type='file'
						id='imageFiles'
						name='imageFiles'
						accept='image/jpeg, image/jp,image/jpg, image/png'
						onChange={handleImage}
					/>
				</div>
				<div className='flex flex-row'>
					<Button
						type='submit'
						className='bg-blue-500 hover:bg-blue-700 text-white'
						rounded
						primary
					>
						{isFetchDataLoading ? <Skeleton /> : 'Submit'}
					</Button>
					<Button
						type='submit'
						className='bg-blue-500 hover:bg-blue-700 text-white ml-5'
						rounded
						danger
						onClick={() => navigate('/dashboard')}
					>
						Cancel
					</Button>
				</div>
			</form>
		</div>
	);
}

export default CarEditForm;
