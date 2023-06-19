<script lang="ts">
	let searchQuery = '';

	function handleSearch() {
		const noteElements = document.getElementsByClassName('list-group-item');
		let found = false; // Track if search text is found

		for (let i = 0; i < noteElements.length; i++) {
			const noteElement = noteElements[i] as HTMLElement;
			const noteText = noteElement.textContent?.trim().toLowerCase();

			if (noteText?.includes(searchQuery.toLowerCase())) {
				noteElement.style.display = 'block';
				found = true; // Search text found
			} else {
				noteElement.style.display = 'none';
			}
		}
	}
	function searchNote(event: KeyboardEvent) {
		searchQuery = (event.target as HTMLInputElement).value;
		handleSearch();
	}
</script>

<link
	rel="stylesheet"
	href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
/>
<header>
	<h1>Note App</h1>
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div class="search-container">
		<input
			type="text"
			class="search-input"
			placeholder="Search notes..."
			bind:value={searchQuery}
			on:keyup={searchNote}
		/>
		<button class="search-button" on:click={handleSearch}>
			<i class="fa fa-search" />
		</button>
	</div>
</header>
<slot />

<style>
	header {
		display: flex;
		flex-direction: column;
		align-items: center;
		background-color: #f5f5f5;
		padding: 8px;
		box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
		position: sticky;
		top: 0;
		z-index: 1;
		width: 400px;
		
	}

	h1 {
		font-size: 24px;
		margin-right: 20px;
		position: relative;
	}

	h1::after {
		content: '';
		position: absolute;
		left: 0;
		bottom: -4px;
		width: 100%;
		height: 4px;
		background-image: linear-gradient(
			to right,
			red,
			blue,
			green
		); /* Customize the gradient colors as desired */
	}
	.search-container {
		display: flex;
		align-items: center;
	}
	.search-input {
		padding: 8px;
		width: 233px;
		border: 1px solid #ccc;
		border-radius: 4px;
		font-size: 16px;
		margin-right: 10px;
		margin-left: 10px;
	}
	.search-button {
		padding: 8px;
		background-color: #4caf50;
		border: none;
		color: white;
		font-size: 16px;
		cursor: pointer;
		border-radius: 4px;
	}
</style>
