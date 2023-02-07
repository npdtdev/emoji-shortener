import type { Actions, RequestEvent } from './$types';
import { prisma } from '$lib/server/prisma';
import { fail } from '@sveltejs/kit';
import { generateEmoji } from '$lib/generate-emoji';
import { randomInRange } from '$lib/random-in-range';

import { newUrlSchema } from '$lib/types';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

export const actions = {
	default: async (event: RequestEvent) => {
		const formData = await event.request.formData();
		const data = newUrlSchema.safeParse(Object.fromEntries(formData));
		if (data.success) {
			data.data.emoji;
			if (!data.data.emoji) {
				let emoji: string | null = null;
				for (let i = 0; i < 5; i++) {
					const emj = generateEmoji(randomInRange(4, 6));
					if (!(await checkIfExists(emj))) {
						emoji = emj;
						break;
					}
				}
				if (!emoji) {
					throw new Error('Failed to generate random emojis');
				}
				data.data.emoji = emoji;
			}
		} else {
			const { fieldErrors } = data.error.flatten();
			return fail(400, {
				data: {
					url: formData.get('url') as string,
					emoji: formData.get('emoji') as string
				},
				errors: {
					url: fieldErrors.url,
					emoji: fieldErrors.emoji
				}
			});
		}
		try {
			await prisma.url.create({
				data: {
					base: data.data.url,
					emoji: data.data.emoji
				}
			});
		} catch (err) {
			console.error(err);
			if (err instanceof PrismaClientKnownRequestError) {
				if (err.code == 'P2002') {
					return fail(500, { message: 'Url already in use' });
				}
				return fail(500, { message: err.message });
			}
		}

		return {
			status: 200,
			message: 'Url created succesfully',
			url: data.data.url,
			emoji: data.data.emoji
		};
	}
} satisfies Actions;

const checkIfExists = async (handler: string): Promise<boolean> => {
	const results = await prisma.url.findFirst({
		where: {
			emoji: handler
		}
	});
	return !!results;
};
