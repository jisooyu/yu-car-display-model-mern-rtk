import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteData } from '../store/thunks/deleteData';
import Button from '../components/Button';

function CarDetails({ data }) {
	const dispatch = useDispatch();
	const handleClick = (id) => {
		dispatch(deleteData(id));
	};
	const renderedCars = data.map((car) => {
		return (
			<div
				key={car._id}
				className='m-3 p-2 object-cover '
			>
				<div className='mt-2'>
					<h3 className='text-2xl'>{car.carMakerName}</h3>
					<h5>Model Name: {car.modelName}</h5>
					<p>Model Year: {car.modelYear}</p>
					{typeof car.maxPrice === 'number' && (
						<p>Price - upper range: $ {car.maxPrice.toLocaleString()}</p>
					)}
					{typeof car.minPrice === 'number' && (
						<p>Price - lower range: $ {car.minPrice.toLocaleString()}</p>
					)}
					{typeof car.mpg === 'number' && <p>MPG: {car.mpg} miles/gallon</p>}
					{typeof car.range === 'number' && (
						<p>EV Range: {car.range} miles/charge</p>
					)}
					<p>Model Engine: {car.engine}</p>
					<p>
						Options:
						{car.options.map((option, index) =>
							option !== '' ? (
								<span key={`${option}+${index}`}>{option}</span>
							) : (
								<span key={`${option}+${index}`}>N.A.</span>
							)
						)}
					</p>
					<div className='flex flex-row mt-2'>
						{car.s3ImageUrl.map((imageUrl, index) => (
							<img
								key={`${imageUrl}+${index}`}
								src={imageUrl}
								alt={`Car shot ${index + 1}`}
								className='h-72 w-84 m-2'
							/>
						))}
					</div>
				</div>
				<div className='flex flex-row mt-4'>
					<Button
						className='mr-3'
						rounded
						primary
					>
						<Link
							to={`/edit/${car._id}`}
							// className='px-4 py-2 border rounded-full w-20  bg-blue-500 text-white'
						>
							Edit
						</Link>
					</Button>
					<Button
						onClick={() => handleClick(car._id)}
						rounded
						danger
					>
						Delete
					</Button>
				</div>
			</div>
		);
	});

	return <div className='m-3 border rounded'>{renderedCars}</div>;
}

export default CarDetails;
