import { Data } from '@/services/trade';
import { useTheme } from '@/theme';
import { useRef } from 'react';
import { FlatList, ListRenderItem, StyleSheet, Text } from 'react-native';

type Props = {
	data: Data[];
};

function List({ data }: Props) {
	const { layout, gutters, fonts } = useTheme();
	const flatList = useRef<FlatList>(null);

	const renderItem: ListRenderItem<Data> = ({ item }) => (
		<Text style={fonts.gray800}>
			btcusdt | {new Date(item.date).toLocaleTimeString()} |{' '}
			{item.price.toLocaleString()}
		</Text>
	);

	return (
		<FlatList
			testID="list"
			ref={flatList}
			contentContainerStyle={[
				styles.bgWhite,
				gutters.gap_12,
				gutters.paddingVertical_12,
				gutters.paddingHorizontal_16,
			]}
			style={[layout.flex_1, gutters.marginBottom_12]}
			data={data}
			renderItem={renderItem}
			keyExtractor={(item, index) => index.toString()}
			showsVerticalScrollIndicator={false}
			onContentSizeChange={(w, h) =>
				flatList.current?.scrollToOffset({ offset: h, animated: true })
			}
		/>
	);
}

const styles = StyleSheet.create({
	bgWhite: {
		backgroundColor: 'white',
	},
});

export default List;
