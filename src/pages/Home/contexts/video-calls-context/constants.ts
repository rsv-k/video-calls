import { TInitialState } from './types';

export const initialState: TInitialState = {
	usersOnCall: [],
	incomingCall: false,
};

export const mediaOptions = { audio: true, video: true };
