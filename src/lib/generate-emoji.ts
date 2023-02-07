import emoji from '$lib/emoji.json';

const emojis = emoji;

export const generateEmoji = (len = 4): string => {
	if (len < 1) {
		throw Error('Must be larger than one');
	}
	const arr: Array<string> = Array(len);
	for (let idx = 0; idx < len; idx++) {
		arr[idx] = emojis.at(Math.floor(Math.random() * emoji.length))?.val ?? '';
	}
	return arr.join('');
};
