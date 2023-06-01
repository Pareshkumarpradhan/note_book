<script lang="ts">
	import { goto } from '$app/navigation';
	
	function handleGoBack() {
	  goto('/');
	}
  </script>
  
  <main>
	
	<button on:click={handleGoBack}>Go Back</button>
  </main>
	
 