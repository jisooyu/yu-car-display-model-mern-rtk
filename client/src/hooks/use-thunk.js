import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';

export function useThunk(thunk) {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	const dispatch = useDispatch();

	const runThunk = useCallback(
		(arg) => {
			setIsLoading(true);
			dispatch(thunk(arg))
				.unwrap()
				.catch((err) => setError(err))
				.finally(() => setIsLoading(false));
			// eslint-disable-next-line react-hooks/exhaustive-deps
		},
		[dispatch, thunk]
	);

	return [runThunk, isLoading, error];
}
