<script lang="ts">
	import { browser } from '$app/environment';
	import { booksStore } from '$lib/services/app-service';
	import { Database, type StoreArgs } from '@cloudparker/easy-idb';
	import { onMount } from 'svelte';

	let db: Database | null = null;
	let dbName = 'note_book_db';
	let version = 2;
	let storeDefinitions: StoreArgs[] = [
		{ name: 'books', primaryKey: '_id', autoIncrement: true },
		{ name: 'notes', primaryKey: '_id', autoIncrement: true },
	];

	async function initDataBase() {
		db = new Database({ name: dbName, version, stores: storeDefinitions });
		let results = await db.openDatabase();
		booksStore.set(results.books.store!);
	};

	onMount(() => {
		if (browser) {
			initDataBase();
		}
	});
</script>
