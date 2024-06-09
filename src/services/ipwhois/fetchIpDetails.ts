import { instance } from '@/services/instance';
import { ipWhoisResponseSchema } from '@/types/schemas/ipwhois';

export default async (ip: string) => {
	const response = await instance.get(`${ip}`).json();
	return ipWhoisResponseSchema.parse(response);
};
