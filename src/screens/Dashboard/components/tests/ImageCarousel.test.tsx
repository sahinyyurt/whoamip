import { fireEvent, render, screen } from '@testing-library/react-native';
import { MMKV } from 'react-native-mmkv';

import { ThemeProvider } from '@/theme';
import { ITEM_SIZE, ImageCarousel } from '../ImageCarousel';
import { IMAGES, PredefinedImage } from '@/utils/constant';
import { Dimensions } from 'react-native';

describe('ImageCarousel tests', () => {
	let storage: MMKV;
	const { width } = Dimensions.get('window');
	let horizontalScroll = (scrollLength: number) => ({
		nativeEvent: {
			contentOffset: {
				x: scrollLength, // scroll right the width of the device
			},
			contentSize: {
				// Dimensions of the scrollable content
				width: width,
			},
			layoutMeasurement: {
				// Dimensions of the device
				width: width,
			},
		},
	});

	beforeAll(() => {
		storage = new MMKV();
	});

	test('the user can swipe to image 2', () => {
		let img: PredefinedImage | null = null;
		const component = (
			<ThemeProvider storage={storage}>
				<ImageCarousel onImageChanged={_img => (img = _img)} images={IMAGES} />
			</ThemeProvider>
		);

		render(component);

		const list = screen.getByTestId('image-list');

		fireEvent.scroll(list, horizontalScroll(ITEM_SIZE));
		expect(img!.key).toBe('2');
	});

	test('the user can swipe to image 1', () => {
		let img: PredefinedImage | null = null;
		const component = (
			<ThemeProvider storage={storage}>
				<ImageCarousel onImageChanged={_img => (img = _img)} images={IMAGES} />
			</ThemeProvider>
		);

		render(component);

		const list = screen.getByTestId('image-list');

		fireEvent.scroll(list, horizontalScroll(-ITEM_SIZE));
		expect(img!.key).toBe('1');
	});

	test('the user can swipe to image 3', () => {
		let img: PredefinedImage | null = null;
		const component = (
			<ThemeProvider storage={storage}>
				<ImageCarousel onImageChanged={_img => (img = _img)} images={IMAGES} />
			</ThemeProvider>
		);

		render(component);

		const list = screen.getByTestId('image-list');

		fireEvent.scroll(list, horizontalScroll(2 * ITEM_SIZE));
		expect(img!.key).toBe('3');
	});
});
