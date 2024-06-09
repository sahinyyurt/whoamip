import { Data, useTiingoSocket } from '@/services/trade';
import { useFocusEffect } from '@react-navigation/native';
import { Market } from './components/Market';
import { useCallback, useEffect, useState } from 'react';

function MarketContainer() {
	const [data, setData] = useState<Data[]>([]);
	const { connect, disconnect, isConnected, listenData } = useTiingoSocket();

	useFocusEffect(
		useCallback(() => {
			if (!isConnected()) {
				connect();
			}
			return disconnect;
		}, [isConnected]),
	);
	useEffect(() => {
		listenData(_data => setData(prev => [...prev, _data]));
		return () => {};
	}, []);

	return <Market data={data} />;
}

export default MarketContainer;
