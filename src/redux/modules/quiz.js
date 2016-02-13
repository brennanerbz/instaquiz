import request from 'superagent';
import config from '../../config';

export const ADD_TOPIC = 'Instaquiz/quiz/ADD_TOPIC';
export const ADD_TOPIC_SUCCESS = 'Instaquiz/quiz/ADD_TOPIC_SUCCESS';
export const ADD_TOPIC_FAILURE = 'Instaquiz/quiz/ADD_TOPIC_FAILURE';

export const FETCH_ITEMS = 'Instaquiz/quiz/FETCH_ITEMS';
export const FETCH_ITEMS_SUCCESS = 'Instaquiz/quiz/FETCH_ITEMS_SUCCESS';
export const FETCH_ITEMS_FAILURE = 'Instaquiz/quiz/FETCH_ITEMS_FAILURE';

export const START_QUIZ = 'Instaquiz/quiz/START_QUIZ';
export const START_QUIZ_SUCCESS = 'Instaquiz/quiz/START_QUIZ_SUCCESS';
export const START_QUIZ_FAILURE = 'Instaquiz/quiz/START_QUIZ_FAILURE';

export const CLEAR_QUIZ = 'Instaquiz/quiz/CLEAR_QUIZ';

const initialState = {
	title: '',
	items: [],
	items_count: 0,
	loaded: false,
	error: null
}

export default function reducer (state = initialState, action) {
	var { items } = state;

	switch(action.type) {
		case ADD_TOPIC:
			return {
				...state
			}
		case ADD_TOPIC_SUCCESS:
			return {
				...state,
				title: action.result.title,
				items_count: action.result.items_count
			}
		case ADD_TOPIC_FAILURE:
			return {
				...state
			}
		case FETCH_ITEMS:
			return {
				...state
			}
		case FETCH_ITEMS_SUCCESS:
			items = [...items, ...action.result.items]
			return {
				...state,
				items: items,
				loaded: action.result.completed
			}
		case FETCH_ITEMS_FAILURE:
			return {
				...state,
				loaded: false
			}
		case CLEAR_QUIZ:
			return {
				...state = initialState,
				items: []
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
				dispatch(fetchItems(topic))
			}
		})
	}
}

export function fetchItems(topic) {
	return (dispatch, getState) => {
		request
		.get(`${config.herokuApi}/topics/${topic}`)
		.end((err, res) => {
			if(res.ok) {
				const result = res.body;
				const items = result.items;
				var completed = false;
				if(items.length < 100) {
					dispatch({type: FETCH_ITEMS_SUCCESS, items, completed})
					if(!result.completed) {
						dispatch(fetchItems(topic))
					}
				} else {
					completed = true;
					dispatch({type: FETCH_ITEMS_SUCCESS, items, completed})
				}
			}
		})
	}
}

export function startQuiz(number) {
	return (dispatch, getState) => {
		const quizTitle = getState().quiz.title
		request
		.post(`${config.herokuApi}/users/`)
		.send({
			user_cell_phone_number: number,
			topic: quizTitle
		})
		.end((err, res) => {
			if(res.ok) {
				dispatch({type: START_QUIZ_SUCCESS})
			} else {
				dispatch({type: START_QUIZ_FAILURE})
			}
		})
	}
}

export function clearQuiz() {
	return {
		type: CLEAR_QUIZ
	}
}