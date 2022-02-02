<script>
	import ColorGrid from './ColorGrid.svelte';
	import ColorButton from './ColorButton.svelte';
	import { HexToRGB } from './conversion';

	let centerColor = '#69b9d9';
	let selected = 6;
	let color = centerColor;

	/**
	 * Updates the color and the selected attributes.
	 *
	 * @param {{ detail: { color: string; index: number }}} e - The event object
	 */
	let handleSwatchChange = (e) => {
		color = e.detail.color;
		selected = e.detail.index;
	};

	let handleColorInput = (e) => {
		centerColor = e.target.value;
		selected = 6;
	};
</script>

<aside>
	<ColorGrid {centerColor} {selected} on:colorChange={handleSwatchChange} />
	<div class="selected-color">
		<div class="color" style:--color={color} style:--width="96px" style:--height="96px">
			<input type="color" bind:value={color} on:input={handleColorInput} />
			<ColorButton />
		</div>
		<h4>{HexToRGB(color)}</h4>
		<h3>{color}</h3>
		<p><span>⇦</span> Change color</p>
	</div>
</aside>

<style>
	aside {
		background: white;
		border-radius: 15px;
		padding: 0.5rem 1rem;
	}
	.selected-color {
		display: grid;
		grid-template-areas:
			'color  hsl   hsl   hsl'
			'color  rgb   rgb   rgb'
			'color  hex   hex   hex';
	}
	.selected-color .color input {
		width: 96px;
		height: 96px;
		border: 0;
		padding: 0;
		background: transparent;
		position: absolute;
		opacity: 0;
	}
	.selected-color .color {
		grid-area: color;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.selected-color h3 {
		grid-area: hex;
		padding: 0;
		margin: 0.5rem 0;
		text-transform: uppercase;
		width: 10rem;
		color: gray;
	}
	.selected-color h4 {
		grid-area: rgb;
		padding: 0;
		margin: 0;
		font-weight: 400;
		font-size: 0.85rem;
		padding-top: 0.5rem;
		text-transform: uppercase;
		color: lightgray;
	}
	.selected-color p {
		grid-area: hsl;
		padding: 0;
		margin: 0;
		font-weight: 400;
		font-size: 0.85rem;
		padding-top: 0.5rem;
		text-transform: uppercase;
		color: lightgray;
	}
	.selected-color p span {
		padding: 0;
		margin: 0;
	}
</style>
