import axios from 'axios';
import setAuthToken from '../../utils/setAuthToken';

export const loadUser = () => async dispatch => {
	try {
		const { data } = await axios.get('/api/v1/auth');

		dispatch({ type: 'LOAD_USER', payload: data.data });
	} catch (err) {
		dispatch({ type: 'AUTH_ERROR', payload: err.response.data.error });
		dispatch(clearError());
	}
};

export const register = user => async dispatch => {
	try {
		const { data } = await axios.post('/api/v1/auth/register', user);

		dispatch({ type: 'SET_TOKEN', payload: data.token });
		setAuthToken(data.token);

		dispatch(clearError());

		dispatch(loadUser());
	} catch (err) {
		dispatch({ type: 'AUTH_ERROR', payload: err.response.data.error });
	}
};

export const login = user => async dispatch => {
	try {
		clearError();
		const { data } = await axios.post('/api/v1/auth/login', user);

		dispatch({ type: 'SET_TOKEN', payload: data.token });
		setAuthToken(data.token);

		dispatch(clearError());

		dispatch(loadUser());
	} catch (err) {
		dispatch({ type: 'AUTH_ERROR', payload: err.response.data.error });
	}
};

export const logout = () => ({ type: 'LOGOUT' });

export const clearError = () => ({ type: 'CLEAR_ERROR' });
