<script lang="ts">
	import type { PageData } from './$types';
	import EmojiTable from './EmojiTable.svelte';
	export let data: PageData;
</script>

<div class="u-max-width-500">
	<EmojiTable />
</div>
