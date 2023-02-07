import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { prisma } from '$lib/server/prisma';
import type { url } from '@prisma/client';

export const load = (async ({ params }) => {
	let url: null | url = null;
	try {
		url = await prisma.url.findUnique({
			where: {
				emoji: params.slug
			}
		});
	} catch (err) {
		throw error(500, err?.toString() ?? 'An error ocurred');
	}
	if (url) {
		throw redirect(302, url.base);
	} else {
		throw error(404, 'Not found');
	}
}) satisfies PageServerLoad;
