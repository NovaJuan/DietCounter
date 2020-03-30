const initialState = {
	token: localStorage.getItem('dietcounter-token') || null,
	user: null,
	error: null,
	loading: true
};

export default (state = initialState, action) => {
	switch (action.type) {
		case 'SET_TOKEN':
			localStorage.setItem('dietcounter-token', action.payload);
			return {
				...state,
				token: action.payload
			};

		case 'LOAD_USER':
			return {
				...state,
				user: action.payload,
				error: null,
				loading: false
			};

		case 'LOGOUT':
			localStorage.removeItem('dietcounter-token');
			return {
				...state,
				token: null,
				user: null,
				loading: false
			};

		case 'AUTH_ERROR':
			localStorage.removeItem('dietcounter-token');
			return {
				...state,
				token: null,
				user: null,
				error: action.payload,
				loading: false
			};

		case 'CLEAR_ERROR':
			return {
				...state,
				error: null
			};

		default:
			return state;
	}
};
