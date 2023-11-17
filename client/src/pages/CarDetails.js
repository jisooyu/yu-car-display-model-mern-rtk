function CarDetails({ data }) {
	const renderedCars = data.map((car) => {
		return (
			<div
				key={car._id}
				className='m-3 p-2 object-cover '
			>
				<h3 className='text-2xl'>{car.carMakerName}</h3>
				<h5>Model Name: {car.modelName}</h5>
				<p>Model Year: {car.modelYear}</p>
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
				<div>
					{car.s3ImageUrl.map((imageUrl, index) => (
						<img
							key={`${imageUrl}+${index}`}
							src={imageUrl}
							alt={`Car shot ${index + 1}`}
							className='w-full h-100 mt-2 mb-2'
						/>
					))}
				</div>
			</div>
		);
	});

	return <div className='m-3 border rounded'>{renderedCars}</div>;
}

export default CarDetails;
