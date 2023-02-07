<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import { addToast } from '$lib/toast';
	import type { ActionData } from './$types';
	import { validator } from '@felte/validator-zod';
	import { createForm } from 'felte';
	import { newUrlSchema } from '$lib/types';
	const {
		form: f,
		errors,
		isValid
	} = createForm({
		extend: validator({ schema: newUrlSchema }),
		onSubmit: () => {}
	});

	export let form: ActionData;

	let textToCopy: string = '';
	let isSubmitting: boolean = false;
	let copied = false;
	const handleOnCopy = async () => {
		if (textToCopy.length > 0)
			try {
				await navigator.clipboard.writeText(`${$page.url.host}/${textToCopy}`);
				copied = true;
				addToast({
					message: 'Copied to clipboard',
					title: 'Copied',
					type: 'success'
				});
				setTimeout(function () {
					copied = false;
				}, 1000);
			} catch (e) {}
	};
</script>

<div class="card u-max-width-500">
	<form
		use:f
		method="POST"
		use:enhance={({ form, data, action, cancel }) => {
			return async ({ result, update }) => {
				isSubmitting = true;
				switch (result.type) {
					case 'success':
						textToCopy = result.data?.emoji ?? textToCopy;
						addToast({
							message: result.data?.message,
							title: result.type,
							type: 'success'
						});
						break;
					case 'error':
						addToast({
							message: result.error,
							title: result.type,
							type: 'danger'
						});
						break;
					case 'failure':
						addToast({
							message: result.data?.message,
							title: result.type,
							type: 'danger'
						});
						break;
					default:
						break;
				}
				await update({ reset: false });
				isSubmitting = false;
			};
		}}
		class="form u-width-full-line u-max-width-500"
	>
		<ul class="form-list">
			<li class="form-item">
				<label for="url" class="label is-required">URL</label>
				<button on:click|preventDefault class="tooltip" aria-label="variables info">
					<span class="icon-info" aria-hidden="true" />
					<span class="tooltip-popup" role="tooltip">
						<p class="text u-margin-block-start-8">Url to shorten</p>
					</span>
				</button>
				<div class="input-text-wrapper">
					<input
						name="url"
						type="text"
						class="input-text u-padding-inline-end-56"
						placeholder="https://google.com"
					/>
				</div>
				{#if form?.errors?.url?.at(0)}
					<p class="helper u-color-text-warning u-margin-block-start-4">
						<span class="icon-exclamation" aria-hidden="true" />
						<span class="text">{form.errors.url.at(0)}</span>
					</p>
				{:else if $errors.url?.length ?? 0 > 0}
					<p class="helper u-color-text-warning u-margin-block-start-4">
						<span class="icon-exclamation" aria-hidden="true" />
						<span class="text">{$errors.url?.at(0)}</span>
					</p>
				{/if}
			</li>
			<li class="form-item">
				<label for="emoji" class="label">Emoji URL</label>
				<button on:click|preventDefault class="tooltip" aria-label="variables info">
					<span class="icon-info" aria-hidden="true" />
					<span class="tooltip-popup" role="tooltip">
						<p class="text u-margin-block-start-8">
							Leave empty for random emojis.<br />Can also use text.<br />Emojis count different
							towards lenght.
						</p>
					</span>
				</button>
				<div class="tags-input">
					<div class="tags">
						<ul class="tags-list">
							<li class="tags-item">
								<div class="input-tag">
									<span class="tag-text">
										{$page.url.host + '/'}
										<div />
									</span>
								</div>
							</li>
						</ul>
					</div>
					<input
						name="emoji"
						bind:value={textToCopy}
						type="text"
						class="tags-input-text u-width-full-line"
						placeholder={'emojis'}
					/>
					<div class="options-list">
						<button
							disabled={copied}
							on:click|preventDefault={handleOnCopy}
							class="options-list-button"
							aria-label="copy text"
						>
							<span class="icon-duplicate" aria-hidden="true" />
						</button>
					</div>
				</div>
				{#if form?.errors?.emoji?.at(0)}
					<p class="helper u-color-text-warning u-margin-block-start-4">
						<span class="icon-exclamation" aria-hidden="true" />
						<span class="text">{form.errors.emoji.at(0)}</span>
					</p>
				{:else if $errors.emoji?.length ?? 0 > 0}
					<p class="helper u-color-text-warning u-margin-block-start-4">
						<span class="icon-exclamation" aria-hidden="true" />
						<span class="text">{$errors.emoji?.at(0)}</span>
					</p>
				{/if}
			</li>
		</ul>
		{#if isSubmitting}
			<button disabled on:click|preventDefault class="button is-primary u-margin-block-start-12">
				<div class="loader" />
			</button>
		{:else}
			<button
				disabled={!$isValid}
				type="submit"
				class="button is-primary u-margin-block-start-12"
				aria-label="Create new"
			>
				<span class="text">Add</span>
			</button>
		{/if}
	</form>
</div>
