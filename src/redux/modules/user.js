import request from 'superagent';
import cookie from 'react-cookie';

import config from '../../config';

export const CREATE_USER = 'nightly/user/CREATE_USER';
export const CREATE_USER_SUCCESS = 'nightly/user/CREATE_USER_SUCCESS';
export const CREATE_USER_FAILURE = 'nightly/user/CREATE_USER_FAILURE';

export const FETCH_USER = 'nightly/user/FETCH_USER';
export const FETCH_USER_SUCCESS = 'nightly/user/FETCH_USER_SUCCESS';
export const FETCH_USER_FAILURE = 'nightly/user/FETCH_USER_FAILURE';

const initialState = {
	loaded: false,
	loading: false,
	id: ''
}

export default function reducer(state = initialState, action) {
	switch(action.type) {
		case CREATE_USER:
			return {
				...state
			}
		case CREATE_USER_SUCCESS:
			cookie.save('token', action.result.token, { path: '/'});
			return {
				...state
			}
		case CREATE_USER_FAILURE:
			return {
				...state
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
				id: action.result.user.id				
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

export function createUser() {
	return {
		types: [CREATE_USER, CREATE_USER_SUCCESS, CREATE_USER_FAILURE],
		promise: (client) => client.post('/user')
	}
}

export function fetchUser(token) {
	return {
		types: [FETCH_USER, FETCH_USER_SUCCESS, FETCH_USER_FAILURE],
		promise: (client) => client.get('/user', null, token)
	}
}