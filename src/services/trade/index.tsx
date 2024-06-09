import {
	DataSubscription,
	DataTicker,
	tiingoWSSchema,
} from '@/types/schemas/tiingows';
import {
	PropsWithChildren,
	createContext,
	useCallback,
	useContext,
	useMemo,
	useRef,
} from 'react';
import _ from 'lodash';
export type Data = { date: number; price: number };

type SocketContextState = {
	listenData: (cb: (data: Data) => void) => void;
	isConnected: () => boolean;
	disconnect: () => void;
	connect: () => void;
};
export const SocketContext = createContext<SocketContextState | undefined>(
	undefined,
);

const WS_URL = process.env.WS_URL!;
const KEY = process.env.TIINGO_KEY!;

export const useTiingoSocket = () => {
	const context = useContext(SocketContext);

	if (context === undefined) {
		throw new Error('useTiingoSocket must be used within a SocketProvider');
	}

	return context;
};

export function SocketProvider({ children = null }: PropsWithChildren) {
	const wsRef = useRef<WebSocket>();
	const listener = useRef<(data: Data) => void>();
	const subscriptionId = useRef(0);

	const connect = useCallback(() => {
		wsRef.current = new WebSocket(WS_URL);
		const subscribe = {
			eventName: 'subscribe',
			authorization: KEY,
			eventData: {
				thresholdLevel: 5,
				tickers: ['btcusdt'],
			},
		};
		wsRef.current.onopen = () => {
			wsRef.current?.send(JSON.stringify(subscribe));
		};

		wsRef.current.onmessage = _.throttle(e => {
			const message = tiingoWSSchema.parse(JSON.parse(e.data as string));
			if (message.messageType === 'I') {
				const { subscriptionId: subId } = message.data as DataSubscription;
				subscriptionId.current = subId;
			} else if (message.messageType === 'A') {
				const [, , date, market, , price] = message.data as DataTicker;
				if (market === 'binance') {
					listener.current &&
						listener.current({ date: new Date(date).getTime(), price });
				}
			}
		}, 10);
	}, []);

	const disconnect = () => {
		wsRef.current?.send(
			JSON.stringify({
				eventName: 'unsubscribe',
				authorization: KEY,
				eventData: {
					subscriptionId,
					tickers: ['btcusdt'],
				},
			}),
		);
		wsRef.current?.close(1006);
	};

	const value = useMemo<SocketContextState>(
		() => ({
			isConnected: () => wsRef.current?.readyState === 1,
			connect,
			disconnect,
			listenData: cb => {
				listener.current = cb;
			},
		}),
		[],
	);

	return (
		<SocketContext.Provider value={value}>{children}</SocketContext.Provider>
	);
}
