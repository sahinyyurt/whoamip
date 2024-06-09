import { IPInfo } from '@/components';
import { SafeScreen } from '@/components/template';
import { fetchIpDetails, fetchMyIp } from '@/services/ipwhois';
import { useTheme } from '@/theme';
import { IMAGES } from '@/utils/constant';
import { useQuery } from '@tanstack/react-query';
import { Image, StyleSheet, View } from 'react-native';

function Profile({
	ipAddress,
	imageId = '2',
}: {
	ipAddress: string;
	imageId: string;
}) {
	const { gutters } = useTheme();
	const { data: ip } = useQuery({
		queryKey: ['ip', ipAddress],
		queryFn: () => {
			if (!ipAddress) {
				return fetchMyIp();
			}
			return fetchIpDetails(ipAddress);
		},
	});
	const imgSource = IMAGES.find(x => x.key === imageId);
	return (
		<SafeScreen>
			<View style={gutters.padding_40}>
				{imgSource && (
					<Image source={{ uri: imgSource?.url }} style={styles.img} />
				)}
			</View>

			{ip && <IPInfo {...ip} />}
		</SafeScreen>
	);
}

const styles = StyleSheet.create({
	img: {
		width: '100%',
		height: undefined,
		aspectRatio: 3 / 2,
		borderRadius: 10,
	},
});

export default Profile;
