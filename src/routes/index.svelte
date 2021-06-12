<script>
	import Tasks from '$lib/Tasks.svelte';
	import UserStore from '../stores/user.js'
	let user = $UserStore

	$: console.log(user)
</script>

<style>
	@tailwind base;
	@tailwind components;
	@tailwind utilities;
</style>



{#if $UserStore}
	<Tasks />
{/if}
