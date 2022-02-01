<script lang="ts">
	import ColorGrid from './ColorGrid.svelte';
	import ColorButton from './ColorButton.svelte';
	import { HexToRGB } from './conversion';
	console.log('#69b9d9 , 105, 185, 217');
	let color = '#69b9d9';
	let selected = 6;
	let handleColorChange = (e: { detail: { color: string; index: number } }) => {
		color = e.detail.color;
		selected = e.detail.index;
	};
	let handleColorInput = (e: Event) => {
		if (e.target instanceof HTMLInputElement) {
			color = e.target.value;
		}
	};
</script>

<aside>
	<ColorGrid {color} {selected} on:colorChange={handleColorChange} />

	<div class="selected-color">
		<div class="color">
			<input type="color" bind:value={color} />
			<ColorButton {color} width={96} height={96} />
		</div>
		<h3>{color}</h3>
		<h4>{HexToRGB(color)}</h4>
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
			'color  hex   hex   hex'
			'color  rgb   rgb   rgb'
			'color  .     .     .';
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
		margin: 0;
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
</style>
