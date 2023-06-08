<script lang="ts">
	import { goto } from '$app/navigation';
	import { booksStore } from '$lib/services/app-service';
	import SearchView from '$lib/views/search-view.svelte';
	import { onMount } from 'svelte';

	let myBooks: { _id: number; book: string }[] = [];

	async function getBooks() {
		myBooks = await $booksStore.find();
		console.log(myBooks);
	}

	function handleDeleteBook(id: number) {
		// Find the index of the note with the given id
		const index = myBooks.findIndex((book) => book._id === id);
		if (index !== -1) {
			// Remove the note from the array
			myBooks.splice(index, 1);
			// Delete the note from the store
			$booksStore.remove({ value: id });
		}
	}

	function handleEditBook(id: number) {}

	function handleCreatBook() {
		goto('/books');
	}

	onMount(async () => {
		getBooks();
	});

	function handleBookClick(book: { _id: number; book: string }): any {
		goto('/notes');
	}
</script>

<link
	rel="stylesheet"
	href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
/>

<main>
	<div class="div1">
		<SearchView />
	</div>
	<div>
		<button class="book" on:click={handleCreatBook}>Creat Books</button>
	</div>
	<div class="div2">
		{#if myBooks.length > 0}
			<ul class="ul">
				{#each myBooks as book}
					<li class="liitem">
						<!-- svelte-ignore a11y-click-events-have-key-events -->
						<div on:click={() => handleBookClick(book)}>
							<span class="icon"><i class="fa fa-folder" /></span>
							{book.book}
						</div>
						<button class="btn1 delete-btn" on:click={() => handleDeleteBook(book._id)}>
							<i class="fa fa-trash" aria-hidden="true" /></button
						>
						<button class="btn1 edit-btn" on:click={() => handleEditBook(book._id)}>
							<i class="fa fa-pencil" aria-hidden="true" /></button
						>
					</li>
				{/each}
			</ul>
		{:else}
			<p>No books found.</p>
		{/if}
	</div>
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		/* min-height: 100vh; */
		background-color: #f2f2f2;
		font-family: Arial, sans-serif;
	}

	.book {
		position: fixed;
		bottom: 20px;
		right: 20px;
		padding: 10px 20px;
		border-radius: 4px;
		background-color: #fca311;
		color: #fff;
		border: none;
		font-weight: bold;
		font-size: 16px;
		cursor: pointer;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
	}

	/* Heading */
	.div1 {
		text-align: center;
		margin-bottom: 10px;
	}

	/* List */
	.ul {
		list-style-type: none;
		padding: 0;
		margin: 0;
		width: 400px;
		position: relative;
	}

	.liitem {
		position: relative;
		padding: 10px;
		padding-top: 38px;
		background-color: #fff;
		border-radius: 5px;
		margin-bottom: 10px;
		margin-left: 26px;
		margin-right: 6px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
	}

	.liitem:hover {
		background-color: #f9f9f9;
	}

	/* Buttons */
	.btn1 {
		display: inline-block;
		padding: 6px 10px;
		margin-left: 10px;
		font-size: 14px;
		color: #fff;
		background-color: #333;
		border: none;
		border-radius: 4px;
		cursor: pointer;
	}

	.delete-btn,
	.edit-btn {
		position: absolute;
		top: 5px;
		right: 5px;
	}

	.delete-btn {
		background-color: #ff0000;
		color: #ffffff;
		margin-right: 48px;
	}

	.edit-btn {
		background-color: #007bff;
		color: #ffffff;
	}
	/* .delete-btn i,
	.edit-btn i {
		margin-right: 5px;
	} */

	/* Empty State */
	.div2 p {
		text-align: center;
		color: #777;
	}

	.icon {
		display: inline-block;
		margin-right: 5px;
	}

	.icon i {
		color: #fca311;
		font-size: 16px;
	}
</style>
