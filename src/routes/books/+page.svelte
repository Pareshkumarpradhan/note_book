<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { notesByBookStore, notesStore } from '$lib/services/app-service';
	import SearchView from '$lib/views/search-view.svelte';
	import { page } from '$app/stores';
	import type { NoteType } from '$lib/types';

	let notes: NoteType[] = [];
	let bookId: string;

	async function loadNotes() {
		console.log("loadnotes");
		
		notes = await $notesByBookStore.find({ value: bookId, desc: true });
		console.log(notes);
		
		
	}

	async function handleDeleteNote(note: NoteType) {
	const confirmation = confirm('Are you sure you want to delete this note');
	if(confirmation) {
		if(note._id !== undefined){
			await $notesStore.remove({value: note._id});
		loadNotes();
		}
		
	}
	} 

	async function handleEditNote(note: NoteType) {
        await goto(`/note-new?bookId=${bookId}&noteId=${note._id}`,{
			state: { note },
		});
	}

	async function handleNoteClick(note: NoteType) {
		await goto(`/note-display?noteId=${note.text}`);
	}

	function handleCreateNote() {
		goto('/note-new?bookId=' + bookId);
	}

	onMount(async () => {
		bookId = $page.url.searchParams.get('bookId')!;
		console.log("local onmount");
		let unsub = notesStore.subscribe((store) => {
			if (store) {
				loadNotes();
				setTimeout(() => unsub());
			}
		});
	});
</script>

<link
	rel="stylesheet"
	href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
/>

<main class="container py-4">
	<div class="mb-4">
		<SearchView />
	</div>
	<div>
		{#if notes.length}
			<ul class="list-group">
				{#each notes as note}
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<li class="list-group-item justify-content-between align-items-center">
						<div on:click={() => handleNoteClick(note)}>
							<div class="ellipsis">
								{note.text}
							</div>
						</div>
                         <div>
						<button class="btn btn-danger me-2" on:click={() => handleDeleteNote(note)}>
							<i class="fa fa-trash" aria-hidden="true" /></button
						>
						<button class="btn btn-primary" on:click={() => handleEditNote(note)}>
							<i class="fa fa-pencil" aria-hidden="true" /></button
						>
					</div>
					</li>
				{/each}
			</ul>
		{:else}
			<p>No notes found.</p>
		{/if}
	</div>

	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<section class="fab" on:click={handleCreateNote}>
		<div class="fab_action">
			<i class="fa fa-plus" />
		</div>
	</section>
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

	/* List */
	.list-group {
		list-style-type: none;
		padding: 0;
		margin: 0;
		width: 400px;
		position: relative;
	}

	.list-group-item{
		position: relative;
		padding: 10px;
		padding-top: 38px;
		background-color: #fff;
		border-radius: 5px;
		margin-bottom: 10px;
		margin-left: 26px;
		margin-right: 6px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
		cursor: pointer;
	}

	.list-group-item:hover {
		background-color: #f9f9f9;
	}

	/* Buttons */


	.btn {
		position: absolute;
		top: 1px;
		right: 2px;
		margin-right: 48px;
	}
	

	/* Floating Action Button */
	.fab {
		position: fixed;
		bottom: 20px;
		right: 20px;
		width: 56px;
		height: 56px;
		background-color: #5f54fe;
		border-radius: 50%;
		box-shadow: 0 2px 4px rgba(163, 163, 252, 0.2);
		cursor: pointer;
		z-index: 1;
		transition: transform 0.3s ease;
	}

	.fab:hover {
		transform: scale(1.1);
	}

	.fab_action {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
		color: #fff;
	}

	.fab_action i {
		font-size: 24px;
	}

	.ellipsis {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
</style>
