import { writable } from 'svelte/store';
import { useId } from '@svelteuidev/composables';
export const toasts = writable<Array<Toast>>([]);

export type Toast = {
	type: 'default' | 'info' | 'success' | 'warning' | 'danger';
	message: string;
	title: string;
	dismissible?: boolean;
	timeout?: number;
	id: string;
};

type AddToastType = Omit<Toast, 'id'>;
export const addToast = ({
	type = 'default',
	dismissible = true,
	timeout = 3000,
	message,
	title
}: AddToastType) => {
	const id = useId();
	const newToast = {
		id,
		message: message,
		title: title,
		type: type,
		dismissible: dismissible,
		timeout: timeout
	};

	toasts.update((all) => [newToast, ...all]);
	if (timeout) setTimeout(() => dismissToast(id), timeout);
};

export const dismissToast = (id: string) => {
	toasts.update((all) => all.filter((t) => t.id !== id));
};
