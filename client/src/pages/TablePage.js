import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import SortableTable from '../components/SortableTable';

function TablePage() {
	const [dataToSort, setDataToSort] = useState([]);

	const { data } = useSelector((state) => {
		return state.safety;
	});

	const processSafetyData = (data) => {
		// console.log('data from processSafetyData', data);
		const newData = [];

		data.forEach((car) => {
			car.models.forEach((model) => {
				model.safeties.forEach((safety) => {
					newData.push({
						carMakerName: car.carMakerName,
						modelName: model.modelName,
						year: model.modelYear,
						award: safety.award,
						rank: safety.rank,
						score: safety.score,
						id: model._id,
					});
				});
			});
		});
		// console.log('newData', newData);
		return newData;
	};

	useEffect(() => {
		const modifiedData = processSafetyData(data);
		setDataToSort(modifiedData);
	}, [data]);

	const config = [
		{
			label: 'Car Maker',
			render: (car) => car.carMakerName,
			sortValue: (car) => car.carMakerName,
		},
		{
			label: 'Model',
			render: (car) => car.modelName,
			sortValue: (car) => car.modelName,
		},
		{
			label: 'Year',
			render: (car) => car.year,
		},
		{
			label: 'Award',
			render: (car) => car.award,
		},
		{
			label: 'Rank',
			render: (car) => car.rank,
		},
		{
			label: 'Score',
			render: (car) => car.score,
			sortValue: (car) => car.score,
		},
	];

	const keyFn = (car) => {
		return car.label;
	};

	return (
		<div>
			<SortableTable
				data={dataToSort}
				config={config}
				keyFn={keyFn}
			/>
		</div>
	);
}

export default TablePage;
