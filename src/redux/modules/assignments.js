import request from 'superagent';
import cookie from 'react-cookie';

export const FETCH_ASSIGNMENTS = 'nightly/assignments/FETCH_ASSIGNMENTS';
export const FETCH_ASSIGNMENTS_SUCCESS = 'nightly/assignments/FETCH_ASSIGNMENTS_SUCCESS';
export const FETCH_ASSIGNMENTS_FAILURE = 'nightly/assignments/FETCH_ASSIGNMENTS_FAILURE';

export const FETCH_ARTICLE = 'nightly/assignments/FETCH_ARTICLE';
export const FETCH_ARTICLE_SUCCESS = 'nightly/assignments/FETCH_ARTICLE_SUCCESS';
export const FETCH_ARTICLE_FAILURE = 'nightly/assignments/FETCH_ARTICLE_FAILURE';

export const CREATE_ASSIGNMENT = 'nightly/assignments/CREATE_ASSIGNMENT';
export const CREATE_ASSIGNMENT_SUCCESS = 'nightly/assignments/CREATE_ASSIGNMENT_SUCCESS';
export const CREATE_ASSIGNMENT_FAILURE = 'nightly/assignments/CREATE_ASSIGNMENT_FAILURE';

export const FETCH_ASSIGNMENT = 'nightly/assignments/FETCH_ASSIGNMENT';
export const FETCH_ASSIGNMENT_SUCCESS = 'nightly/assignments/FETCH_ASSIGNMENT_SUCCESS';
export const FETCH_ASSIGNMENT_FAILURE = 'nightly/assignments/FETCH_ASSIGNMENT_FAILURE';

export const DELETE_ASSIGNMENT = 'nightly/assignments/DELETE_ASSIGNMENT';
export const DELETE_ASSIGNMENT_SUCCESS = 'nightly/assignments/DELETE_ASSIGNMENT_SUCCESS';
export const DELETE_ASSIGNMENT_FAILURE = 'nightly/assignments/DELETE_ASSIGNMENT_FAILURE';

export const UPDATE_TITLE = 'nightly/assignments/UPDATE_TITLE';
export const UPDATE_TEXT = 'nightly/assignments/UPDATE_TEXT';

export const SELECT_ITEM = 'nightly/assignments/SELECT_ITEM';

export const DELETE_ITEMS = 'nightly/assignments/DELETE_ITEMS';
export const DELETE_ITEMS_SUCCESS = 'nightly/assignments/DELETE_ITEMS_SUCCESS';
export const DELETE_ITEMS_FAILURE = 'nightly/assignments/DELETE_ITEMS_FAILURE';

export const CLEAR_DRAFT = 'nightly/assignments/CLEAR_DRAFT';
export const CLEAR_ASSIGNMENT = 'nightly/assignments/CLEAR_ASSIGNMENT';
export const CLEAR_DASHBOARD = 'nightly/assignments/CLEAR_DASHBOARD';

const initialState = {
	title: '',
	text: '',
	//
	fetchingAssignments: false,
	loading: false,
	loaded: false,
	fetching: false,
	creating: false,
	editing: false,
	deleting: false,
	finished: false,
	workingAssignment: {},
	assignment: {},
	items: [],
	sequences: [],
	items_count: 0,
	assignments: [],
	error: null
}

