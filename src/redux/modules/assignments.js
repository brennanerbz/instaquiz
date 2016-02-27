import request from 'superagent';

import { FETCH_USER_SUCCESS } from './user';

export const CREATE_ASSIGNMENT = 'nightly/assignments/CREATE_ASSIGNMENT';
export const CREATE_ASSIGNMENT_SUCCESS = 'nightly/assignments/CREATE_ASSIGNMENT_SUCCESS';
export const CREATE_ASSIGNMENT_FAILURE = 'nightly/assignments/CREATE_ASSIGNMENT_FAILURE';

export const UPDATE_TITLE = 'nightly/assignments/UPDATE_TITLE';
export const UPDATE_TEXT = 'nightly/assignments/UPDATE_TEXT';

export const SELECT_ITEM = 'nightly/assignments/SELECT_ITEM';

export const DELETE_ITEM = 'nightly/assignments/DELETE_ITEM';
export const DELETE_ITEM_SUCCESS = 'nightly/assignments/DELETE_ITEM_SUCCESS';
export const DELETE_ITEM_FAILURE = 'nightly/assignments/DELETE_ITEM_FAILURE';

export const CLEAR_DRAFT = 'nightly/assignments/CLEAR_DRAFT';

const initialState = {
	title: '',
	text: '',
	//
	creating: false,
	editing: false,
	assignment: {
		id: 1,
		title: 'Ms. smith',
		text: 'Blah!'
	},
	items: [
		{selected: true, id: 1, target: 'Series A round', cue: 'What is the name typically given to a company\'s first round of fundraising?'},
		{selected: true, id: 2, target: 'Angel investor', cue: 'What is an affluent individual who provides capital for start ups?'},
		{selected: true, id: 3, target: 'Seed money', cue: 'What is a form of securities offering in which an investor invests capital in exchange for an equity stake in the company?'},
		{selected: true, id: 4, target: 'Initial public offering', cue: 'What is it called when a company\'s shares are initially sold to the public?'}
	],
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
				// creating: false,
				editing: true, // temp
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
		case SELECT_ITEM:
			return {
				...state,
				items: state.items.map(item => {
					if(item.id === action.item_id) item.selected = !item.selected
					return item
				})
			}
		case DELETE_ITEM:
			return {
				...state
			}
		case DELETE_ITEM_SUCCESS:
			return {
				...state,
				items: state.items.filter(item => item.id !== action.item.id)
			}
		case DELETE_ITEM_FAILURE:
			return {
				...state,
				error: action.error
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

export function selectItem(item_id) {
	return {
		type: SELECT_ITEM,
		item_id
	}
}

export function deleteItem(item_id) {
	return {
		types: [DELETE_ITEM, DELETE_ITEM_SUCCESS, DELETE_ITEM_FAILURE],
		promise: (client) => client.delete('/items', {
			id: item_id
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