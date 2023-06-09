<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	let note: string;

	onMount(() => {
		// Retrieve the note data from the URL parameters
		const params = new URLSearchParams(window.location.search);
		const noteData = params.get('note');
		if (noteData) {
			// Decode the note data and assign it to the "note" variable
			note = decodeURIComponent(noteData);
		}
	});

	function handleGoBack() {
		goto('/notes');
	}
</script>

<main>
	<h1>Note Details</h1>
	<p>{note}</p>
	<button class="goback-btn" on:click={handleGoBack}>Go Back</button>
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		/* min-height: 100vh;
    background-color: #f2f2f2; */
		font-family: Arial, sans-serif;
	}

	h1 {
		font-size: 28px;
		color: #333;
		margin-bottom: 20px;
	}

	p {
		font-size: 18px;
		color: #555;
		margin-bottom: 30px;
	}

	.goback-btn {
		padding: 10px 20px;
		background-color: #5ff0ce;
		color: #555;
		border: none;
		border-radius: 4px;
		font-weight: bold;
		font-size: 16px;
		cursor: pointer;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
	}
</style>
