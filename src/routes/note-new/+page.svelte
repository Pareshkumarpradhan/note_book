<script lang="ts">
	
	import { page } from '$app/stores';
	import { notesStore } from '$lib/services/app-service';
	import type { NoteType } from '$lib/types';
	import { onMount } from 'svelte';

	let bookId: string;
	let note: NoteType= {};
	let noteId: string | null = null;
	

	async function handleSaveNote() {
		console.log('handleSaveNote');

		note.text = (note.text || '').trim();
		if(note.text){
             if(!noteId){
				await $notesStore.insert({...note, bookId});
			 }else{
				await $notesStore.update(note);
			 }
		}
	    history.back();
	}
	async function handleCancelNote() {
		history.back();
	}

	onMount(async () => {
		bookId = $page.url.searchParams.get('bookId')!;
		noteId = $page.url.searchParams.get('noteId')!;

		if(noteId){
			note = await $notesStore.get({value: noteId});
		}
	});
</script>

<main>
	<textarea class="textarea" bind:value={note.text} placeholder="Write your note here" />
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
