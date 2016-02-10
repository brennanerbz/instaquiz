import request from 'superagent';

export const FETCH_ITEMS = 'Instaquiz/quiz/FETCH_ITEMS';
export const FETCH_ITEMS_SUCCESS = 'Instaquiz/quiz/FETCH_ITEMS_SUCCESS';
export const FETCH_ITEMS_FAILURE = 'Instaquiz/quiz/FETCH_ITEMS_FAILURE';

const initialState = {
	start: 0,
	items: [],
	loaded: false,
	error: null
}

export default function reducer (state = initialState, action) {
	var { items } = state;

	switch(action.type) {
		case FETCH_ITEMS:
			return {
				...state
			}
		case FETCH_ITEMS_SUCCESS:
			return {
				...state,
				items: [...action.result.items],
				loaded: action.result.loaded,
				start: state.start + action.result.count
			}
		case FETCH_ITEMS_FAILURE:
			return {
				...state,
				loaded: false,
				error: action.error
			}
		default:		
			return {
				...state
			}
	}
}

export function fetchItems(title, start) {
	return {
		types: [FETCH_ITEMS, FETCH_ITEMS_SUCCESS, FETCH_ITEMS_FAILURE],
		promise: (client) => client.get(`/items/?start=${start}`, {
			title: title
		})
	}
}