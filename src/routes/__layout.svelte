<script>
	import Header from '$lib/Header.svelte';
	import AuthModal from '$lib/AuthModal.svelte';
	import firebase from '@firebase/app';
	import UserStore from '../stores/user.js';
	import '@firebase/auth';
	import '@firebase/firestore';
	import { onMount } from 'svelte';
	let showSigninModal = false;
	let signInSelected;

	const toggleAuthModal = (e) => {
		let authType = e.detail === 'signIn' ? true : false;
		signInSelected = authType;
		showSigninModal = !showSigninModal;
	};

	const setupFirebase = () => {
		//Only run firebase once
		if (firebase.apps.length === 0) {
			let firebaseConfig = {
				apiKey: 'AIzaSyDBi6ZoZVGOJeDURJ6Kk2xTKw5xQAShJGI',
				authDomain: 'todo-auth-firebase-tailwind.firebaseapp.com',
				projectId: 'todo-auth-firebase-tailwind',
				storageBucket: 'todo-auth-firebase-tailwind.appspot.com',
				messagingSenderId: '1061500429743',
				appId: '1:1061500429743:web:156fe8c1af7d2e55b97b5a'
			};
			// Initialize Firebase
			firebase.default.initializeApp(firebaseConfig);

			firebase.auth().onAuthStateChanged((user) => {
				UserStore.setUser(user);
			});
		}
	};

	onMount(() => {
		setupFirebase();
	});
</script>

<style>
	@tailwind base;
	@tailwind components;
	@tailwind utilities;
</style>

<Header on:toggleAuthModal={toggleAuthModal} />

{#if showSigninModal}
	<AuthModal {signInSelected} on:toggleAuthModal={toggleAuthModal} />
{/if}

<slot />
