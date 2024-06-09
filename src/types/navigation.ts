import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import type { StackScreenProps } from '@react-navigation/stack';

export type RootStackParamList = {
	Startup: undefined;
	HomeTabs: undefined;
};

export type TabBarParamList = {
	Dashboard: undefined;
	Profile: {
		imageId: string;
		ipAddress: string;
	};
	Market: undefined;
};

export type TabScreenProps<
	S extends keyof TabBarParamList = keyof TabBarParamList,
> = CompositeScreenProps<
	BottomTabScreenProps<TabBarParamList, S>,
	StackScreenProps<RootStackParamList>
>;

export type RootScreenProps<
	S extends keyof RootStackParamList = keyof RootStackParamList,
> = StackScreenProps<RootStackParamList, S>;
