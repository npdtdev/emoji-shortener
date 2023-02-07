<script lang="ts">
	import ThemeSwitcher from './ThemeSwitcher.svelte';
</script>

<header class="main-header u-padding-inline-end-0">
	<a class="logo u-flex u-gap-4 u-cross-center" href="/">
		<svg viewBox="0 0 100 100" height={30}>
			<path
				d="M50 100C77.6156 100 100 77.6156 100 50C100 22.3844 77.6156 0 50 0C22.3844 0 0 22.3844 0 50C0 77.6156 22.3844 100 50 100ZM46.3031 20.0656H52.5531V47.8344H80.325V54.0844H46.3031V20.0656ZM27.6813 21.4313H33.9313V66.0656H78.5656V72.3156H27.6813V21.4313Z"
				fill="inherit"
			/>
		</svg>
		<span class="heading-level-5">Emoji-shortener</span>
	</a>
	<div class="main-header-end u-margin-inline-end-16">
		<ul class="buttons-list is-with-padding">
			<li class="buttons-list-item u-padding-inline-0">
				<a
					href="https://github.com/npdtdev/emoji-shortener"
					title="GitHub"
					target="_blank"
					rel="noopener noreferrer"
					class="button is-text"
				>
					<span class="icon-github" aria-hidden="true" />
				</a>
			</li>
			<li class="buttons-list-item u-padding-inline-0">
				<ThemeSwitcher />
			</li>
		</ul>
	</div>
</header>

<style>
	svg {
		fill: hsl(var(--color-primary-100));
	}
</style>
