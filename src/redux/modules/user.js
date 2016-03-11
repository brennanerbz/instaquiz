import request from 'superagent';
import cookie from 'react-cookie';

import config from '../../config';

export const CREATE_USER = 'nightly/user/CREATE_USER';
export const CREATE_USER_SUCCESS = 'nightly/user/CREATE_USER_SUCCESS';
export const CREATE_USER_FAILURE = 'nightly/user/CREATE_USER_FAILURE';

export const UPDATE_USER = 'nightly/user/UPDATE_USER';
export const UPDATE_USER_SUCCESS = 'nightly/user/UPDATE_USER_SUCCESS';
export const UPDATE_USER_FAILURE = 'nightly/user/UPDATE_USER_FAILURE';

export const FETCH_USER = 'nightly/user/FETCH_USER';
export const FETCH_USER_SUCCESS = 'nightly/user/FETCH_USER_SUCCESS';
export const FETCH_USER_FAILURE = 'nightly/user/FETCH_USER_FAILURE';

const initialState = {
	loaded: false,
	loading: false,
	token: '',
	user: null
}

export default function reducer(state = initialState, action) {
	switch(action.type) {
		case CREATE_USER:
			return {
				...state
			}
		case CREATE_USER_SUCCESS:
			var d = new Date();
		    d.setTime(d.getTime() + (365*24*60*60*1000));
			cookie.save('token', action.result.token, { path: '/', expires: d});
			return {
				...state,
				token: action.result.token,
				user: action.result
			}
		case CREATE_USER_FAILURE:
			return {
				...state
			}
		case UPDATE_USER:
			return {
				...state,
				loading: true
			}
		case UPDATE_USER_SUCCESS:
			return {
				...state,
				loaded: true,
				loading: false
			}
		case UPDATE_USER_FAILURE:
			return {
				...state,
				loaded: false,
				loading: false
			}
		case FETCH_USER:
			return {
				...state,
				loading: true
			}
		case FETCH_USER_SUCCESS:
			return {
				...state,
				loaded: true,
				loading: false,
				user: action.result
			}
		case FETCH_USER_FAILURE:
			return {
				...state,
				loaded: false,
				loading: false
			}
		default:
			return {
				...state
			}
	}
}	

export function createUser(username, email, password) {
	return {
		types: [CREATE_USER, CREATE_USER_SUCCESS, CREATE_USER_FAILURE],
		promise: (client) => client.post('/users/', {
			first_name: null,
			last_name: null,
			username: username,
			email: email,
			password: password
		})
	}
}

export function updateUser(username, email, password, token) {
	return {
		types: [UPDATE_USER, UPDATE_USER_SUCCESS, UPDATE_USER_FAILURE],
		promise: (client) => client.put('/users/', {
			username: username,
			email: email,
			password: password
		}, token)
	}
}

export function fetchUser(token) {
	return {
		types: [FETCH_USER, FETCH_USER_SUCCESS, FETCH_USER_FAILURE],
		promise: (client) => client.get('/users/', null, token)
	}
}