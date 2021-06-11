<script>
    import Header from '$lib/Header.svelte'
    import Signin from '$lib/SignIn.svelte'

    let showSigninModal = false
    let signInSelected

    const toggleAuthModal = (e) => {
        let authType = e.detail === 'signIn' ? true : false
        signInSelected = authType
        showSigninModal = !showSigninModal
    }
</script>


<Header on:toggleAuthModal={toggleAuthModal}/>

{#if showSigninModal}
     <Signin {signInSelected}/>
{/if}


<style>
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
</style>
