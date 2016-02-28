export const NEW_SEQUENCE = 'NightlyCode/homework/NEW_SEQUENCE';
export const NEW_SEQUENCE_SUCCESS = 'NightlyCode/homework/NEW_SEQUENCE_SUCCESS';
export const NEW_SEQUENCE_FAILURE = 'NightlyCode/homework/NEW_SEQUENCE_FAILURE';

export const FETCH_SEQUENCE = 'NightlyCode/homework/FETCH_SEQUENCE';
export const FETCH_SEQUENCE_SUCCESS = 'NightlyCode/homework/FETCH_SEQUENCE_SUCCESS';
export const FETCH_SEQUENCE_FAILURE = 'NightlyCode/homework/FETCH_SEQUENCE_FAILURE';

export const UPDATE_SEQUENCE = 'NightlyCode/homework/UPDATE_SEQUENCE';
export const UPDATE_SEQUENCE_SUCCESS = 'NightlyCode/homework/UPDATE_SEQUENCE_SUCCESS';
export const UPDATE_SEQUENCE_FAILURE = 'NightlyCode/homework/UPDATE_SEQUENCE_FAILURE';

export const FETCH_QUESTION = 'NightlyCode/homework/FETCH_QUESTION';
export const FETCH_QUESTION_SUCCESS = 'NightlyCode/homework/FETCH_QUESTION_SUCCESS';
export const FETCH_QUESTION_FAILURE = 'NightlyCode/homework/FETCH_QUESTION_FAILURE';

export const SUBMIT_ANSWER = 'NightlyCode/homework/SUBMIT_ANSWER';
export const SUBMIT_ANSWER_SUCCESS = 'NightlyCode/homework/SUBMIT_ANSWER_SUCCESS';
export const SUBMIT_ANSWER_FAILURE = 'NightlyCode/homework/SUBMIT_ANSWER_FAILURE';

const initialState = {
	title: '',
	reading: '',
	identifier: '',
	sequence: {},
	question: {}
}

export default function reducer (state = initialState, action) {
	var { items } = state;

	switch(action.type) {
		// Sequence
		case NEW_SEQUENCE:
			return {
				...state
			}
		case NEW_SEQUENCE_SUCCESS:
			return {
				...state
			}
		case NEW_SEQUENCE_FAILURE:
			return {
				...state
			}
		case FETCH_SEQUENCE:
			return {
				...state
			}
		case FETCH_SEQUENCE_SUCCESS:
			return {
				...state
			}
		case FETCH_SEQUENCE_FAILURE:
			return {
				...state
			}
		case UPDATE_SEQUENCE:
			return {
				...state
			}
		case UPDATE_SEQUENCE_SUCCESS:
			return {
				...state
			}
		case UPDATE_SEQUENCE_FAILURE:
			return {
				...state
			}
		// Question
		case FETCH_QUESTION:
			return {
				...state
			}
		case FETCH_QUESTION_SUCCESS:
			return {
				...state
			}
		case FETCH_QUESTION_FAILURE:
			return {
				...state
			}
		// Answer
		case SUBMIT_ANSWER:
			return {
				...state
			}
		case SUBMIT_ANSWER_SUCCESS:
			return {
				...state
			}
		case SUBMIT_ANSWER_FAILURE:
			return {
				...state
			}
		default:		
			return {
				...state,

			}
	}
}

export function newSequence(token) {
	return {
		types: [NEW_SEQUENCE, NEW_SEQUENCE_SUCCESS, NEW_SEQUENCE_FAILURE],
		promise: (client) => client.post('/sequences', null, token)
	}
}

export function fetchSequence(id) {
	return {
		types: [FETCH_SEQUENCE, FETCH_SEQUENCE_SUCCESS, FETCH_SEQUENCE_FAILURE],
		promise: (client) => client.get(`/sequences/${id}`)
	}
}

export function updateSequence(name, reading_completed) {
	return {
		types: [FETCH_SEQUENCE, FETCH_SEQUENCE_SUCCESS, FETCH_SEQUENCE_FAILURE],
		promise: (client) => client.put(`/sequences/${id}`, {
			identifier: name,
			reading_completed: reading_completed
		})
	}
}

export function fetchQuestion(id) {
	return {
		types: [FETCH_QUESTION, FETCH_QUESTION_SUCCESS, FETCH_QUESTION_FAILURE],
		promise: (client) => client.put(`/sequences/${id}/question`)
	}
}

export function submitAnswer(answer) {
	return {
		types: [SUBMIT_ANSWER, SUBMIT_ANSWER_SUCCESS, SUBMIT_ANSWER_FAILURE],
		promise: (client) => client.put(`/sequences/${id}/answer`, {input: answer})
	}
}
