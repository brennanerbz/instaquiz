import request from 'superagent';

import { FETCH_USER_SUCCESS } from './user';

export const CREATE_ASSIGNMENT = 'nightly/user/CREATE_ASSIGNMENT';
export const CREATE_ASSIGNMENT_SUCCESS = 'nightly/user/CREATE_ASSIGNMENT_SUCCESS';
export const CREATE_ASSIGNMENT_FAILURE = 'nightly/user/CREATE_ASSIGNMENT_FAILURE';

const initialState = {
	creating: false,
	assignments: [],
	error: null
}

export default function reducer(state = initialState, action) {
	switch(action.type) {
		case FETCH_USER_SUCCESS:
			return {
				...state,
				assignments: action.result.user.assignments
			}
		case CREATE_ASSIGNMENT:
			return {
				...state,
				creating: true
			}
		case CREATE_ASSIGNMENT_SUCCESS:
			return {
				...state,
				creating: false,
				assignments: [...state.assignments, ...action.result.assignment]
			}
		case CREATE_ASSIGNMENT_FAILURE:
			return {
				...state,
				creating: false,
				error: action.error
			}
		default:
			return {
				...state
			}
	}
}

export function createAssignment(creator_id, title, text) {
	return {
		types: [CREATE_ASSIGNMENT, CREATE_ASSIGNMENT_SUCCESS, CREATE_ASSIGNMENT_FAILURE],
		promise: (client) => client.post('/assignments', {
			creator_id: creator_id,
			title: title,
			text: text
		})
	}
}