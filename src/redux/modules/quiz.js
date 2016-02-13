import request from 'superagent';
import config from '../../config';

export const ADD_TOPIC = 'Instaquiz/quiz/ADD_TOPIC';
export const ADD_TOPIC_SUCCESS = 'Instaquiz/quiz/ADD_TOPIC_SUCCESS';
export const ADD_TOPIC_FAILURE = 'Instaquiz/quiz/ADD_TOPIC_FAILURE';

export const FETCH_ITEMS = 'Instaquiz/quiz/FETCH_ITEMS';
export const FETCH_ITEMS_SUCCESS = 'Instaquiz/quiz/FETCH_ITEMS_SUCCESS';
export const FETCH_ITEMS_FAILURE = 'Instaquiz/quiz/FETCH_ITEMS_FAILURE';
export const CLEAR_QUIZ = 'Instaquiz/quiz/CLEAR_QUIZ';

const initialState = {
	start: 0,
	end: 0,
	quiz: {},
	items: [],
	loaded: false,
	error: null
}

export default function reducer (state = initialState, action) {
	var { items } = state;

	switch(action.type) {
		case FETCH_ITEMS:
			return {
				...state
			}
		case FETCH_ITEMS_SUCCESS:
			items = [...items, ...action.result.items]
			return {
				...state,
				quiz: Object.keys(state.quiz).length === 0 ? action.result.set : state.quiz,
				items: items,
				loaded: items.length === state.end,
				start: state.start + action.result.items.length,
				end: action.result.count
			}
		case FETCH_ITEMS_FAILURE:
			return {
				...state,
				loaded: false,
				error: action.error
			}
		case CLEAR_QUIZ:
			return {
				...state = initialState,
				items: [],
				start: 0,
				end: 0
			}
		default:		
			return {
				...state
			}
	}
}

export function addTopic(topic) {
	return (dispatch, getState) => {
		request
		.post(`${config.herokuApi}/topics/`)
		.send({topic: topic})
		.end((err, res) => {
			if(res.ok) {
				const result = res.body;
				dispatch({type: ADD_TOPIC_SUCCESS, result})
				console.log('result: ', result)
				// dispatch(fetchItems(result.url))
			}
		})
	}
}

export function fetchItems(url) {
	
}

export function clearQuiz() {
	return {
		type: CLEAR_QUIZ
	}
}