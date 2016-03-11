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

export const FETCH_TOKEN = 'nightly/user/FETCH_TOKEN';
export const FETCH_TOKEN_SUCCESS = 'nightly/user/FETCH_TOKEN_SUCCESS';
export const FETCH_TOKEN_FAILURE = 'nightly/user/FETCH_TOKEN_FAILURE';

export const LOG_OUT = 'nightly/user/LOG_OUT';

const initialState = {
	loaded: false,
	loading: false,
	token: null,
	user: null
}

export default function reducer(state = initialState, action) {
	var d = new Date();
    d.setTime(d.getTime() + (365*24*60*60*1000));
	switch(action.type) {
		case CREATE_USER:
			return {
				...state,
				loaded: false,
			}
		case CREATE_USER_SUCCESS:
			cookie.save('token', action.result.token, { path: '/', expires: d});
			if(action.result.email) {
				cookie.save('teacher', true, {path: '/', expires: d})
			}
			return {
				...state,
				token: action.result.token,
				user: action.result,
				loaded: true
			}
		case CREATE_USER_FAILURE:
			return {
				...state,
				error: action.error
			}
		case UPDATE_USER:
			return {
				...state,
				loading: true,
				loaded: false
			}
		case UPDATE_USER_SUCCESS:
			if(!cookie.load('teacher', {path: '/'})) {
				cookie.save('teacher', true, {path: '/', expires: d})
			}
			return {
				...state,
				loaded: true,
				loading: false,
				user: action.result
			}
		case UPDATE_USER_FAILURE:
			return {
				...state,
				loaded: false,
				loading: false,
				error: action.error
			}
		case FETCH_USER:
			return {
				...state,
				loaded: false,
				loading: true
			}
		case FETCH_USER_SUCCESS:
			if(!cookie.load('teacher', {path: '/'})) {
				if(action.result.email) {
					cookie.save('teacher', true, {path: '/', expires: d})
				}
			}
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
		case FETCH_TOKEN:
			return {
				...state
			}
		case FETCH_TOKEN_SUCCESS:
			if(action.result) {
				cookie.save('token', action.result, { path: '/', expires: d});
				return {
					...state,
					token: action.result
				}
			} else {
				return {
					...state
				}
			}
		case FETCH_TOKEN_FAILURE:
			return {
				...state
			}
		case LOG_OUT:
			cookie.remove('token', {path: '/'})
			cookie.remove('teacher', {path: '/'})
			cookie.remove('student', {path: '/'})
			cookie.remove('sequences', {path: '/'})
			return {
				...state,
				loaded: false,
				token: '',
				user: null
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
export function fetchToken(email, password) {
	return (dispatch, getState) => {
		dispatch({type: FETCH_TOKEN})
		request
		.get(`https://nightly-server.herokuapp.com/api/v1.0/token`)
		.auth(email, password)
		.end((err, res) => {
			const result = res.body.token;
			if(res.ok) {
				dispatch({type: FETCH_TOKEN_SUCCESS, result})
			} else {
				dispatch({type: FETCH_TOKEN_FAILURE, err})
			}
		})
	}
}
export function logOut() {
	return {
		type: LOG_OUT
	}
}
