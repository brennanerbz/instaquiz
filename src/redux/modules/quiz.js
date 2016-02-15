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
	definition: '',
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
				definition: action.result.definition
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
			return {
				...state, 
				items: action.items,
				loaded: action.completed,
				items_count: action.items.length
			}
		case FETCH_ITEMS_FAILURE:
			return {
				...state,
				loaded: false
			}
		case CLEAR_QUIZ:
			return {
				...state = initialState,
				title: '',
				items: [],
				items_count: 0,
				loaded: false
			}
		default:		
			return {
				...state
			}
	}
}

export function addTopic(topic) {
	return (dispatch, getState) => {
		dispatch({type: ADD_TOPIC})
		request
		.post(`${config.herokuApi}/topics/`)
		.send({topic: topic})
		.end((err, res) => {
			if(res.ok) {
				const result = res.body;
				dispatch({type: ADD_TOPIC_SUCCESS, result})
				dispatch(fetchItems(result.title))
			}
		})
	}
}

var initTimeout = false;
var itemsTimeout = null;
var itemListPromise = [];
var fetchItemsTimeout = null;
export function fetchItems(topic) {
	return (dispatch, getState) => {
		var req = request.get(`${config.herokuApi}/topics/${topic}`)
		itemListPromise.push(req)
		req.end((err, res) => {
			if(res.ok) {
				const result = res.body;
				const items = result.items;
				const itemsInState = getState().quiz.items;
				var completed = false;
				if(itemsTimeout && items && (items.length > itemsInState.length)) {
					clearTimeout(itemsTimeout)
				}
				if(items && items.length === itemsInState.length) {
					if(!itemsTimeout) {
						itemsTimeout = setTimeout(() => {
							initTimeout = true;
						}, 5000)
					}
				} 
				if(initTimeout || result.completed) {
					itemListPromise.forEach(item => item.abort())
					completed = true;
					initTimeout = false;
					clearTimeout(itemsTimeout)
					clearTimeout(fetchItemsTimeout)
					dispatch({type: FETCH_ITEMS_SUCCESS, result, items, completed})
					return;
				}
				dispatch({type: FETCH_ITEMS_SUCCESS, result, items, completed})
				fetchItemsTimeout = setTimeout(() => {
					dispatch(fetchItems(topic))
				}, 750)
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
			user_cell_phone_number: '+1' + number,
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
	clearTimeout(fetchItemsTimeout)
	itemListPromise.forEach(item => item.abort())
	return {
		type: CLEAR_QUIZ
	}
}