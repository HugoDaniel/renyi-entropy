<script>
	import { createEventDispatcher } from 'svelte';
	import ColorButton from './ColorButton.svelte';
	import { swatches } from './colorSwatches';

	export let centerColor = '#69b9d9';
	export let selected = 6;

	$: colors = swatches(centerColor, selected);

	const dispatch = createEventDispatcher();
	/**
	 * This function emits the `colorChange` event.
	 * It is intended to be called directly at the event handler, it returns
	 * the event emiter function for the arguments passed as argument.
	 *
	 * @param {string} selectedColor - The color hex string for the event detail
	 * @param {number} index - The swatch index for the event detail
	 * @returns {() => void} The event emiter function intended to be used at
	 * the Svelte on:event attribute.
	 */
	function dispatchColorChange(selectedColor, index) {
		return () => dispatch('colorChange', { color: selectedColor, index });
	}
</script>

<ol style:transform={`rotate(45deg)`}>
	{#each colors as c, i}
		<li
			style={`grid-area: area${i};`}
			style:--color={c}
			style:--width="64px"
			style:--height="64px"
			on:click={dispatchColorChange(c, i)}
		>
			<ColorButton selected={selected === i} />
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
