/* eslint-disable react/no-unstable-nested-components */
import { Dashboard, Market, Profile } from '@/screens';
import { useTheme } from '@/theme';
import { defaultStyles } from '@/theme/fonts';
import { TabBarParamList } from '@/types/navigation';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Tab = createBottomTabNavigator<TabBarParamList>();

function TabbarIcon({ color, icon }: { color: string; icon: string }) {
	const style = StyleSheet.create({
		txt: { color, fontSize: 18, fontWeight: 'bold' },
	});
	return <Text style={style.txt}>{icon}</Text>;
}

function BackButton() {
	const { navigationTheme, gutters, fonts, layout } = useTheme();
	const navigation = useNavigation();
	return (
		<TouchableOpacity
			style={[layout.alignSelfCenter, gutters.paddingHorizontal_16]}
			onPress={navigation.goBack}
		>
			<Text
				style={[
					fonts.size_24,
					fonts.alignCenter,
					defaultStyles.fontWeigh500,
					{ color: navigationTheme.colors.primary },
				]}
			>
				{'<'}
			</Text>
		</TouchableOpacity>
	);
}

export default function HomeTabNav() {
	const { navigationTheme } = useTheme();
	return (
		<Tab.Navigator
			screenOptions={{
				tabBarLabelPosition: 'beside-icon',
				headerTintColor: navigationTheme.colors.primary,
				tabBarStyle: {
					backgroundColor: 'white',
				},
			}}
		>
			<Tab.Screen
				name="Dashboard"
				component={Dashboard}
				options={{
					tabBarIcon: props => <TabbarIcon {...props} icon="D" />,
				}}
			/>
			<Tab.Screen
				name="Profile"
				component={Profile}
				options={{
					tabBarIcon: props => <TabbarIcon {...props} icon="P" />,
					headerLeft: BackButton,
				}}
			/>
			<Tab.Screen
				name="Market"
				component={Market}
				options={{
					tabBarIcon: props => <TabbarIcon {...props} icon="M" />,
					headerLeft: BackButton,
				}}
			/>
		</Tab.Navigator>
	);
}
