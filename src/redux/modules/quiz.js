import request from 'superagent';

export const FETCH_ITEMS = 'Instaquiz/quiz/FETCH_ITEMS';
export const FETCH_ITEMS_SUCCESS = 'Instaquiz/quiz/FETCH_ITEMS_SUCCESS';
export const FETCH_ITEMS_FAILURE = 'Instaquiz/quiz/FETCH_ITEMS_FAILURE';
export const CLEAR_QUIZ = 'Instaquiz/quiz/CLEAR_QUIZ';

const initialState = {
	start: 0,
	end: 0,
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
			items = [...items, ...action.result.items]
			return {
				...state,
				items: items,
				loaded: items.length === state.end,
				start: state.start + action.result.items.length,
				end: action.result.count
			}
		case FETCH_ITEMS_FAILURE:
			return {
				...state,
				loaded: false,
				error: action.error
			}
		case CLEAR_QUIZ:
			return {
				...state = initialState,
				items: [],
				start: 0,
				end: 0
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

export function clearQuiz() {
	return {
		type: CLEAR_QUIZ
	}
}