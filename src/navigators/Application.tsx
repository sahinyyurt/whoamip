import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { Startup } from '@/screens';
import { useTheme } from '@/theme';

import type { RootStackParamList } from '@/types/navigation';
import { SocketProvider } from '@/services/trade';
import HomeTabNav from './HomeTabs';

const Stack = createStackNavigator<RootStackParamList>();

function ApplicationNavigator() {
	const { variant, navigationTheme } = useTheme();

	return (
		<SafeAreaProvider>
			<SocketProvider>
				<NavigationContainer theme={navigationTheme}>
					<Stack.Navigator key={variant} screenOptions={{ headerShown: false }}>
						<Stack.Screen name="Startup" component={Startup} />
						<Stack.Screen name="HomeTabs" component={HomeTabNav} />
					</Stack.Navigator>
				</NavigationContainer>
			</SocketProvider>
		</SafeAreaProvider>
	);
}

export default ApplicationNavigator;
