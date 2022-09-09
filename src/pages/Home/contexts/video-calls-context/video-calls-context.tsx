import { Peer, MediaConnection } from 'peerjs';
import {
	createContext,
	PropsWithChildren,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useReducer,
	useRef,
	useState,
} from 'react';
import { initialState, mediaOptions } from './constants';
import { reducer } from './reducer';
import { Props, TVideoCallsContext } from './types';

const VideoCallsContext = createContext<TVideoCallsContext | undefined>(
	undefined,
);

export const VideoCallsProvider = ({
	children,
	currentUserId,
	users,
}: PropsWithChildren<Props>) => {
	const [state, dispatch] = useReducer(reducer, initialState);
	const [currentUserPeer, setCurrentUserPeer] = useState<Peer | null>(null);
	const [currentUserStream, setCurrentUserStream] = useState<MediaStream>();
	const [incomingCall, setIncomingCall] = useState<MediaConnection | null>(
		null,
	);
	const establishedConnection = useRef<Set<string>>(new Set());

	const addUserToStream = (stream: MediaStream) => {
		dispatch({
			type: 'addUserToCall',
			payload: {
				stream,
			},
		});
	};

	useEffect(() => {
		const peer = new Peer(currentUserId);

		peer.on('connection', (conn) => {
			conn.on('open', () => {
				conn.on('data', () => {
					console.log('data');
				});
			});
		});

		peer.on('call', (call) => {
			dispatch({ type: 'receivingCall', payload: true });
			setIncomingCall(call);
		});

		navigator.mediaDevices
			.getUserMedia(mediaOptions)
			.then((stream) => {
				setCurrentUserStream(stream);
				addUserToStream(stream);
			})
			.catch(console.log);

		setCurrentUserPeer(peer);
	}, [currentUserId]);

	useEffect(() => {
		if (!currentUserPeer || !users?.length) {
			return;
		}

		const usersToConnectWith = users.filter(
			(user) => !establishedConnection.current.has(user.userId),
		);

		usersToConnectWith.forEach((user) => {
			establishedConnection.current.add(user.userId);
			const conn = currentUserPeer.connect(user.userId);

			conn.on('open', () => {
				conn.on('data', () => {
					console.log(`receiving data from ${user.userId}`);
				});
			});
		});
	}, [users, currentUserPeer]);

	const onCall = useCallback(
		(userId: string) => {
			if (!currentUserPeer || !currentUserStream) {
				return;
			}

			const call = currentUserPeer.call(userId, currentUserStream);

			call.once('stream', (stream) => {
				addUserToStream(stream);
			});
		},
		[currentUserPeer, currentUserStream],
	);

	const onAnswer = useCallback(() => {
		if (!incomingCall) {
			return;
		}

		incomingCall.once('stream', addUserToStream);

		incomingCall.answer(currentUserStream);
		dispatch({ type: 'receivingCall', payload: false });
	}, [currentUserStream, incomingCall]);

	const onRefuse = useCallback(() => {
		if (!incomingCall) {
			return;
		}

		incomingCall.close();
		dispatch({ type: 'receivingCall', payload: false });
	}, [incomingCall]);

	const values = useMemo(() => {
		return { state, onAnswer, onCall, onRefuse };
	}, [state, onAnswer, onCall, onRefuse]);

	return (
		<VideoCallsContext.Provider value={values}>
			{children}
		</VideoCallsContext.Provider>
	);
};

export const useVideoCalls = () => {
	const context = useContext(VideoCallsContext);

	if (!context) {
		throw new Error('useVideoCalls is not used inside VideoCallsProvider');
	}

	return context;
};
