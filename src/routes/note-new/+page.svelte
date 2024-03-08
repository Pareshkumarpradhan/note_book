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
		console.log(noteId)

		
		if(noteId){
			const state = history.state as { note: NoteType };
			if(state && state.note){
				note = state.note;
			}else{
				note = await $notesStore.get({value: noteId});
			}
			
			console.log(note);
		}
	
	});
</script>

<main class="container py-4">
	<div class="mb-3">
	<textarea class="form-control"  bind:value={note.text} placeholder="Write your note here" />
    </div>
	<div class="d-grid gap-2">
	<button class="btn btn-primary" on:click={handleSaveNote}>Save Note</button>
	<button class="btn btn-secondary" on:click={handleCancelNote}>Cancel Note</button>
   </div>
</main>

<style>
.form-control{
	height: 450px;
}
</style>