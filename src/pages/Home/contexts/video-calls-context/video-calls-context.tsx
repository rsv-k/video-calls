import { Peer, MediaConnection, DataConnection } from 'peerjs';
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
import { initialState, mediaOptions, DATA_ACTIONS } from './constants';
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
	const [currentCall, setCurrentCall] = useState<MediaConnection | null>(null);
	const [currentConnections, setCurrentConnections] = useState<
		DataConnection[]
	>([]);
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
			setCurrentConnections((prev) => [...prev, conn]);
		});

		peer.on('call', (call) => {
			dispatch({ type: 'receivingCall', payload: true });
			setCurrentCall(call);
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
			console.log(conn);
			setCurrentConnections((prev) => [...prev, conn]);

			conn.on('open', () => {
				conn.on('data', (data) => {
					const d = data as typeof DATA_ACTIONS[keyof typeof DATA_ACTIONS];

					if (d == DATA_ACTIONS.LEAVE_CALL) {
						dispatch({ type: 'leaveCall' });
					}
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

			setCurrentCall(call);
		},
		[currentUserPeer, currentUserStream],
	);

	const onAnswer = useCallback(() => {
		if (!currentCall) {
			return;
		}

		currentCall.once('stream', addUserToStream);

		currentCall.answer(currentUserStream);
		dispatch({ type: 'receivingCall', payload: false });
	}, [currentUserStream, currentCall]);

	const onRefuse = useCallback(() => {
		if (!currentCall) {
			return;
		}

		currentCall.close();
		dispatch({ type: 'receivingCall', payload: false });
	}, [currentCall]);

	const onLeaveCall = useCallback(() => {
		if (!currentCall) {
			return;
		}

		currentConnections.forEach((conn) => {
			conn.send(DATA_ACTIONS.LEAVE_CALL);
		});
		dispatch({ type: 'leaveCall' });
		currentCall.close();
	}, [currentCall, currentConnections]);

	const values = useMemo(() => {
		return { state, onAnswer, onCall, onRefuse, onLeaveCall };
	}, [state, onAnswer, onCall, onRefuse, onLeaveCall]);

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
