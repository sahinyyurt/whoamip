import { z } from 'zod';

export type Data = DataTicker | DataSubscription;
export type DataTicker = z.infer<typeof dataTrickSchema>;
export type DataSubscription = z.infer<typeof dataSubscriptionSchema>;
export type TiingoWS = z.infer<typeof tiingoWSSchema>;

const dataTrickSchema = z.tuple([
	z.string(),
	z.string(),
	z.string(),
	z.string(),
	z.number(),
	z.number(),
]);

const dataSubscriptionSchema = z.object({
	subscriptionId: z.number(),
});

export const dataSchema = z.union([dataTrickSchema, dataSubscriptionSchema]);

export const responseSchema = z.object({
	code: z.number(),
	message: z.string(),
});

export const tiingoWSSchema = z.object({
	messageType: z.union([
		z.literal('I'),
		z.literal('A'),
		z.literal('H'),
		z.literal('E'),
	]),
	data: dataSchema.optional(),
});
