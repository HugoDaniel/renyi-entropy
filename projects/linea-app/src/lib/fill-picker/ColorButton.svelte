<script lang="ts">
	// The background color for this diamond
	export let color = '#ae00de';
	// The width in pixels
	export let width = 64;
	// The height in pixels
	export let height = 64;
	export let selected = false;

	// The fuzzy border is made of circles, in each edge there are
	// `circlesPerEdge` on it with random radiuses:
	const circlesPerEdge = 64;
	// The random seed used every 4 circles (one per edge)
	let seeds = [];
	for (let i = 0; i < circlesPerEdge; ++i) {
		seeds.push(Math.random());
	}
	// Pick the first random number generated and use it to set the
	// square rotation, which is calculated in the `style:transform`
	// of the <svg> node below.
	let seed = seeds[0];
	// Maximum radius of each circle that makes the fuzzy border:
	const maxR = 4;
</script>

<svg viewBox="0 0 64 64" aria-hidden="true" {width} {height}>
	<rect x={4} y={4} width="56" height="56" fill={color} class={selected ? 'shadow' : ''} />
	{#each seeds as rnd}
		<circle cy={4 + (maxR / 2) * rnd} cx={4 + 56 * Math.random()} r={maxR * rnd} fill={color} />
		<circle cx={60 - (maxR / 2) * rnd} cy={4 + 56 * Math.random()} r={maxR * rnd} fill={color} />
		<circle cx={4 + (maxR / 2) * rnd} cy={4 + 56 * Math.random()} r={maxR * rnd} fill={color} />
		<circle cy={60 - (maxR / 2) * rnd} cx={4 + 56 * Math.random()} r={maxR * rnd} fill={color} />
	{/each}
</svg>

<style>
	.shadow {
	}
</style>
