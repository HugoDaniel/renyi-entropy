<script lang="ts">
	import ColorButton from './ColorButton.svelte';
	import { swatches } from './colorSwatches';

	export let color = '#69b9d9';

	const colors = swatches(color);
</script>

<ol style:transform={`rotate(-45deg)`}>
	<li style="grid-area: thl;">
		<ColorButton color={colors[0]} />
	</li>
	<li style="grid-area: th;">
		<ColorButton color={colors[1]} />
	</li>
	<li style="grid-area: th-chl;">
		<ColorButton color={colors[2]} />
	</li>
	<li style="grid-area: chl;">
		<ColorButton color={colors[3]} />
	</li>
	<li style="grid-area: thd;">
		<ColorButton color={colors[4]} />
	</li>
	<li style="grid-area: thd-ch;">
		<ColorButton color={colors[5]} />
	</li>
	<li style="grid-area: bhl-ch;">
		<ColorButton color={colors[7]} />
	</li>
	<li style="grid-area: bhl;">
		<ColorButton color={colors[8]} />
	</li>
	<li style="grid-area: chd;">
		<ColorButton color={colors[9]} />
	</li>
	<li style="grid-area: bh-chd;">
		<ColorButton color={colors[10]} />
	</li>
	<li style="grid-area: bh;">
		<ColorButton color={colors[11]} />
	</li>
	<li style="grid-area: bhd;">
		<ColorButton color={colors[12]} />
	</li>

	<li style="grid-area: ch;">
		<ColorButton {color} selected={true} />
	</li>
</ol>

<style>
	ol {
		list-style-type: none;
		margin: 0;
		padding: 0;
		/* background: rgba(200, 180, 190, 0.2); */

		display: grid;
		grid-template-columns: 64px;
		grid-template-rows: 64px;
		grid-template-areas:
			'.   .      thl    .      .'
			'.   th     th-chl chl    .'
			'thd thd-ch ch     bhl-ch bhl'
			'.   chd    bh-chd bh     .'
			'.   .      bhd    .      .';
	}
	li {
		margin: 0;
		padding: 0;
	}
</style>
