<script>
	import { goto } from '$app/navigation';

	function handleSearch() {
		goto('/search');
	}
</script>

<link
	rel="stylesheet"
	href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
/>
<header>
	<h1>Note App</h1>
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<i class="fa fa-search search-icon" on:click={handleSearch} />
</header>

<slot />

<style>
	header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		background-color: #f5f5f5;
		padding: 8px;
		box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
		position: sticky;
		top: 0;
		z-index: 1;
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

	.search-icon {
		font-size: 30px;
		cursor: pointer;
		color: #333;
		transition: color 0.3s ease;
	}

	.search-icon:hover {
		color: #665d5d;
	}
</style>
