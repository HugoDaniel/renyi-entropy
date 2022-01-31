<script lang="ts">
	import ColorGrid from './ColorGrid.svelte';
	console.log('#69b9d9 , 105, 185, 217');
</script>

<aside>
	<h2>Fill the shape with</h2>
	<nav>
		<ul>
			<li>Color</li>
			<li>...</li>
		</ul>
	</nav>

	<ColorGrid color="#69b9d9" />
</aside>

<style>
	aside {
		background: white;
		border-radius: 15px;
		padding: 0.5rem 1rem;
	}
</style>
