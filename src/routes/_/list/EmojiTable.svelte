<script lang="ts">
	import emojis from '$lib/emoji.json';
	let offset = 0;
	const amount = 5;
	const max = Math.floor(emojis.length / amount);
	$: sourceBodySliced = emojis.slice(offset * amount, offset * amount + amount);
	const pages = Array.from(Array(max + 1).keys());
	$: paginationSliced = pages.filter((x) => Math.abs(offset - x) < 3);
	const handleNextPage = () => {
		if (offset < max) {
			offset++;
		}
	};
	const handlePreviousPage = () => {
		if (offset > 0) {
			offset--;
		}
	};
	const handleSet = (idx = 0) => {
		if (idx >= 0 && idx <= max) {
			offset = idx;
		}
	};
</script>

<table class="table is-selected-columns-mobile">
	<thead class="table-thead">
		<tr class="table-row">
			<th class="table-thead-col" style="--p-col-width:50"
				><span class="eyebrow-heading-3">Emoji</span></th
			>
			<th class="table-thead-col">
				<span class="eyebrow-heading-3">Name</span>
			</th>
		</tr>
	</thead>
	<tbody class="table-tbody">
		{#each sourceBodySliced as emoji}
			<tr class="table-row">
				<td class="table-col" data-title="Emoji">
					<div class="u-inline-flex u-cross-center u-gap-12">
						<span class="heading-level-4">{emoji.val}</span>
					</div>
				</td>
				<td class="table-col" data-title="Name">
					<div class="tag"><span class="text">{emoji.name}</span></div>
				</td>
			</tr>
		{/each}
	</tbody>
</table>
<nav class="pagination u-main-center u-margin-block-start-16">
	<button
		on:click={handlePreviousPage}
		class:is-disabled={offset < 1}
		class="button is-text"
		aria-label="prev page"
	>
		<span class="icon-cheveron-left" aria-hidden="true" />
		<span class="text">Prev</span>
	</button>
	<ol class="pagination-list is-only-desktop">
		{#if !paginationSliced.includes(0)}
			<li class="pagination-item">
				<button
					on:click={() => {
						handleSet(0);
					}}
					class="button is-text"
					class:is-disabled={offset == 0}
					aria-label="page"><span class="text">1</span></button
				>
			</li>
			<li class="pagination-item">
				<span class="button is-text" aria-hidden="true">
					<span class="icon">…</span>
				</span>
			</li>
		{/if}
		{#each paginationSliced as a}
			<li class="pagination-item">
				<button
					on:click={() => {
						handleSet(a);
					}}
					class:is-disabled={a == offset}
					class="button is-text"
					aria-label="page"><span class="text">{a + 1}</span></button
				>
			</li>
		{/each}
		{#if !paginationSliced.includes(max)}
			<li class="pagination-item">
				<span class="button is-text " aria-hidden="true">
					<span class="icon">…</span>
				</span>
			</li>
			<li class="pagination-item">
				<button
					on:click={() => {
						handleSet(max);
					}}
					class="button is-text"
					class:is-disabled={offset == max}
					aria-label="page"><span class="text">{max + 1}</span></button
				>
			</li>
		{/if}
	</ol>
	<button
		class:is-disabled={offset >= max}
		class="button is-text"
		aria-label="next page"
		on:click={handleNextPage}
	>
		<span class="text">Next</span>
		<span class="icon-cheveron-right" aria-hidden="true" />
	</button>
</nav>
