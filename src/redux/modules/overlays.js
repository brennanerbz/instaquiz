
export const OPEN_MODAL = 'Instaquiz/quiz/OPEN_MODAL';
export const CLOSE_MODAL = 'Instaquiz/quiz/CLOSE_MODAL';

const initialState = {
	modalOpen: false,
	modalType: ''
}

export default function reducer (state = initialState, action) {
	var { items } = state;

	switch(action.type) {
		case OPEN_MODAL:
			return {
				...state,
				modalOpen: true
			}
		case CLOSE_MODAL:
			return {
				...state,
				modalOpen: false
			}
		default:		
			return {
				...state,

			}
	}
}

export function openModal() {
	return {
		type: OPEN_MODAL
	}
}

export function closeModal() {
	return {
		type: CLOSE_MODAL
	}
}