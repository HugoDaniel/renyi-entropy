<script context="module" lang="ts">
	export const prerender = true;
</script>

<script lang="ts">
	import Counter from '$lib/Counter.svelte';
	import FillPicker from '$lib/fill-picker/FillPicker.svelte';
</script>

<svelte:head>
	<title>Linea App</title>
</svelte:head>

<section>
	<h1>Linea App</h1>

	<Counter />
	<FillPicker />
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 1;
	}

	h1 {
		width: 100%;
	}
</style>
