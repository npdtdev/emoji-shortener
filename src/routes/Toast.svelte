<script lang="ts">
	import { toasts, dismissToast } from '$lib/toast';
	import { fade } from 'svelte/transition';
</script>

{#if $toasts}
	<section class="u-position-absolute u-z-index-20" style="bottom: 5em; right: 1em;">
		{#each $toasts as toast (toast.id)}
			{@const t = toast.type}
			<div
				transition:fade
				class={`alert-sticky u-margin-block-start-8 ${
					t == 'info'
						? 'is-info'
						: t == 'danger'
						? 'is-danger'
						: t == 'success'
						? 'is-success'
						: t == 'warning'
						? 'is-warning'
						: ''
				}`}
			>
				{#if toast.dismissible}
					<button
						class="button is-text is-only-icon"
						style="--button-size:1.5rem;"
						aria-label="close alert"
						on:click={() => {
							dismissToast(toast.id);
						}}
					>
						<span class="icon-x" aria-hidden="true" />
					</button>
				{/if}
				<div class="alert-sticky-image">
					<span class="icon-info" aria-hidden="true" />
				</div>
				<div class="alert-sticky-content">
					<h4 class="alert-sticky-title">{toast.title}</h4>
					<p>{toast.message}</p>
				</div>
			</div>
		{/each}
	</section>
{/if}
