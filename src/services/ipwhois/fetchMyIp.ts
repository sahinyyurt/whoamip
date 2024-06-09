import { instance } from '@/services/instance';
import {
	IpWhoisResponse,
	ipWhoisResponseSchema,
} from '@/types/schemas/ipwhois';

export default async (): Promise<IpWhoisResponse> => {
	const response = await instance.get('').json();

	return ipWhoisResponseSchema.parse(response);
};
