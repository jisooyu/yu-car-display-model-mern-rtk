import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function CarForm() {
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		carMakerName: '',
		modelYear: 0,
		modelName: '',
		engine: '',
		options: [],
		imageFiles: [],
	});

	const handleImage = async (e) => {
		const files = e.target.files;
		setFormData((prevFormData) => ({
			...prevFormData,
			imageFiles: [...(prevFormData.imageFiles || []), ...files],
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

	const handleSubmit = async (e) => {
		e.preventDefault();
		const formDataObject = new FormData();
		formDataObject.append('carMakerName', formData.carMakerName);
		formDataObject.append('modelYear', formData.modelYear);
		formDataObject.append('modelName', formData.modelName);
		formDataObject.append('engine', formData.engine);
		formDataObject.append('options', formData.options.join(','));

		// Check if an image file is selected before appending it to FormData
		if (formData.imageFiles) {
			for (let i = 0; i < formData.imageFiles.length; i++) {
				formDataObject.append('imageFiles', formData.imageFiles[i]);
			}
		}
		try {
			const response = await axios.post('/car/save', formDataObject, {
				headers: {
					'Content-Type': 'multipart/form-data', // Set Content-Type to multipart/form-data
				},
			});

			if (response.status === 200) {
				navigate('/dashboard');
			} else {
				console.error(response.data);
			}
		} catch (error) {
			console.error(error);
		}
	};
	return (
		<div className='container mx-auto flex flex-col items-center'>
			<form
				onSubmit={handleSubmit}
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

				{/* Input for options */}

				<div className='mb-4'>
					<label
						className='block text-gray-700 text-sm font-bold mb-2'
						htmlFor='options'
					>
						옵션
					</label>
					<input
						className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
						type='text'
						id='options'
						name='options'
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

				<button
					type='submit'
					className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
				>
					Submit
				</button>
			</form>
		</div>
	);
}

export default CarForm;
