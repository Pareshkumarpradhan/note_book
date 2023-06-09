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

<main>
	<textarea class="textarea" bind:value={book.name} placeholder="creat your book here" />
	<button class="btn1" on:click={handleSaveBook}>Save Books</button>
	<button class="btn2" on:click={handleCancelBook}>Cancel Books</button>
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		min-height: 100vh;
		background-color: #f2f2f2;
		font-family: Arial, sans-serif;
	}

	.textarea {
		width: 300px;
		height: 150px;
		padding: 10px;
		border: 1px solid #ccc;
		border-radius: 4px;
		margin-bottom: 10px;
		font-size: 18px;
	}

	.btn1,
	.btn2 {
		display: inline-block;
		padding: 6px 10px;
		margin-top: 10px;
		font-size: 14px;
		color: #fff;
		background-color: #521243;
		border: none;
		border-radius: 4px;
		cursor: pointer;
	}

	.btn2 {
		margin-left: 10px;
	}
</style>