export default function reducer(state = initialState, action) {
	switch(action.type) {
		case FETCH_ASSIGNMENTS:
			return {
				...state,
				fetchingAssignments: true,
			}
		case FETCH_ASSIGNMENTS_SUCCESS:
			if(action.result.assignments.length > 0) {
				cookie.save('teacher', true, {path: '/', expires: d})
			}
			return {
				...state,
				fetchingAssignments: false,
				loaded: true,
				assignments: [...action.result.assignments]
			}
		case FETCH_ASSIGNMENTS_FAILURE:
			return {
				...state,
				fetchingAssignments: false,
				loaded: false,
				error: action.error
			}
		case FETCH_ARTICLE:
			return {
				...state,
				fetching: true
			}
		case FETCH_ARTICLE_SUCCESS:
			let error = null
			if(action.result.error) {
				error = action.result.error
			} else if(action.result.text.length < 50) {
				error = 'No Content. Error: 204'
			}
			return {
				...state,
				fetching: false,
				title: error ? '' : action.result.title,
				text: error ? '' : action.result.text,
				error: error
			}
		case FETCH_ARTICLE_FAILURE:
			return {
				...state,
				error: action.error,
				fetching: false
			}
		case CREATE_ASSIGNMENT:
			return {
				...state,
				creating: true
			}
		case CREATE_ASSIGNMENT_SUCCESS:
			var d = new Date();
		    d.setTime(d.getTime() + (365*24*60*60*1000));
		    if(!cookie.load('teacher', {path: '/'})) {
		    	cookie.save('teacher', true, {path: '/', expires: d})
		    }
			return {
				...state,
				creating: false,
				editing: true,
				assignments: [action.result, ...state.assignments],
				workingAssignment: action.result,
				items: action.result.items.items.map(item => {
					item.selected = true
					return item;
				}),
				items_count: action.result.items.items.length,
				title: action.result.title,
				token: action.result.token,
				error: null
			}
		case CREATE_ASSIGNMENT_FAILURE:
			return {
				...state,
				creating: false,
				error: action.error
			}
		case FETCH_ASSIGNMENT:
			return {
				...state,
				loading: true
			}
		case FETCH_ASSIGNMENT_SUCCESS:
			return {
				...state,
				loading: false,
				editing: false,
				assignment: action.result,
				items: action.result.items.items,
				items_count: action.result.items.items.length,
				// title: action.result.title,
				// text: action.result.text,
				token: action.result.token,
				sequences: action.result.sequences.sequences
			}
		case FETCH_ASSIGNMENT_FAILURE:
			return {
				...state,
				loading: false,
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
				text: action.text,
				error: null 
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
				...state,
				finished: false,
				deleting: true,
			}
		case DELETE_ITEMS_SUCCESS:
			return {
				...state,
				finished: true,
				deleting: false
			}
		case DELETE_ITEMS_FAILURE:
			return {
				...state,
				finished: true,
				error: action.error,
				deleting: false,
			}
		case DELETE_ASSIGNMENT:
			return {
				...state,
			}
		case DELETE_ASSIGNMENT_SUCCESS:
			return {
				...state,
				assignments: state.assignments.filter(a => a.id !== action.result.id),
				workingAssignment: {},
				title: '',
				text: '',
				creating: false,
				editing: false,
				finished: false
			}
		case DELETE_ASSIGNMENT_FAILURE:
			return {
				...state,
				error: action.error,
			}
		case CLEAR_DRAFT:
			return {
				...state,
				title: '',
				text: '',
				editing: false,
				creating: false,
				finished: false,
				workingAssignment: {}
			}
		case CLEAR_ASSIGNMENT:
			return {
				...state,
				title: '',
				text: '',
				token: null,
				loaded: false,
				loading: false,
				creating: false,
				editing: false,
				finished: false,
				assignment: {},
				items: [],
				sequences: [],
				items_count: 0,
				assignments: [],
				error: null
			}
		case CLEAR_DASHBOARD:
			return {
				...state,
				loaded: false
			}
		default:
			return {
				...state
			}
	}
}

export function fetchAssignments(token) {
	return {
		types: [FETCH_ASSIGNMENTS, FETCH_ASSIGNMENTS_SUCCESS, FETCH_ASSIGNMENTS_FAILURE],
		promise: (client) => client.get('/assignments/', null, token)
	}
}

export function fetchArticle(link, token) {
	return {
		types: [FETCH_ARTICLE, FETCH_ARTICLE_SUCCESS, FETCH_ARTICLE_FAILURE],
		promise: (client) => client.post('/scrape-url', {url: link}, token)
	}
}

export function createAssignment(token, title, text, subject, readingLevel) {
	return {
		types: [CREATE_ASSIGNMENT, CREATE_ASSIGNMENT_SUCCESS, CREATE_ASSIGNMENT_FAILURE],
		promise: (client) => client.post('/assignments/', {
			title: title,
			text: text,
			subject: subject,
			level: readingLevel
		}, token)
	}
}

export function fetchAssignment(token, user_token) {
	return {
		types: [FETCH_ASSIGNMENT, FETCH_ASSIGNMENT_SUCCESS, FETCH_ASSIGNMENT_FAILURE],
		promise: (client) => client.get(`/assignments/${token}`, null, user_token)
	}
}

export function selectItem(item_id) {
	return {
		type: SELECT_ITEM,
		item_id
	}
}

export function deleteItems(list, id, token) {
	return {
		types: [DELETE_ITEMS, DELETE_ITEMS_SUCCESS, DELETE_ITEMS_FAILURE],
		promise: (client) => client.put(`/assignments/${id}`, {
			items: list
		}, token)
	}
}

export function deleteAssignment(id, token, pushState) {
	return(dispatch, getState) => {
		dispatch({type: DELETE_ASSIGNMENT})
		var currentRoute = getState().router.location.pathname;
		request
		.del(`https://nightly-server.herokuapp.com/api/v1.0/assignments/${id}`)
		.auth(token, '')
		.end((err, res) => {
			if(res.ok) {
				const result = res.body
				dispatch({type: DELETE_ASSIGNMENT_SUCCESS, result})
				pushState(null, currentRoute)
			} else {
				const error = err;
				dispatch({type: DELETE_ASSIGNMENT_FAILURE, error})
			}
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
export function clearAssignment() {
	return {
		type: CLEAR_ASSIGNMENT
	}
}
export function clearDashboard() {
	return {
		type: CLEAR_DASHBOARD
	}
}