import { render } from '@testing-library/react-native';
import { MMKV } from 'react-native-mmkv';

import { ThemeProvider } from '@/theme';
import { IPInfo, IPInfoProps } from './IPInfo';

describe('IPInfo tests', () => {
	let storage: MMKV;
	let ipInfo: IPInfoProps = {
		connection: {
			asn: 0,
			isp: 'Test ISP',
			domain: '',
			org: '',
		},
		country: 'Turkey',
		region: 'Istanbul',
		ip: '45.11.202.105',
		timezone: {
			abbr: '',
			current_time: '',
			id: '',
			is_dst: false,
			offset: 0,
			utc: '+03:00',
		},
	};

	beforeAll(() => {
		storage = new MMKV();
	});

	test('the user can see ip address', () => {
		const component = (
			<ThemeProvider storage={storage}>
				<IPInfo {...ipInfo} />
			</ThemeProvider>
		);

		const { getAllByText } = render(component);

		const ip = getAllByText('45.11.202.105');

		expect(ip).toBeDefined();
	});

	test('the user can see location', () => {
		const component = (
			<ThemeProvider storage={storage}>
				<IPInfo {...ipInfo} />
			</ThemeProvider>
		);

		const { getAllByText } = render(component);

		const location = getAllByText('Istanbul, Turkey');

		expect(location).toBeDefined();
	});

	test('the user can see timezone', () => {
		const component = (
			<ThemeProvider storage={storage}>
				<IPInfo {...ipInfo} />
			</ThemeProvider>
		);

		const { getAllByText } = render(component);

		const tz = getAllByText('UTC+03:00');

		expect(tz).toBeDefined();
	});

	test('the user can see ISP', () => {
		const component = (
			<ThemeProvider storage={storage}>
				<IPInfo {...ipInfo} />
			</ThemeProvider>
		);

		const { getAllByText } = render(component);

		const tz = getAllByText('Test ISP');

		expect(tz).toBeDefined();
	});
});
