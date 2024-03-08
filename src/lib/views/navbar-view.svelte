<script lang="ts">
	import { onMount } from 'svelte';

	let searchQuery = '';
	

	onMount(() => {
		const handleOutsideClick = (event: MouseEvent) => {
			const navbarToggler = document.querySelector('.navbar-toggler');
			const navbarCollapse = document.querySelector('.navbar-collapse');

			if (
				navbarToggler &&
				navbarCollapse &&
				event.target !== navbarToggler &&
				!navbarToggler.contains(event.target as Element)
			) {
				// Clicked outside the navbar toggler, close the menu
				navbarCollapse.classList.remove('show');
			}
		};

		document.addEventListener('click', handleOutsideClick);

		return () => {
			// Clean up the event listener on component unmount
			document.removeEventListener('click', handleOutsideClick);
		};
	});

	
</script>

<body>
	<nav class="navbar navbar-expand-lg">
		<div class="container-fluid">
			<button
				class="navbar-toggler"
				type="button"
				data-bs-toggle="collapse"
				data-bs-target="#navbarSupportedContent"
				aria-controls="navbarSupportedContent"
				aria-expanded="false"
				aria-label="Toggle navigation"
			>
				<span class="navbar-toggler-icon" />
			</button>

			<!-- svelte-ignore a11y-invalid-attribute -->
			<a class="navbar-brand text-white" href="#">Note Book</a>
			<form class="d-flex ml-auto" role="search">
				<input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" bind:value="{searchQuery}" />

				<!-- <button class="btn btn-outline-success" type="submit">Search</button> -->
			</form>

			<div class="collapse navbar-collapse" id="navbarSupportedContent">
				<ul class="navbar-nav me-auto mb-2 mb-lg-0">
					<li class="nav-item">
						<a class="nav-link active" aria-current="page" href="/">My books</a>
					</li>
					<li class="nav-item">
						<a class="nav-link" href="/settings">Settings</a>
					</li>
					<li class="nav-item">
						<a class="nav-link" href="/privacy policy">Privacy Policy</a>
					</li>
					<li class="nav-item">
						<a class="nav-link" href="/terms & conditions">Terms & Conditions</a>
					</li>
				</ul>
			</div>
		</div>
	</nav>
</body>

<style>
	.navbar-toggler {
		font-size: 16px;
		margin-left: 2px;
		background-color: white;
	}
	.navbar-brand {
		margin-right: 195px;
	}
	.form-control {
		margin-left: 200px;
		margin-top: -32px;
	}
	.navbar {
		background-color: black;
		margin: 0px -18px;
	}
	.navbar-nav .nav-link {
		color: white;
	}

	.navbar-nav .nav-link.active {
		font-weight: bold;
	}
</style>
