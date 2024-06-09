import { render, screen } from '@testing-library/react-native';
import { MMKV } from 'react-native-mmkv';

import { ThemeProvider } from '@/theme';
import { Data } from '@/services/trade';
import List from '../List';

describe('Market Data List tests', () => {
	let storage: MMKV;
	const data: Data[] = [
		{
			date: 0,
			price: 1,
		},
		{
			date: 1,
			price: 2,
		},
		{
			date: 2,
			price: 3,
		},
	];

	beforeAll(() => {
		storage = new MMKV();
	});

	test('the data list should be there', () => {
		const component = (
			<ThemeProvider storage={storage}>
				<List data={data} />
			</ThemeProvider>
		);

		render(component);

		const list = screen.getByTestId('list');

		expect(list).toBeDefined();
	});

	test('the data list should be indicated given data', () => {
		const component = (
			<ThemeProvider storage={storage}>
				<List data={data} />
			</ThemeProvider>
		);

		const { getAllByText } = render(component);

		const firstItem = getAllByText('btcusdt | 2:00:00 AM | 1');
		const secondItem = getAllByText('btcusdt | 2:00:00 AM | 2');
		const thirdItem = getAllByText('btcusdt | 2:00:00 AM | 3');

		expect(firstItem).toBeDefined();
		expect(secondItem).toBeDefined();
		expect(thirdItem).toBeDefined();
	});
});
