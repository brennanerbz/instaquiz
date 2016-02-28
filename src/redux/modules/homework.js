export const NEW_SEQUENCE = 'NightlyCode/homework/NEW_SEQUENCE';
export const NEW_SEQUENCE_SUCCESS = 'NightlyCode/homework/NEW_SEQUENCE_SUCCESS';
export const NEW_SEQUENCE_FAILURE = 'NightlyCode/homework/NEW_SEQUENCE_FAILURE';

export const FETCH_SEQUENCE = 'NightlyCode/homework/FETCH_SEQUENCE';
export const FETCH_SEQUENCE_SUCCESS = 'NightlyCode/homework/FETCH_SEQUENCE_SUCCESS';
export const FETCH_SEQUENCE_FAILURE = 'NightlyCode/homework/FETCH_SEQUENCE_FAILURE';

export const UPDATE_SEQUENCE = 'NightlyCode/homework/UPDATE_SEQUENCE';
export const UPDATE_SEQUENCE_SUCCESS = 'NightlyCode/homework/UPDATE_SEQUENCE_SUCCESS';
export const UPDATE_SEQUENCE_FAILURE = 'NightlyCode/homework/UPDATE_SEQUENCE_FAILURE';

export const FETCH_QUESTION = 'NightlyCode/homework/FETCH_QUESTION';
export const FETCH_QUESTION_SUCCESS = 'NightlyCode/homework/FETCH_QUESTION_SUCCESS';
export const FETCH_QUESTION_FAILURE = 'NightlyCode/homework/FETCH_QUESTION_FAILURE';

export const SUBMIT_ANSWER = 'NightlyCode/homework/SUBMIT_ANSWER';
export const SUBMIT_ANSWER_SUCCESS = 'NightlyCode/homework/SUBMIT_ANSWER_SUCCESS';
export const SUBMIT_ANSWER_FAILURE = 'NightlyCode/homework/SUBMIT_ANSWER_FAILURE';

const initialState = {
	title: '',
	reading: 'Finally, in addition to adjusting for hardware and data, we should also adjust for effort in assessing how significant an AI milestone is. With Deep Blue, for example, significant domain expertise was used to develop the AI that beat Gary Kasparov, rather than a system learning from scratch and thus demonstrating domain-general intelligence. Hassabis at AAAI and elsewhere has argued that AlphaGo represents more general progress in AI than did Deep Blue, and that the techniques used were general purpose. However, the very development of the policy and value network ideas for this project, as well as the specific training regimen used (a sequence of supervised learning and self-play, rather than end-to-end learning), was itself informed by the domain-specific expertise of researchers like David Silver and Aja Huang, who have substantial computer Go and Go expertise. While AlphaGo ultimately exceeded their skill levels, the search for algorithms in this case was informed by this specific domain (and, as mentioned earlier, part of the algorithm encoded domain-specific knowledge – namely, the MCTS component). Also, the team was large –15-20 people, significantly more than prior Go engines that I’m aware of, and more comparable to large projects like Deep Blue or Watson in terms of effort than anything else in computer Go history. So, if we should reasonably expect a large team of some of the smartest, most expert people in a given area working on a problem to yield progress on that problem, then the scale of this effort suggests we should slightly update downwards our impression of the significance of the AlphaGo milestone. This is in contrast to what we should have thought if, e.g. DeepMind had simply taken their existing DQN algorithm, applied it to Go, and achieved the same result. At the same time, innovations inspired by a specific domain may have broad relevance, and value/policy networks may be a case of this. It\'s still a bit early to say.',
	identifier: '',
	sequence: {},
	question: {}
}

export default function reducer (state = initialState, action) {
	var { items } = state;

	switch(action.type) {
		// Sequence
		case NEW_SEQUENCE:
			return {
				...state
			}
		case NEW_SEQUENCE_SUCCESS:
			return {
				...state
			}
		case NEW_SEQUENCE_FAILURE:
			return {
				...state
			}
		case FETCH_SEQUENCE:
			return {
				...state
			}
		case FETCH_SEQUENCE_SUCCESS:
			return {
				...state
			}
		case FETCH_SEQUENCE_FAILURE:
			return {
				...state
			}
		case UPDATE_SEQUENCE:
			return {
				...state
			}
		case UPDATE_SEQUENCE_SUCCESS:
			return {
				...state
			}
		case UPDATE_SEQUENCE_FAILURE:
			return {
				...state
			}
		// Question
		case FETCH_QUESTION:
			return {
				...state
			}
		case FETCH_QUESTION_SUCCESS:
			return {
				...state
			}
		case FETCH_QUESTION_FAILURE:
			return {
				...state
			}
		// Answer
		case SUBMIT_ANSWER:
			return {
				...state
			}
		case SUBMIT_ANSWER_SUCCESS:
			return {
				...state
			}
		case SUBMIT_ANSWER_FAILURE:
			return {
				...state
			}
		default:		
			return {
				...state,

			}
	}
}

export function newSequence(token) {
	return {
		types: [NEW_SEQUENCE, NEW_SEQUENCE_SUCCESS, NEW_SEQUENCE_FAILURE],
		promise: (client) => client.post('/sequences', null, token)
	}
}

export function fetchSequence(id) {
	return {
		types: [FETCH_SEQUENCE, FETCH_SEQUENCE_SUCCESS, FETCH_SEQUENCE_FAILURE],
		promise: (client) => client.get(`/sequences/${id}`)
	}
}

export function updateSequence(name, reading_completed) {
	return {
		types: [FETCH_SEQUENCE, FETCH_SEQUENCE_SUCCESS, FETCH_SEQUENCE_FAILURE],
		promise: (client) => client.put(`/sequences/${id}`, {
			identifier: name,
			reading_completed: reading_completed
		})
	}
}

export function fetchQuestion(id) {
	return {
		types: [FETCH_QUESTION, FETCH_QUESTION_SUCCESS, FETCH_QUESTION_FAILURE],
		promise: (client) => client.put(`/sequences/${id}/question`)
	}
}

export function submitAnswer(answer) {
	return {
		types: [SUBMIT_ANSWER, SUBMIT_ANSWER_SUCCESS, SUBMIT_ANSWER_FAILURE],
		promise: (client) => client.put(`/sequences/${id}/answer`, {input: answer})
	}
}
