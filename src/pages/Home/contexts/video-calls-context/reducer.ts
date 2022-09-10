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
		case 'leaveCall': {
			return {
				...state,
				usersOnCall: [state.usersOnCall[0]],
			};
		}
		default: {
			return { ...state };
		}
	}
};
