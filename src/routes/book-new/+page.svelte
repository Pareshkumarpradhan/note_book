<script lang="ts">
	import { booksStore } from '$lib/services/app-service';
	import type { BookType } from '$lib/types';

	import { onMount } from 'svelte';

	let book: BookType = {};

	async function handleSaveBook() {
		console.log('handleSaveBook');
		await $booksStore.insert(book); // Add the new book to the 'books' store
		history.back();
	}

	async function handleCancelBook() {
		history.back();
	}
	onMount(() => {});
</script>

<main class="container py-4">
	<div class="mb-3">
	<textarea class="form-control" bind:value={book.name} placeholder="creat your book here" />
   </div>
   <div class="d-grid gap-2">
	<button class="btn btn-primary"  on:click={handleSaveBook}>Save Books</button>
	<button class="btn btn-secondary" on:click={handleCancelBook}>Cancel Books</button>
    </div>
</main>

<style>
	
</style>
