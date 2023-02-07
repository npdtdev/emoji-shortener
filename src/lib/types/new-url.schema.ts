import { z } from 'zod';
import emoji from '$lib/emoji.json';

export const newUrlSchema = z.object({
	url: z.string({ required_error: 'Url is required' }).url('Must be a valid url'),
	emoji: z
		.union([
			z.string().min(4, 'Must have minimim 4 characters').max(32, 'Must not exceed 32 characters'),
			z.string().min(0).max(0)
		])
		.optional()
		.refine(
			(val) => {
				if (!val || val.length < 1) return true;
				const res = val.split('').map((v) => emoji.some((e) => (e.val = v)));
				return !res.some((v) => v == false);
			},
			{ message: 'Must contain valid emojis' }
		)
		.transform((e) => (e?.replaceAll(' ', '') === '' ? undefined : e))
});
