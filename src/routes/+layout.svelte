<script>
	import '../app.postcss';
	import Footer from './Footer.svelte';
	import Header from './Header.svelte';
	import Toast from './Toast.svelte';
</script>

<div class="u-full-screen-height u-flex u-flex-vertical	u-main-space-between u-main-center	">
	<Header />
	<main class="u-cross-child-center u-padding-inline-32">
		<slot />
	</main>
	<Footer />
</div>
<Toast />
