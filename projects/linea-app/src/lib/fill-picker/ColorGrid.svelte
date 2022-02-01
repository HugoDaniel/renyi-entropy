<script lang="ts">
	import { tick, beforeUpdate } from 'svelte';
	import { createEventDispatcher } from 'svelte';
	import ColorButton from './ColorButton.svelte';
	import { swatches } from './colorSwatches';

	export let color = '#69b9d9';
	export let selected = 6;

	let colors = swatches(color);
	beforeUpdate(async () => {
		colors = swatches(color);
		await tick();
	});

	const dispatch = createEventDispatcher();
	const dispatchColorChange = (selectedColor: string, index: number) => () =>
		dispatch('colorChange', { color: selectedColor, index });
</script>

<ol style:transform={`rotate(-45deg)`}>
	{#each colors as c, i}
		<li style={`grid-area: area${i};`} on:click={dispatchColorChange(c, i)}>
			<ColorButton color={c} selected={selected === i} />
		</li>
	{/each}
</ol>

<style>
	ol {
		list-style-type: none;
		margin: 0;
		padding: 0;

		display: grid;
		grid-template-columns: 64px;
		grid-template-rows: 64px;
		grid-template-areas:
			'.      .      area0   .       .'
			'.      area1  area2   area3   .'
			'area4  area5  area6   area7   area8'
			'.      area9  area10  area11  .'
			'.      .      area12  .       .';
	}
	li {
		margin: 0;
		padding: 0;
	}
</style>
