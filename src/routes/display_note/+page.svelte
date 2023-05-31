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
		goto('/');
	}
</script>

<main>
	<h1>Note Details</h1>
	<p>{note}</p>
	<button on:click={handleGoBack}>Go Back</button>
</main>
