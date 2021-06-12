<script>
	import { fly, fade } from 'svelte/transition';
	import { createEventDispatcher} from 'svelte';
	import user from '../stores/user.js'
	const dispatch = createEventDispatcher();
	let password;
	let email;
	let bio;

	export let signInSelected;

	const signIn = () => {
		user.signInUser(email, password)
		dispatch('toggleAuthModal', '')
	};

	const signUp = () => {
		user.signUpUser(email, password, bio)
		dispatch('toggleAuthModal', '')
	};
</script>

<div class="modal-container">

	<div
		class="overlay z-40 fixed top-0 left-0 w-screen h-screen bg-black opacity-70"
		transition:fade={{ duration: 250 }}
		on:click={() => dispatch('toggleAuthModal', '')} />

	<div
		class="fixed top-2/4 left-2/4 w-96 h-96 bg-gray-600 transform -translate-x-2/4 -translate-y-2/4
		grid place-items-center z-50"
		in:fly={{ x: 50, duration: 250 }}
		out:fly={{ x: -50, duration: 250 }}>

		<form class="flex flex-col gap-y-6" on:submit|preventDefault >
			<input type="text" placeholder="@email" class="p-1.5 w-64" bind:value={email}/>
			<input type="password" placeholder="password" class="p-1.5 w-64" bind:value={password}/>
			{#if !signInSelected}
				<input type="text" placeholder="Bio" class="p-1.5 w-64" bind:value={bio}>
			{/if}

			{#if signInSelected}
				<button type="submit"
					class="p-1.5 pl-3 pr-3 bg-gray-900 text-gray-100 hover:bg-gray-300 hover:text-gray-600
					transition-all duration-250 ease-in-out"
					on:click={signIn}>
					Sign In
				</button>
			{:else}
				<button type="submit"
					class="p-1.5 pl-3 pr-3 bg-gray-900 text-gray-100 hover:bg-gray-300 hover:text-gray-600
					transition-all duration-250 ease-in-out"
					on:click={signUp}>
					Sign Up
				</button>
			{/if}

		</form>

	</div>

</div>
