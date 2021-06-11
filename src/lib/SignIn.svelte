<script>
	import { fly, fade } from 'svelte/transition';
    import {createEventDispatcher} from 'svelte'
    const dispatch = createEventDispatcher()
	let password;
	let email;

	export let signInSelected;

    const signIn = () => {

    }
    
    const signUp = () => {

    }

</script>

<div
	class="fixed top-2/4 left-2/4 w-96 h-96 bg-gray-600 transform -translate-x-2/4 -translate-y-2/4
	grid place-items-center"
	in:fly={{ x: 50, duration: 250 }}
	out:fly={{ x: -50, duration: 250 }}>

	<form class="flex flex-col gap-y-6">
		<input type="text" placeholder="@email" class="p-1.5 w-64" />
		<input type="password" placeholder="password" class="p-1.5 w-64" />

		{#if signInSelected}
			<button
				class="p-1.5 pl-3 pr-3 bg-gray-900 text-gray-100 hover:bg-gray-300 hover:text-gray-600
				transition-all duration-250 ease-in-out" on:click={signIn}>
				Sign In
			</button>
		{:else}
			<button
				class="p-1.5 pl-3 pr-3 bg-gray-900 text-gray-100 hover:bg-gray-300 hover:text-gray-600
				transition-all duration-250 ease-in-out" on:click={signUp}>
				Sign Up
			</button>
		{/if}

	</form>

</div>
