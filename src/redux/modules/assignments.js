import request from 'superagent';

import { FETCH_USER_SUCCESS } from './user';

export const CREATE_ASSIGNMENT = 'nightly/assignments/CREATE_ASSIGNMENT';
export const CREATE_ASSIGNMENT_SUCCESS = 'nightly/assignments/CREATE_ASSIGNMENT_SUCCESS';
export const CREATE_ASSIGNMENT_FAILURE = 'nightly/assignments/CREATE_ASSIGNMENT_FAILURE';

export const UPDATE_TITLE = 'nightly/assignments/UPDATE_TITLE';
export const UPDATE_TEXT = 'nightly/assignments/UPDATE_TEXT';
export const CLEAR_DRAFT = 'nightly/assignments/CLEAR_DRAFT';

const initialState = {
	title: '',
	text: '',
	//
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
		case UPDATE_TITLE:
			return {
				...state,
				title: action.title
			}
		case UPDATE_TEXT:
			return {
				...state,
				text: action.text
			}
		case CLEAR_DRAFT:
			return {
				title: '',
				text: ''
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

export function updateTitle(title) {
	return {
		type: UPDATE_TITLE,
		title
	}
}
export function updateText(text) {
	return {
		type: UPDATE_TEXT,
		text
	}
}
export function clearDraft() {
	return {
		type: CLEAR_DRAFT
	}
}