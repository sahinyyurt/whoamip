import { useTheme } from '@/theme';
import { IMAGES, PredefinedImage } from '@/utils/constant';
import { useEffect, useRef, useState } from 'react';
import {
	View,
	StyleSheet,
	Image,
	Dimensions,
	Animated,
	Platform,
	ListRenderItem,
} from 'react-native';

const { width } = Dimensions.get('window');

const SPACING = 10;
export const ITEM_SIZE = Platform.OS === 'ios' ? width * 0.72 : width * 0.76;
const EMPTY_ITEM_SIZE = (width - ITEM_SIZE) / 2;

type Props = {
	onImageChanged: (image: PredefinedImage) => void;
	images: PredefinedImage[];
};

export function ImageCarousel({ onImageChanged, images }: Props) {
	const scrollX = useRef(new Animated.Value(0)).current;
	const { layout } = useTheme();

	const [activeIndex, setActiveIndex] = useState(1);
	const renderItem: ListRenderItem<{
		key: string;
		url?: string | undefined;
	}> = ({ item, index }) => {
		if (!item.url) {
			return <View style={{ width: EMPTY_ITEM_SIZE }} />;
		}

		const inputRange = [
			(index - 2) * ITEM_SIZE,
			(index - 1) * ITEM_SIZE,
			index * ITEM_SIZE,
		];

		const scale = scrollX.interpolate({
			inputRange,
			outputRange: [1, 1.2, 1],
			extrapolate: 'clamp',
		});

		return (
			<View style={styles.itemContainer}>
				<Animated.View
					style={[
						styles.imageOuter,
						{
							transform: [{ scale }],
						},
					]}
				>
					<Image
						source={{ uri: item.url }}
						style={[
							styles.image,
							index === activeIndex ? styles.active : styles.passive,
						]}
					/>
				</Animated.View>
			</View>
		);
	};

	useEffect(() => {
		if (images[activeIndex - 1]) {
			onImageChanged(images[activeIndex - 1]);
		}
	}, [activeIndex]);

	return (
		<View style={{ height: ITEM_SIZE }}>
			<Animated.FlatList
				testID={'image-list'}
				showsHorizontalScrollIndicator={false}
				data={[{ key: 'empty-left' }, ...images, { key: 'empty-right' }]}
				keyExtractor={item => item.key}
				horizontal
				bounces={false}
				decelerationRate={Platform.OS === 'ios' ? 0 : 0.98}
				renderToHardwareTextureAndroid
				contentContainerStyle={layout.itemsCenter}
				snapToInterval={ITEM_SIZE}
				snapToAlignment="start"
				initialScrollIndex={activeIndex}
				pagingEnabled
				getItemLayout={(data, index) => ({
					length: ITEM_SIZE,
					offset: ITEM_SIZE * index,
					index,
				})}
				onScroll={event => {
					Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
						useNativeDriver: false,
					})(event);
					const actIndex =
						Math.ceil(event.nativeEvent.contentOffset.x / ITEM_SIZE) + 1;
					setActiveIndex(actIndex > IMAGES.length ? IMAGES.length : actIndex);
				}}
				scrollEventThrottle={16}
				renderItem={renderItem}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	image: {
		width: '100%',
		height: undefined,
		aspectRatio: 3 / 2,
		resizeMode: 'cover',
		borderRadius: 5,
		margin: 0,
		marginBottom: 10,
	},
	imageOuter: {
		marginHorizontal: SPACING,
		alignItems: 'center',
	},
	active: { borderWidth: 4, borderColor: '#ce3752' },
	passive: { opacity: 0.7 },
	itemContainer: { width: ITEM_SIZE, paddingHorizontal: 10 },
});
