<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	let note: string;

	onMount(() => {
		// Retrieve the note data from the URL parameters
		const params = new URLSearchParams(window.location.search);
		const noteData = params.get('noteId');
		console.log(noteData);
		if (noteData) {
			// Decode the note data and assign it to the "note" variable
			note = decodeURIComponent(noteData);
		}
	});

	function handleGoBack() {
		history.back();
	}
</script>

<main class="container py-4">
	<h1 class="mb-4">Note Details</h1>
	<p>{note}</p>
	<button class="btn btn-primary mt-3" on:click={handleGoBack}>Go Back</button>
</main>

<style>
	
</style>
