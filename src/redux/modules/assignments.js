import request from 'superagent';
import cookie from 'react-cookie';

import { FETCH_USER_SUCCESS } from './user';

export const CREATE_ASSIGNMENT = 'nightly/assignments/CREATE_ASSIGNMENT';
export const CREATE_ASSIGNMENT_SUCCESS = 'nightly/assignments/CREATE_ASSIGNMENT_SUCCESS';
export const CREATE_ASSIGNMENT_FAILURE = 'nightly/assignments/CREATE_ASSIGNMENT_FAILURE';

export const UPDATE_TITLE = 'nightly/assignments/UPDATE_TITLE';
export const UPDATE_TEXT = 'nightly/assignments/UPDATE_TEXT';

export const SELECT_ITEM = 'nightly/assignments/SELECT_ITEM';

export const DELETE_ITEMS = 'nightly/assignments/DELETE_ITEMS';
export const DELETE_ITEMS_SUCCESS = 'nightly/assignments/DELETE_ITEMS_SUCCESS';
export const DELETE_ITEMS_FAILURE = 'nightly/assignments/DELETE_ITEMS_FAILURE';

export const CLEAR_DRAFT = 'nightly/assignments/CLEAR_DRAFT';

const initialState = {
	title: '',
	text: '',
	//
	creating: false,
	editing: false,
	finished: false,
	assignment: {
		token: '134hvbhdjajan5573618nshs',
		id: 1,
		title: 'Ms. smith History text',
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
			if(state.assignments === 0) cookie.save('teacher', true, {path: '/'})
			return {
				...state,
				creating: false,
				assignments: [...state.assignments, ...action.result.assignment]
			}
		case CREATE_ASSIGNMENT_FAILURE:
			if(state.assignments === 0) cookie.save('teacher', true, {path: '/'})
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
		case DELETE_ITEMS:
			return {
				...state
			}
		case DELETE_ITEMS_SUCCESS:
			return {
				...state,
				finished: true
			}
		case DELETE_ITEMS_FAILURE:
			return {
				...state,
				finished: true,
				error: action.error
			}
		case CLEAR_DRAFT:
			return {
				title: '',
				text: '',
				editing: false,
				creating: false,
				finished: false
			}
		default:
			return {
				...state
			}
	}
}

export function createAssignment(token, title, text) {
	return {
		types: [CREATE_ASSIGNMENT, CREATE_ASSIGNMENT_SUCCESS, CREATE_ASSIGNMENT_FAILURE],
		promise: (client) => client.post('/assignments', {
			title: title,
			text: text
		}, token)
	}
}

export function selectItem(item_id) {
	return {
		type: SELECT_ITEM,
		item_id
	}
}

export function deleteItems(list, token) {
	return {
		types: [DELETE_ITEMS, DELETE_ITEMS_SUCCESS, DELETE_ITEMS_FAILURE],
		promise: (client) => client.del('/items', {
			items: list
		}, token)
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