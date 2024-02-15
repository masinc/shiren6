<script>
	import Header from './Header.svelte';
	import '../app.css';
	import { onMount } from 'svelte';
	import { themeChange } from 'theme-change';

	onMount(() => {
		themeChange(false);
	});
</script>

<div class="app">
	<Header />

	<main>
		<slot />
	</main>
</div>
