import { SafeScreen } from '@/components/template';
import { Data } from '@/services/trade';
import { useTheme } from '@/theme';
import { View } from 'react-native';
import Chart from './Chart';
import List from './List';

function Market({ data }: { data: Data[] }) {
	const { gutters, layout } = useTheme();
	return (
		<SafeScreen>
			<View
				style={[gutters.paddingHorizontal_16, layout.flex_1, gutters.gap_16]}
			>
				<Chart data={data} />
				<List data={data} />
			</View>
		</SafeScreen>
	);
}

export { Market };
