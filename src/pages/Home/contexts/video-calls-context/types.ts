import { TUser } from '@/types';

export type Props = {
	currentUserId: string;
	users: TUser[] | undefined;
};

type TUserStream = {
	stream: MediaStream;
};

export type TInitialState = {
	usersOnCall: TUserStream[];
	incomingCall: boolean;
};

export type TVideoCallsContext = {
	state: TInitialState;
	onAnswer: () => void;
	onRefuse: () => void;
	onCall: (userId: string) => void;
	onLeaveCall: () => void;
};

export type TAction =
	| {
			type: 'addUserToCall';
			payload: TUserStream;
	  }
	| {
			type: 'receivingCall';
			payload: boolean;
	  }
	| {
			type: 'leaveCall';
	  };
