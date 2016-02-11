
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
				modalOpen: true,
				modalType: action.modalType
			}
		case CLOSE_MODAL:
			return {
				...state,
				modalOpen: false,
				modalType: ''
			}
		default:		
			return {
				...state,

			}
	}
}

export function openModal(modalType) {
	return {
		type: OPEN_MODAL,
		modalType
	}
}

export function closeModal() {
	return {
		type: CLOSE_MODAL
	}
}