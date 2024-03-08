<script lang="ts">
	import { goto } from '$app/navigation';
	import { booksStore } from '$lib/services/app-service';
	import type { BookType } from '$lib/types';
	import NavbarView from '$lib/views/navbar-view.svelte';
	import SearchView from '$lib/views/search-view.svelte';
	import { onMount } from 'svelte';

	let myBooks: {
		name: any;
		_id: number;
		book: string;
	}[] = [];
	
	// let books: BookType[] = [];

	let showPopup = false;
	let selectedBookId: number;



	async function getBooks() {
		console.log('getBook');
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

	function handleEditBook(id: number) {
		goto(`/book-new?bookId=${id}`, {
			state: { bookId: id }
		});
	}

	function handleCreatBook() {
		goto('/book-new');
	}

	function handleBookClick(book: { _id: number; book: string }): any {
		goto('/books?bookId=' + book._id);
	}

	function openPopup(bookId: number) {
		showPopup = true;
		selectedBookId = bookId;
	}

	function closePopup() {
		showPopup = false;
		// selectedBookId = null;
	}

	onMount(async () => {
		console.log('home onmount');
		let unsub = booksStore.subscribe((store) => {
			if (store) {
				getBooks();
				setTimeout(() => {
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
		<div>
			<NavbarView />
		</div>
		<div class="mt-4">
			<button class="btn btn-primary create-book-button" on:click={handleCreatBook}
				>Create Book</button
			>
		</div>
		<div class="mt-4">
			{#if myBooks.length > 0}
				<ul class="list-group">
					{#each myBooks as book}
						<li class="list-group-item d-flex justify-content-between align-items-center">
							<div>
								<!-- svelte-ignore a11y-click-events-have-key-events -->
								<button class="btn btn-link" on:click={() => handleBookClick(book)}>
									<span class="icon"><i class="fa fa-folder" /></span>
									{book.name}
								</button>
							</div>
							<div class="btn-group">
								<!-- <button class="btn" on:click={() => handleDeleteBook(book._id)}>Delete</button>
								<button class="btn" on:click={() => handleEditBook(book._id)}>Edit</button> -->
								<button class="btn btn-link" on:click={() => openPopup(book._id)}>
									<i class="fa fa-ellipsis-v" />
								</button>
							</div>
						</li>
					{/each}
				</ul>
			{:else}
				<p>No books found.</p>
			{/if}
		</div>
	</div>

	{#if showPopup}
		<div class="popup">
			<div class="popup-content">
				<button class="btn btn-link popup-close" on:click={() => closePopup()}>
					<i class="fa fa-times" />
				</button>
				<div class="popup-buttons">
					<button
						class="btn"
						on:click={() => {
							handleDeleteBook(selectedBookId);
							closePopup();
						}}>Delete</button
					>
					<button
						class="btn"
						on:click={() => {
							handleEditBook(selectedBookId);
							closePopup();
						}}>Edit</button
					>
				</div>
			</div>
		</div>
	{/if}
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

		-webkit-animation: vibrate-1 0.3s linear infinite both;
		animation: vibrate-1 0.3s linear infinite both;
	}

	@-webkit-keyframes vibrate-1 {
		0% {
			-webkit-transform: translate(0);
			transform: translate(0);
		}
		20% {
			-webkit-transform: translate(-2px, 2px);
			transform: translate(-2px, 2px);
		}
		40% {
			-webkit-transform: translate(-2px, -2px);
			transform: translate(-2px, -2px);
		}
		60% {
			-webkit-transform: translate(2px, 2px);
			transform: translate(2px, 2px);
		}
		80% {
			-webkit-transform: translate(2px, -2px);
			transform: translate(2px, -2px);
		}
		100% {
			-webkit-transform: translate(0);
			transform: translate(0);
		}
	}
	@keyframes vibrate-1 {
		0% {
			-webkit-transform: translate(0);
			transform: translate(0);
		}
		20% {
			-webkit-transform: translate(-2px, 2px);
			transform: translate(-2px, 2px);
		}
		40% {
			-webkit-transform: translate(-2px, -2px);
			transform: translate(-2px, -2px);
		}
		60% {
			-webkit-transform: translate(2px, 2px);
			transform: translate(2px, 2px);
		}
		80% {
			-webkit-transform: translate(2px, -2px);
			transform: translate(2px, -2px);
		}
		100% {
			-webkit-transform: translate(0);
			transform: translate(0);
		}
	}

	.popup {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: rgba(0, 0, 0, 0.5);
		z-index: 9999;
	}

	.popup-content {
		position: relative;
		background-color: #fff;
		padding: 20px;
		border-radius: 5px;
	}

	.popup-buttons {
		display: flex;
		justify-content: flex-end;
		margin-top: 20px;
	}

	.popup-close {
		position: absolute;
		top: 10px;
		right: 10px;
		font-size: 20px;
		color: #888;
		background-color: transparent;
		border: none;
		cursor: pointer;
	}
</style>
