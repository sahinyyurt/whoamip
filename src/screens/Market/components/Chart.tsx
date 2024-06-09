import { Data } from '@/services/trade';
import { useTheme } from '@/theme';
import {
	ScrollView,
	StyleSheet,
	View,
	useWindowDimensions,
} from 'react-native';
import { CartesianChart, Line } from 'victory-native';

type Props = {
	data: Data[];
};

const PADDING = 32;
const MIN_RECORD = 5;
const RECORD_WIDTH = 10;

function Chart({ data }: Props) {
	const { layout } = useTheme();
	const { width: screenWidth } = useWindowDimensions();
	const width =
		screenWidth -
		PADDING +
		(data.length > MIN_RECORD ? (data.length - MIN_RECORD) * RECORD_WIDTH : 0);
	return (
		<ScrollView
			style={layout.flex_1}
			horizontal
			showsHorizontalScrollIndicator={false}
		>
			<View
				style={[
					{
						width,
					},
					styles.inner,
				]}
			>
				{data.length > 0 && (
					<CartesianChart
						padding={10}
						data={data}
						xKey="date"
						yKeys={['price']}
						axisOptions={{
							tickCount: { y: 20, x: 0 },
							lineWidth: {
								grid: { y: 1, x: 0 },
								frame: StyleSheet.hairlineWidth,
							},
						}}
					>
						{({ points }) => (
							<Line
								points={points.price}
								curveType="cardinal"
								color="#945fe7"
								strokeWidth={2}
								animate={{ type: 'timing', duration: 200 }}
							/>
						)}
					</CartesianChart>
				)}
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	inner: {
		height: '100%',
		backgroundColor: '#f1f5ff',
	},
});

export default Chart;
