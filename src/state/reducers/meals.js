const initialState = {
	meals: null,
	loading: false,
	isModalOpen: false,
	current: null,
	error: null,
	consumed: null
};

export default (state = initialState, action) => {
	switch (action.type) {
		case 'GET_MEALS':
			return {
				...state,
				meals: action.payload,
				loading: false
			};

		case 'GET_CONSUMED':
			return {
				...state,
				consumed: action.payload,
				loading: false
			};

		case 'ADD_MEAL':
			return {
				...state,
				meals: [...state.meals, action.payload],
				loading: false
			};

		case 'UPDATE_MEAL':
			return {
				...state,
				meals: state.meals.map(meal =>
					meal._id === action.payload._id ? action.payload : meal
				),
				loading: false
			};

		case 'DELETE_MEAL':
			return {
				...state,
				meals: state.meals.filter(meal => meal._id !== action.payload),
				loading: false
			};

		case 'SET_LOADING':
			return {
				...state,
				loading: true
			};

		case 'MEALS_ERROR':
			return {
				...state,
				error: action.payload,
				loading: false
			};

		case 'SET_CURRENT':
			return {
				...state,
				current: action.payload
			};

		case 'CLEAR_CURRENT':
			return {
				...state,
				current: null
			};

		case 'OPEN_MODAL':
			return {
				...state,
				isModalOpen: true
			};

		case 'CLOSE_MODAL':
			return {
				...state,
				isModalOpen: false
			};

		case 'CLEAR_DATA':
			return initialState;

		default:
			return state;
	}
};
