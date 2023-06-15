<script lang="ts">
	import { goto } from '$app/navigation';
	import { booksStore } from '$lib/services/app-service';
	import SearchView from '$lib/views/search-view.svelte';
	import { onMount } from 'svelte';

	let myBooks: {
		name: any; _id: number; book: string 
}[] = [];

	async function getBooks() {
		console.log("getBook");
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
		goto('/book-new');
	}

	function handleBookClick(book: { _id: number; book: string }): any {
		goto('/books?bookId=' + book._id);
	}

	onMount(async () => {
		console.log("home onmount");
		let unsub = booksStore.subscribe((store)=>{
			if(store){
				getBooks();
				setTimeout(()=>{
                  unsub && unsub();
				}, 0);
			}
		});
		
	});
</script>

<link
	rel="stylesheet"
	href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
/>

<main>
	<div class="container">
	<div class="mt-4">
		<button class="btn btn-primary create-book-button" on:click={handleCreatBook}>Create Book</button>
	</div>
	<div class="mt-4">
		{#if myBooks.length > 0}
			<ul class="list-group">
				{#each myBooks as book}
					<li class="list-group-item d-flex justify-content-between align-items-center">
						<!-- svelte-ignore a11y-click-events-have-key-events -->
						<button class="btn btn-link" on:click={() => handleBookClick(book)}>
							<span class="icon"><i class="fa fa-folder" /></span>
							{book.name}
						</button>
						<button class="btn" on:click={() => handleDeleteBook(book._id)}>
							</button
						>
						<button class="btn" on:click={() => handleEditBook(book._id)}>
							</button
						>
					</li>
				{/each}
			</ul>
		{:else}
			<p>No books found.</p>
		{/if}
	</div>
</div>
</main>

<style>
	main {
		font-family: Arial, sans-serif;

	}
	.container {
		position: relative;
	}

	.create-book-button {
		position: fixed;
		bottom: 20px;
		right: 20px;
	}
	
</style>