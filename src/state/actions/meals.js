import axios from 'axios';

export const getMeals = () => async dispatch => {
	setLoading();

	try {
		const { data } = await axios.get('/api/v1/meal/user');

		dispatch({ type: 'GET_MEALS', payload: data.data });
	} catch (err) {
		dispatch({ type: 'MEALS_ERROR', payload: err.response.data.error });
	}
};

export const getConsumed = () => async dispatch => {
	setLoading();

	try {
		const { data } = await axios.get('/api/v1/meal/consumed');

		dispatch({ type: 'GET_CONSUMED', payload: data.data });
	} catch (err) {
		dispatch({ type: 'MEALS_ERROR', payload: err.response.data.error });
	}
};

export const addMeal = meal => async dispatch => {
	try {
		const { data } = await axios.post(`/api/v1/meal/${meal.foodid}`, meal, {
			headers: { 'content-type': 'application/json' }
		});
		dispatch({ type: 'ADD_MEAL', payload: data.data });
		dispatch(getConsumed());
	} catch (err) {
		dispatch({ type: 'MEALS_ERROR', payload: err.response.data.error });
	}
};

export const updateMeal = meal => async dispatch => {
	try {
		const { data } = await axios.put(`/api/v1/meal/${meal._id}`, meal, {
			headers: { 'content-type': 'application/json' }
		});
		dispatch({ type: 'UPDATE_MEAL', payload: data.data });
		dispatch(getConsumed());
	} catch (err) {
		dispatch({ type: 'MEALS_ERROR', payload: err.response.data.error });
	}
};

export const deleteMeal = id => async dispatch => {
	try {
		await axios.delete(`/api/v1/meal/${id}`);
		dispatch({ type: 'DELETE_MEAL', payload: id });
		dispatch(getConsumed());
	} catch (err) {
		dispatch({ type: 'MEALS_ERROR', payload: err.response.data.error });
	}
};

export const setCurrent = meal => ({ type: 'SET_CURRENT', payload: meal });
export const clearCurrent = () => ({ type: 'CLEAR_CURRENT' });

export const setLoading = () => ({ type: 'SET_LOADING' });

export const openModal = () => ({ type: 'OPEN_MODAL' });
export const closeModal = () => ({ type: 'CLOSE_MODAL' });

export const clearData = () => ({ type: 'CLEAR_DATA' });
