<script lang="ts">
	import { page } from '$app/stores';
	import { booksStore } from '$lib/services/app-service';
	import type { BookType } from '$lib/types';
	import { onMount, setContext } from 'svelte';

	
	let book: BookType = { name: ''} ;
	let bookId:number | null = null;

	async function handleSaveBook() {
		console.log('handleSaveBook');
		book.name = (book.name || '').trim();
		if(book.name){
             if(!bookId){
				await $booksStore.insert({ ...book, bookId: bookId});
			 }else{
				await $booksStore.update({ ...book, bookId: bookId});
			 }
		}
	    history.back();
		
	}

	async function handleCancelBook() {
		history.back();
	}
	onMount(async () => {
       
		const query = $page.url.searchParams;
		bookId = query.get('bookId') ? parseInt(query.get('bookId')!) : null;

		
		if(bookId){
			const state = history.state as { book: BookType };
			if(state && state.book){
				book = state.book;
			}else{
				book = await $booksStore.get({value: bookId});
			}
			
			console.log(book);
		}
	});
</script>

<main class="container py-4">
	<div class="mb-3">
		<textarea class="form-control" bind:value={book.name} placeholder="creat your book here" />
	</div>
	<div class="d-grid gap-2">
		<button class="btn btn-primary" on:click={handleSaveBook}>Save Books</button>
		<button class="btn btn-secondary" on:click={handleCancelBook}>Cancel Books</button>
	</div>
</main>

<style>
</style>
