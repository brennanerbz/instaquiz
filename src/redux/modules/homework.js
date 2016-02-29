import cookie from 'react-cookie';

export const SET_ROUTE_TOKEN = 'NightlyCode/homework/SET_ROUTE_TOKEN';

export const NEW_SEQUENCE = 'NightlyCode/homework/NEW_SEQUENCE';
export const NEW_SEQUENCE_SUCCESS = 'NightlyCode/homework/NEW_SEQUENCE_SUCCESS';
export const NEW_SEQUENCE_FAILURE = 'NightlyCode/homework/NEW_SEQUENCE_FAILURE';

export const FETCH_SEQUENCE = 'NightlyCode/homework/FETCH_SEQUENCE';
export const FETCH_SEQUENCE_SUCCESS = 'NightlyCode/homework/FETCH_SEQUENCE_SUCCESS';
export const FETCH_SEQUENCE_FAILURE = 'NightlyCode/homework/FETCH_SEQUENCE_FAILURE';

export const ERROR_ON_NAME = 'NightlyCode/homework/ERROR_ON_NAME';
export const UPDATE_NAME = 'NightlyCode/homework/UPDATE_NAME';

export const UPDATE_SEQUENCE = 'NightlyCode/homework/UPDATE_SEQUENCE';
export const UPDATE_SEQUENCE_SUCCESS = 'NightlyCode/homework/UPDATE_SEQUENCE_SUCCESS';
export const UPDATE_SEQUENCE_FAILURE = 'NightlyCode/homework/UPDATE_SEQUENCE_FAILURE';

export const FETCH_QUESTION = 'NightlyCode/homework/FETCH_QUESTION';
export const FETCH_QUESTION_SUCCESS = 'NightlyCode/homework/FETCH_QUESTION_SUCCESS';
export const FETCH_QUESTION_FAILURE = 'NightlyCode/homework/FETCH_QUESTION_FAILURE';

export const SUBMIT_ANSWER = 'NightlyCode/homework/SUBMIT_ANSWER';
export const SUBMIT_ANSWER_SUCCESS = 'NightlyCode/homework/SUBMIT_ANSWER_SUCCESS';
export const SUBMIT_ANSWER_FAILURE = 'NightlyCode/homework/SUBMIT_ANSWER_FAILURE';

export const SELECTED_CHOICE = 'NightlyCode/homework/SELECTED_CHOICE';

const initialState = {
	route_token: '',
	loading: false,
	loaded: false,
	title: '',
	reading: '',
	identifier: '',
	sequence: {},
	question: {},
	selected: false
}

export default function reducer (state = initialState, action) {
	var { items } = state;

	switch(action.type) {
		// Route
		case SET_ROUTE_TOKEN:
			return {
				...state,
				route_token: action.token
			}
		// Sequence
		case NEW_SEQUENCE:
			return {
				...state,
				loading: true
			}
		case NEW_SEQUENCE_SUCCESS:
			const { route_token } = state;
			var sequences = cookie.load('sequences', {path: '/'})
			var sequence = {};
			sequence[route_token] = action.result.token
			if(sequences) {
				sequences = [...sequences, sequence]
			} else {
				sequences = [sequence]
			}
			cookie.save('sequences', sequences, {path: '/'})
			return {
				...state,
				loading: false,
				loaded: true,
				token: action.result.token,
				sequence: action.result,
				title: action.result.assignment.title,
				reading: action.result.assignment.text
			}
		case NEW_SEQUENCE_FAILURE:
			return {
				...state,
				// loading: false,
				error: action.error
			}
		case FETCH_SEQUENCE:
			return {
				...state,
				loading: true
			}
		case FETCH_SEQUENCE_SUCCESS:
			return {
				...state,
				loading: false,
				loaded: true,
				identifier: action.result.identifier,
				token: action.result.token,
				sequence: action.result,
				title: action.result.assignment.title,
				reading: action.result.assignment.text
			}
		case FETCH_SEQUENCE_FAILURE:
			return {
				...state,
				// loading: false,
				error: action.error
			}
		case UPDATE_SEQUENCE:
			return {
				...state
			}
		case UPDATE_SEQUENCE_SUCCESS:
			return {
				...state,
				identifier: action.result.identifier,
				token: action.result.token,
				sequence: action.result,
				title: action.result.assignment.title,
				reading: action.result.assignment.text
			}
		case UPDATE_SEQUENCE_FAILURE:
			return {
				...state,
				error: action.error
			}
		// Question
		case FETCH_QUESTION:
			return {
				...state,
				loading: true
			}
		case FETCH_QUESTION_SUCCESS:
			return {
				...state,
				loading: false,
				question: action.result
			}
		case FETCH_QUESTION_FAILURE:
			return {
				...state,
				error: action.error
			}
		// Answer
		case SUBMIT_ANSWER:
			return {
				...state
			}
		case SUBMIT_ANSWER_SUCCESS:
			return {
				...state,
				question: action.result,
				sequence: action.result.sequence
			}
		case SUBMIT_ANSWER_FAILURE:
			return {
				...state
			}
		case ERROR_ON_NAME:
			return {
				...state,
				invalid: true
			}
		case UPDATE_NAME:
			return {
				...state,
				identifier: action.name,
				invalid: false
			}
		case SELECTED_CHOICE:
			return {
				...state,
				selected: true
			}
		default:		
			return {
				...state,

			}
	}
}

export function setRouteToken(token) {
	return {type: SET_ROUTE_TOKEN, token}
}
export function nameError() {
	return {type: ERROR_ON_NAME}
}
export function updateName(name) {
	return {type: UPDATE_NAME, name}
}
export function selected() {
	return {type: SELECTED_CHOICE}
}

export function newSequence(token) {
	return {
		types: [NEW_SEQUENCE, NEW_SEQUENCE_SUCCESS, NEW_SEQUENCE_FAILURE],
		promise: (client) => client.post('/sequences', null, token)
	}
}

export function fetchSequence(token) {
	return {
		types: [FETCH_SEQUENCE, FETCH_SEQUENCE_SUCCESS, FETCH_SEQUENCE_FAILURE],
		promise: (client) => client.get(`/sequences/${token}`)
	}
}

export function updateSequence(name, token) {
	return {
		types: [UPDATE_SEQUENCE, UPDATE_SEQUENCE_SUCCESS, UPDATE_SEQUENCE_FAILURE],
		promise: (client) => client.put(`/sequences/${token}`, {
			identifier: name,
			reading_completed: true
		})
	}
}

export function fetchQuestion(token) {
	return {
		types: [FETCH_QUESTION, FETCH_QUESTION_SUCCESS, FETCH_QUESTION_FAILURE],
		promise: (client) => client.put(`/sequences/${token}/question`)
	}
}

export function submitAnswer(answer, token) {
	return {
		types: [SUBMIT_ANSWER, SUBMIT_ANSWER_SUCCESS, SUBMIT_ANSWER_FAILURE],
		promise: (client) => client.put(`/sequences/${token}/answer`, {input: answer})
	}
}
