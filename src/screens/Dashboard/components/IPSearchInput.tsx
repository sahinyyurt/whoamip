import { useTheme } from '@/theme';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { z } from 'zod';

const styles = StyleSheet.create({
	btn: {
		borderTopRightRadius: 10,
		borderBottomRightRadius: 10,
		height: 40,
	},
	txtInput: {
		paddingHorizontal: 10,
		paddingVertical: 5,
		borderTopLeftRadius: 10,
		borderBottomLeftRadius: 10,
		height: 40,
		minWidth: '90%',
	},
});

export type Props = {
	onSearch: (ip: string) => void;
};

const IPschema = z.string().ip();

function IPSearchInput({ onSearch }: Props) {
	const { layout, gutters, colors, fonts } = useTheme();
	const [IP, setIP] = useState('');
	const { success: parsed } = IPschema.safeParse(IP);
	return (
		<View style={[layout.row, layout.itemsCenter]}>
			<TextInput
				testID="ip-input"
				style={[
					styles.txtInput,
					{ backgroundColor: colors.gray50, color: colors.gray800 },
				]}
				placeholder="Search for any IP address"
				placeholderTextColor={colors.gray800}
				value={IP}
				onChangeText={setIP}
			/>
			<TouchableOpacity
				testID="search-ip"
				style={[
					gutters.paddingHorizontal_16,
					layout.justifyCenter,
					layout.itemsCenter,
					styles.btn,
					{
						backgroundColor: parsed ? colors.black : colors.gray800,
					},
				]}
				disabled={!parsed}
				onPress={() => onSearch(IP)}
			>
				<Text style={[fonts.gray100, fonts.size_16, fonts.alignCenter]}>
					{'>'}
				</Text>
			</TouchableOpacity>
		</View>
	);
}

export { IPSearchInput };
