import { useTheme } from '@/theme';
import { defaultStyles } from '@/theme/fonts';
import { IpWhoisResponse } from '@/types/schemas/ipwhois';
import { Text, View } from 'react-native';

export type IPInfoProps = Pick<
	IpWhoisResponse,
	'ip' | 'connection' | 'region' | 'country' | 'timezone'
>;

function IPInfo({ ip, country, region, timezone, connection }: IPInfoProps) {
	const { layout, gutters, colors, fonts } = useTheme();
	return (
		<View
			style={[
				layout.row,
				gutters.gap_12,
				{ backgroundColor: colors.black },
				layout.justifyCenter,
				gutters.paddingVertical_16,
				gutters.paddingHorizontal_24,
			]}
		>
			<View style={[layout.itemsCenter, layout.justifyCenter, gutters.gap_16]}>
				<Text
					style={[fonts.gray100, fonts.size_16, defaultStyles.fontWeigh500]}
				>
					IP Address
				</Text>
				<Text
					style={[fonts.gray200, fonts.size_12, defaultStyles.fontWeigh500]}
				>
					{ip}
				</Text>
			</View>
			<View style={[layout.itemsCenter, layout.justifyCenter, gutters.gap_16]}>
				<Text
					style={[fonts.gray100, fonts.size_16, defaultStyles.fontWeigh500]}
				>
					Location
				</Text>
				<Text
					style={[fonts.gray200, fonts.size_12, defaultStyles.fontWeigh500]}
				>
					{region}, {country}
				</Text>
			</View>
			<View style={[layout.itemsCenter, layout.justifyCenter, gutters.gap_16]}>
				<Text
					style={[fonts.gray100, fonts.size_16, defaultStyles.fontWeigh500]}
				>
					Timezone
				</Text>
				<Text
					style={[fonts.gray200, fonts.size_12, defaultStyles.fontWeigh500]}
				>
					UTC{timezone?.utc}
				</Text>
			</View>
			<View
				style={[
					layout.itemsCenter,
					layout.justifyCenter,
					gutters.gap_16,
					{ maxWidth: '25%' },
				]}
			>
				<Text
					style={[fonts.gray100, fonts.size_16, defaultStyles.fontWeigh500]}
				>
					ISP
				</Text>
				<Text
					style={[fonts.gray200, fonts.size_12, defaultStyles.fontWeigh500]}
					numberOfLines={1}
				>
					{connection?.isp}
				</Text>
			</View>
		</View>
	);
}

export { IPInfo };
