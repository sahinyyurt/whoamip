import { z } from 'zod';

export type Flag = z.infer<typeof flagSchema>;
export type Connection = z.infer<typeof connectionSchema>;
export type Timezone = z.infer<typeof timezoneSchema>;
export type IpWhoisResponse = z.infer<typeof ipWhoisResponseSchema>;

export const flagSchema = z.object({
	img: z.string(),
	emoji: z.string(),
	emoji_unicode: z.string(),
});

export const connectionSchema = z.object({
	asn: z.number(),
	org: z.string(),
	isp: z.string(),
	domain: z.string(),
});

export const timezoneSchema = z.object({
	id: z.string(),
	abbr: z.string(),
	is_dst: z.boolean(),
	offset: z.number(),
	utc: z.string(),
	current_time: z.string(),
});

export const ipWhoisResponseSchema = z.object({
	ip: z.string().ip(),
	success: z.boolean(),
	type: z.string(),
	continent: z.string(),
	continent_code: z.string(),
	country: z.string(),
	country_code: z.string(),
	region: z.string(),
	region_code: z.string(),
	city: z.string(),
	latitude: z.number(),
	longitude: z.number(),
	is_eu: z.boolean(),
	postal: z.string(),
	calling_code: z.string(),
	capital: z.string(),
	borders: z.string(),
	flag: flagSchema,
	connection: connectionSchema,
	timezone: timezoneSchema,
});
