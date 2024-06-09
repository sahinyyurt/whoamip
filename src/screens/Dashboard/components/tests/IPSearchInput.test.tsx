import { fireEvent, render, screen } from '@testing-library/react-native';
import { MMKV } from 'react-native-mmkv';

import { ThemeProvider } from '@/theme';

import { IPSearchInput } from '../IPSearchInput';

describe('IPSearchInput tests', () => {
	let storage: MMKV;

	beforeAll(() => {
		storage = new MMKV();
	});

	test('the user type and send the ip', () => {
		let ip;
		const component = (
			<ThemeProvider storage={storage}>
				<IPSearchInput onSearch={_ip => (ip = _ip)} />
			</ThemeProvider>
		);

		render(component);

		const input = screen.getByTestId('ip-input');
		const btn = screen.getByTestId('search-ip');

		fireEvent.changeText(input, '4.4.2.1');
		expect(btn).toBeEnabled();

		fireEvent.press(btn);
		expect(ip).toBe('4.4.2.1');
	});

	test('the user type and can not send any value expect ip', () => {
		const component = (
			<ThemeProvider storage={storage}>
				<IPSearchInput onSearch={_ip => {}} />
			</ThemeProvider>
		);

		render(component);

		const input = screen.getByTestId('ip-input');
		const btn = screen.getByTestId('search-ip');

		fireEvent.changeText(input, 'it is not ip');
		fireEvent.press(btn);
		expect(btn).toBeDisabled();
	});

	test('the user type and can not send empty', () => {
		const component = (
			<ThemeProvider storage={storage}>
				<IPSearchInput onSearch={_ip => {}} />
			</ThemeProvider>
		);

		render(component);

		const input = screen.getByTestId('ip-input');
		const btn = screen.getByTestId('search-ip');

		fireEvent.changeText(input, '');
		fireEvent.press(btn);
		expect(btn).toBeDisabled();
	});
});
