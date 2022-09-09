import { TAction, TInitialState } from './types';

export const reducer = (
	state: TInitialState,
	action: TAction,
): TInitialState => {
	switch (action.type) {
		case 'addUserToCall': {
			return {
				...state,
				usersOnCall: [...state.usersOnCall, action.payload],
			};
		}
		case 'receivingCall': {
			return {
				...state,
				incomingCall: action.payload,
			};
		}
		default: {
			return { ...state };
		}
	}
};
