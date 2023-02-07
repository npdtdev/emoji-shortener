<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import theme from '$lib/theme';

	function toggleTheme() {
		theme.set($theme == 'dark' ? 'light' : 'dark');
	}
</script>

<button class="button is-only-icon is-text" on:click={toggleTheme} aria-label="Theme switcher">
	{#if $theme == 'dark'}
		<span class="icon-sun" aria-hidden="true" />
	{:else}
		<span class="icon-moon" aria-hidden="true" />
	{/if}
</button>
