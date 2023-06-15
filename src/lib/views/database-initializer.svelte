<script lang="ts">
	import { browser } from '$app/environment';
	import { booksStore, notesByBookStore, notesStore } from '$lib/services/app-service';
	import { Database, type StoreArgs } from '@cloudparker/easy-idb';
	import { onMount } from 'svelte';

	let db: Database | null = null;
	let dbName = 'note_book_db';
	let version = 2;
	let storeDefinitions: StoreArgs[] = [
		{ name: 'books', primaryKey: '_id', autoIncrement: true },
		{ name: 'notes', primaryKey: '_id', autoIncrement: true, indexes: [{ keyPath: 'bookId' }] }
	];

	async function initDataBase() {
		db = new Database({ name: dbName, version, stores: storeDefinitions });
		let results = await db.openDatabase();
		console.log('Local db created');
		booksStore.set(results.books.store!);
		notesStore.set(results.notes.store!);
		notesByBookStore.set(db.getIndexStore('notes', 'bookId')!)
		console.log(db.getIndexStore('note', 'bookId'))
		
	}

	onMount(() => {
		if (browser) {
			initDataBase();
		}
	});
</script>
