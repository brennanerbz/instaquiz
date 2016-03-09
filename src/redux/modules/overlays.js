
export const OPEN_MODAL = 'Instaquiz/overlays/OPEN_MODAL';
export const CLOSE_MODAL = 'Instaquiz/overlays/CLOSE_MODAL';

export const OPEN_FS_MODAL = 'Instaquiz/overlays/OPEN_FS_MODAL';
export const CLOSE_FS_MODAL = 'Instaquiz/overlays/CLOSE_FS_MODAL';

import {
	ADD_TOPIC,
	START_QUIZ,
	START_QUIZ_SUCCESS,
	START_QUIZ_FAILURE
} from './quiz';

const initialState = {
	modalOpen: false,
	modalType: '',
	fsModalOpen: false,
	fsModalType: ''
}

export default function reducer (state = initialState, action) {
	var { items } = state;

	switch(action.type) {
		case ADD_TOPIC:
			return {
				...state,
				modalOpen: true,
				modalType: 'processing'
			}
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
		case OPEN_FS_MODAL:
			return {
				...state,
				fsModalOpen: true,
				fsModalType: action.fsModalType
			}
		case CLOSE_FS_MODAL:
			return {
				...state,
				fsModalOpen: false,
				fsModalType: ''
			}
		case START_QUIZ_SUCCESS:
			return {
				modalOpen: true,
				modalType: 'quiz_success'
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
export function openFsModal(modalType) {
	return {
		type: OPEN_FS_MODAL,
		modalType
	}
}

export function closeFsModal() {
	return {
		type: CLOSE_FS_MODAL
	}
}