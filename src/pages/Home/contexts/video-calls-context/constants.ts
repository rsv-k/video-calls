import { TInitialState } from './types';

export const initialState: TInitialState = {
	usersOnCall: [],
	incomingCall: false,
};

export const mediaOptions = { audio: true, video: true };

export const DATA_ACTIONS = {
	LEAVE_CALL: 0,
} as const;
