function CarDetails({ data }) {
	// console.log('car from CarDetails', data);

	const renderedCars = data.map((car) => {
		console.log('car is ', car);
		return (
			<div
				key={car._id}
				className='m-3 p-2'
			>
				<h3 className='text-2xl'>{car.carMakerName}</h3>
				<h5>Model Name: {car.modelName}</h5>
				<p>Model Year: {car.modelYear}</p>
				<p>Model Engine: {car.engine}</p>
			</div>
		);
	});

	return <div className='m-3 border rounded'>{renderedCars}</div>;
}
export default CarDetails;
