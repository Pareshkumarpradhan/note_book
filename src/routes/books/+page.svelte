<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import moment from 'moment';
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

	function handleDeleteNote(note: NoteType) {
		// Find the index of the note with the given id
		// const index = myNotes.findIndex((note) => note._id === id);
		// if (index !== -1) {
		// 	// Remove the note from the array
		// 	myNotes.splice(index, 1);
		// 	// Delete the note from the store
		// 	$notesStore.remove({ value: id });
		// }
	}

	async function handleEditNote(note: NoteType) {
		// const note = myNotes.find((note) => note._id === id);
		// console.log(note);
		// if (note) {
		// 	const noteData = encodeURIComponent(note.note);
		// 	console.log(noteData);
		// 	goto(`/newnote?bookId=` + bookId);
		// }
	}

	async function handleNoteClick(note: NoteType) {
		await goto(`/note-display?noteId=${note._id}`);
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

<main>
	<div class="div1">
		<SearchView />
	</div>
	<div class="div2">
		{#if notes.length}
			<ul class="ul">
				{#each notes as note}
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<li class="liitem">
						<div on:click={() => handleNoteClick(note)}>
							<div class="ellipsis">
								{note.text}
							</div>
							<div />
						</div>

						<button class="btn1 delete-btn" on:click={() => handleDeleteNote(note)}>
							<i class="fa fa-trash" aria-hidden="true" /></button
						>
						<button class="btn1 edit-btn" on:click={() => handleEditNote(note)}>
							<i class="fa fa-pencil" aria-hidden="true" /></button
						>
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
		cursor: pointer;
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
