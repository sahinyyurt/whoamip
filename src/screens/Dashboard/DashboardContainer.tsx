import { TabScreenProps } from '@/types/navigation';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { IMAGES } from '@/utils/constant';
import { fetchMyIp } from '@/services/ipwhois';
import { Dashboard } from './components/Dashboard';

type Props = TabScreenProps<'Dashboard'>;

function DashboardContainer({ navigation }: Props) {
	const [imgKey, setImgKey] = useState(IMAGES[1].key);
	const { data: ip } = useQuery({
		queryKey: ['my-ip'],
		queryFn: () => {
			return fetchMyIp();
		},
	});

	return (
		<Dashboard
			ip={ip}
			onImageChanged={img => setImgKey(img.key)}
			onIpSearch={ipAddress => {
				navigation.navigate('Profile', {
					imageId: imgKey,
					ipAddress,
				});
			}}
		/>
	);
}

export default DashboardContainer;
