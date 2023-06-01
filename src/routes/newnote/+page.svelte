<script lang="ts">
	import { goto } from '$app/navigation';
	import { Database, Store, type StoreArgs } from '@cloudparker/easy-idb';
	import { onMount } from 'svelte';
	

	let notesStore: Store;
	let db: Database | null = null;
	let dbName = 'note_book_db';
	let version = 1;
	let storeDefinitions: StoreArgs[] = [{ name: 'notes', primaryKey: '_id', autoIncrement: true }];

	let note: string = '';
	let noteId: number | null = null;
	let myNotes: { _id: number; note: string }[] = [];

	async function initDataBase() {
		db = new Database({ name: dbName, version, stores: storeDefinitions });
		let results = await db.openDatabase();
		notesStore = results.notes.store!;
	}

	async function handleSaveNote() {
		console.log('handleSaveNote');
		if(noteId) {
			const existingNote = myNotes.find((note) => note._id === noteId);
			// console.log(existingNote);
			if(existingNote){

				await notesStore.update( { _id: noteId },{note: note});
			}
			else{
				await notesStore.insert({ note: note });
			}
		}
		else{
			await notesStore.insert({ note: note });
		}
		note = '';
		goto('/');
	}
	async function handleCancelNote() {
		note = '';
		goto('/');
	}

	onMount(async() => {
		initDataBase();

		const searchParams = new URLSearchParams(location.search);
		const noteData = searchParams.get('note');
		const idParam = searchParams.get('id');
		note = noteData ? decodeURIComponent(noteData) : '';

		if(idParam) {
			noteId = Number(idParam);
		};
	});

	
</script>

<main>
	<textarea class="textarea" bind:value={note} placeholder="Write your note here" />
	<button class="btn1" on:click={handleSaveNote}>Save Note</button>
	<button class="btn2" on:click={handleCancelNote}>Cancel Note</button>
	
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

	/* Textarea */
	.textarea {
		width: 400px;
		height: 525px;
		padding: 10px;
		font-size: 16px;
		border: 1px solid #ccc;
		border-radius: 5px;
		resize: none;
		margin-bottom: 10px;
	}

	.textarea:focus {
		outline: none;
		border-color: #3498db;
		box-shadow: 0 0 5px rgba(52, 152, 219, 0.5);
	}

	/* Buttons */
	.btn1,
	.btn2 {
		display: inline-block;
		padding: 10px 20px;
		font-size: 16px;
		font-weight: bold;
		text-align: center;
		color: #fff;
		border: none;
		border-radius: 4px;
		cursor: pointer;
		transition: background-color 0.3s ease;
	}

	.btn1 {
		background-color: #3498db;
		margin-right: 10px;
	}

	.btn2 {
		background-color: #e74c3c;
	}

	.btn1:hover,
	.btn2:hover {
		background-color: #2980b9;
	}

	/* Responsive Styling */
	@media (max-width: 600px) {
		.textarea {
			width: 90%;
		}

		.btn1,
		.btn2 {
			width: 100%;
			margin-bottom: 10px;
		}
	}
</style>
