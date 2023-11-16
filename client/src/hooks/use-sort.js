import { useState } from 'react';

function useSort(data, config) {
	const [sortOrder, setSortOrder] = useState(null);
	const [sortBasis, setSortBasis] = useState(null);

	const setSortColumn = (label) => {
		if (sortBasis && label !== sortBasis) {
			setSortOrder('asc');
			setSortBasis(label);
			return;
		}

		if (sortOrder === null) {
			setSortOrder('asc');
			setSortBasis(label);
		} else if (sortOrder === 'asc') {
			setSortOrder('desc');
			setSortBasis(label);
		} else if (sortOrder === 'desc') {
			setSortOrder(null);
			setSortBasis(null);
		}
	};

	// Only sort data if sortOrder && sortBasis are not null
	// Make a copy of the 'data' prop
	// Find the correct sortValue function and use it for sorting
	let sortedData = data;
	if (sortOrder && sortBasis) {
		const { sortValue } = config.find((column) => column.label === sortBasis);
		sortedData = [...data].sort((a, b) => {
			const valueA = sortValue(a);
			const valueB = sortValue(b);

			const reverseOrder = sortOrder === 'asc' ? 1 : -1;

			if (typeof valueA === 'string') {
				return valueA.localeCompare(valueB) * reverseOrder;
			} else {
				return (valueA - valueB) * reverseOrder;
			}
		});
	}

	return {
		sortOrder,
		sortBasis,
		sortedData,
		setSortColumn,
	};
}

export default useSort;
