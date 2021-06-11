<script>
    import {createEventDispatcher, onMount, onDestroy} from 'svelte'
    const dispatch = createEventDispatcher()


</script>

<header class="bg-gray-800 h-32 flex justify-between items-center p-8">
    <div class="logo">
        <a href="/" class="text-3xl font-bold text-purple-100">Testing Logo</a>
    </div>
    <div class="signup-container">
        <button class="bg-gray-100 p-2 pl-6 pr-6 font-bold hover:bg-gray-500 hover:text-gray-100
        transition-all duration-250 ease-in-out transform hover:-translate-y-1 hover:scale-110
         outline-none border-none"
        on:click={() => dispatch('toggleAuthModal', 'signIn')}>
            Sign In
        </button>
        <button class="bg-gray-100 p-2 pl-6 pr-6 font-bold hover:bg-gray-500 hover:text-gray-100
        transition-all duration-250 ease-in-out transform hover:-translate-y-1 hover:scale-110
         outline-none border-none"
        on:click={() => dispatch('toggleAuthModal', 'signUp')}>
            Sign Up
        </button>
    </div>
</header>

<style>

</style>

