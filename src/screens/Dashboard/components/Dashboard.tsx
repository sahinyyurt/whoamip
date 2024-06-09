import { SafeScreen } from '@/components/template';
import { Text, View } from 'react-native';
import { useTheme } from '@/theme';
import { IPInfo, IPInfoProps } from '@/components';
import { IMAGES, PredefinedImage } from '@/utils/constant';
import { ImageCarousel } from './ImageCarousel';
import { IPSearchInput } from './IPSearchInput';
import { defaultStyles } from '@/theme/fonts';

type Props = {
	ip?: IPInfoProps;
	onIpSearch: (ip: string) => void;
	onImageChanged: (image: PredefinedImage) => void;
};

function Dashboard({ ip = undefined, onIpSearch, onImageChanged }: Props) {
	const { layout, gutters, colors, fonts } = useTheme();
	return (
		<SafeScreen>
			<View
				style={[
					layout.justifyCenter,
					layout.fullWidth,
					gutters.paddingHorizontal_80,
					gutters.paddingVertical_80,
					gutters.gap_32,
					{ backgroundColor: colors.blue },
				]}
			>
				<Text
					style={[
						fonts.gray100,
						fonts.size_24,
						layout.alignSelfCenter,
						defaultStyles.fontWeigh500,
					]}
				>
					IP Tracker
				</Text>
				<IPSearchInput onSearch={onIpSearch} />
			</View>
			{ip && <IPInfo {...ip} />}
			<ImageCarousel onImageChanged={onImageChanged} images={IMAGES} />
		</SafeScreen>
	);
}

export { Dashboard };
