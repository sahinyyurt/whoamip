import { TabScreenProps } from '@/types/navigation';
import Profile from './components/Profile';

type Props = TabScreenProps<'Profile'>;

function ProfileContainer({ route }: Props) {
	const { params } = route;
	return <Profile ipAddress={params?.ipAddress} imageId={params?.imageId} />;
}

export default ProfileContainer;
